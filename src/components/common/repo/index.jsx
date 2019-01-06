import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import {API_URL, WEB_URL} from "../../../abstract/variables";
import Popup from "../../UI/popup";
import RepoCategoryView from "./repoCategoryView";
import RepoFileView from "./repoFileView";
import DeleteFolderConfirmationPopUp from "./deleteFolderConfirmationPopUp";
import DeleteFileConfirmationPopUp from "./deleteFileConfirmationPopUp";

class Repo extends Component {

	constructor(props) {
		super(props);

		/* SELECTION TYPES 
        1 -- single image - Return as background image
        2 -- single image - Return as image source
        3 -- multiple images
        4 -- single document file
        5 -- multiple document files
         */
		var types = null;
		var rCount = null;

		switch (this.props.sType) {
		case 0: {
			break;
		}
		case 1:
		case 2:
		case 3:
		{
			//Rquired amount of images need to be specified rCount
			types = this.props.types;
			rCount = this.props.rCount;

			if (types == null) { types = ["png", "jpg", "jpeg"]; }
			break;
		}

		case 4:
		case 5:
		{
			types = this.props.types;
			rCount = this.props.rCount;

			if (types == null) { types = ["doc", "docx"]; }
			break;
		}

		case "default": return;
		}

		this.loadRepoContent = this.loadRepoContent.bind(this);
		this.refreshRepoFileSelection = this.refreshRepoFileSelection.bind(this);
		this.changeFolderDirectory = this.changeFolderDirectory.bind(this);
		this.repoFileSelected = this.repoFileSelected.bind(this);
		this.retrieveRepoContent = this.retrieveRepoContent.bind(this);
		this.exitRepo = this.exitRepo.bind(this);
		this.reloadAjaxRequest = this.reloadAjaxRequest.bind(this);
		this.toggleDeleteFileConfirmationPopUp = this.toggleDeleteFileConfirmationPopUp.bind(this);
		this.loadDeleteFileConfirmationPopUp = this.loadDeleteFileConfirmationPopUp.bind(this);
		this.toggleDeleteFolderConfirmationPopUp = this.toggleDeleteFolderConfirmationPopUp.bind(this);
		this.loadDeleteFolderConfirmationPopUp = this.loadDeleteFolderConfirmationPopUp.bind(this);

		this.state = {
			folder_ids: ["root"],
			folder_dirs: ["root"],
			folders_loaded: [],
			folders: [],
			files: [],
			/*   stats: {
                occupied: 0,
                totalSize: 0
            }, */
			togglePopup: false,
			popup: 0,
			fileInFocus: {},
			folderInFocus: {},
			selected_files: [],
			selection_type: this.props.sType,
			required_types: types,
			required_count: rCount,
			refresh: false,
			url: {
				retrieveRepoContentByFolder: `${API_URL}admin/retrieveRepoContentByFolder/`,
				contentdir: `${WEB_URL}repo/`,
				uploadFiletoRepo: `${API_URL}admin/uploadFiletoRepo/`,
				createFolderinRepo: `${API_URL}admin/repoFolder/root`,
				deleteFolderFromRepo: `${API_URL}admin/repoFolder/`,
				deleteFileFromRepo: `${API_URL}admin/repoFile/`
			},
			popups: [],
			loaded: false,
			ajax: {
				retrieveRepoContent: {
					attempts: 0,
					error: 0
				}
			},
			createFolderDisplay:false,
			uploadFileDisplay:false
		};
	}

	componentDidMount() {
		var state = this.state;
		state.loaded = true;
		this.setState(state);
		this.loadRepoContent();
	}

	refreshRepoFileSelection() {
		var selectedFiles = this.state.selected_files;

		for (var i = 0; selectedFiles[i] != null; i++) {
			var file = document.getElementById("#fl-" + selectedFiles[i]);
			var classname = file.className;
			classname.replace("repoFile","repoFile--selected");
			file.setAttribute("class",classname);
		}
	}

	repoFileSelected() {
		var sFiles = this.state.selected_files;

		if (sFiles.length == 0) { return; }

		var selectionType = this.state.selection_type;
		var file = sFiles[0].file;

		switch (selectionType) {
		case 1:
		{
			var preview = document.querySelectorAll(".repoImagePreview");

			preview.forEach((e)=>{
				e.setAttribute("style", `background: url("${this.state.url.contentdir}${file.name}.${file.type}") center ; background-size:cover;`);
				e.dataset.image = JSON.stringify(file);
			});

			this.exitRepo();
			break;
		}
		case 2: {
			var imagePreview = document.querySelector(".repoImagePreview img");
            
			imagePreview.setAttribute("src", `${this.state.url.contentdir}/${file.name}.${file.type}`);
			imagePreview.dataset.image = file;

			this.exitRepo();
			break;
		}
		case 4:
		case 5: {
			var parent = this.props.parent;
			var state = parent.state;
			state.selectedFiles = this.state.selected_files;
			parent.setState(state);

			this.exitRepo();
			break;
		}
		}
	}

	exitRepo() {
		this.props.parent.toggleRepo();
	}

	loadRepoContent() {
		var fids = this.state.folder_ids;
		var fid = fids[fids.length - 1];

		var fLoaded = this.state.folders_loaded;

		for (var i = 0; fLoaded[i] != null; i++) {
			if (fLoaded[i].id == fid) {
				var states = this.state;

				states.folders = fLoaded[i].subFolders;
				states.files = fLoaded[i].subFiles;

				this.setState(states);

				return;
			}
		}

		this.retrieveRepoContent();
	}

	reloadAjaxRequest(option) {
		var state = this.state;

		switch (option) {
		case 1: {

			if (state.ajax.retrieveRepoContent.attempts < 10) {
				state.ajax.retrieveRepoContent.attempts += 1;
				this.setState(state);
				this.retrieveRepoContent();
			}
			else {
				state.ajax.retrieveRepoContent.error = "Access to server failed. Try again Later! ";
				state.ajax.retrieveRepoContent.attempts = 0;
				this.setState(state);
			}
			break;
		}
		}

	}

	/* API */

	retrieveRepoContent() {
		var state = this.state;
		var fids = state.folder_ids;
		var fid = fids[fids.length - 1];
		var sFiles = state.selected_files;
		var repo = this;

		axios({
			url: state.url.retrieveRepoContentByFolder + fid,
			method: "GET",
		}).then((response)=>{
			var data = response.data;

			switch (response.status) {
			case 200: {
				// repoContent(data.content);
				state.folders = data.content.folders;
				state.files = data.content.files;
				state.stats = data.content.stats;

				//This code checks if the folder has already been loaded. If so, it overwrite a loaded folder with an updated list of subFolders.

				var loadedFolderExists = false, lFolderIndex = 0;

				for (var i = 0; state.folders_loaded[i] != null; i++) {
					if (state.folders_loaded[i].id == fid) {
						loadedFolderExists = true;
						lFolderIndex = i;
						break;
					}
				}

				var fLoaded = {
					id: fid,
					subFolders: data.content.folders,
					subFiles: data.content.files,
				};

				if (loadedFolderExists) {
					state.folders_loaded[lFolderIndex] = fLoaded;
				}
				else {
					state.folders_loaded.push(fLoaded);
				}

				//^^ This code checks if the folder has already been loaded. If so, it overwrite a loaded folder with an updated list of subFolders.

				repo.setState(state);

				if (sFiles != null) {
					repo.refreshRepoFileSelection();
				}
			}
			}

			state.ajax.retrieveRepoContent.attempts = 0;
			repo.setState(state);

		}).catch((response) => {

			switch(response.status){
			case 404:
			default:{
				repo.reloadAjaxRequest(1);
				break;
			}
			}

		});

	}

	/* API */

	changeFolderDirectory(folderId, folderName) {
		var states = this.state;

		states.folder_ids.push(folderId);
		states.folder_dirs.push(folderName);

		this.setState(states);
		this.loadRepoContent();

	}

	toggleDeleteFileConfirmationPopUp() {
		this.state.popups[0].toggleContent();
	}

	loadDeleteFileConfirmationPopUp() {
		if (this.state.loaded == true) {
			return (<Popup component={<DeleteFileConfirmationPopUp repo={this} />} parent={this} />);
		}
	}

	toggleDeleteFolderConfirmationPopUp() {
		this.state.popups[1].toggleContent();
	}

	loadDeleteFolderConfirmationPopUp() {
		if (this.state.loaded == true) {
			return (<Popup component={<DeleteFolderConfirmationPopUp repo={this} />} parent={this} />);
		}
	}

	render() {
		return (
			<div className="repo SB">
				<RepoFileView main={this} />
				<RepoCategoryView main={this} />

				{this.loadDeleteFileConfirmationPopUp()}
				{this.loadDeleteFolderConfirmationPopUp()}
			</div>
		);
	}
}

Repo.propTypes = {
	parent: PropTypes.object.isRequired,
	sType: PropTypes.number.isRequired,
	types: PropTypes.object,
	rCount: PropTypes.number.isRequired
};

export default Repo;