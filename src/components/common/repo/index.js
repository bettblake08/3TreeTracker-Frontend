/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Popup from "../../UI/popup";
import RepoCategoryView from "./repoCategoryView";
import RepoExplorer from "./repoExplorer";
import DeleteFolderConfirmationPopUp from "./deleteFolderConfirmationPopUp";
import DeleteFileConfirmationPopUp from "./deleteFileConfirmationPopUp";

import * as RepoActions from "../../../redux/actions/repoActions";
import * as HelperActions from "../../../redux/actions/helpers";

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

		switch (props.selectionType) {
		case 0: break;
		case 1:
		case 2:
		case 3:
		{
			//Rquired amount of images need to be specified requiredCount
			types = props.types;

			if (types == undefined) { types = ["png", "jpg", "jpeg"]; }
			break;
		}

		case 4:
		case 5:
		{
			types = props.types;

			if (types == undefined) { types = ["doc", "docx"]; }
			break;
		}

		default: return;
		}

		props.actions.repo.setRepoSettings({
			selectionType: props.selectionType,
			requiredTypes: types,
			requiredCount: props.requiredCount
		});

		this.loadRepoContent = this.loadRepoContent.bind(this);
		this.changeFolderDirectory = this.changeFolderDirectory.bind(this);
		this.repoFileSelected = this.repoFileSelected.bind(this);
		this.exitRepo = this.exitRepo.bind(this);
	}

	componentDidMount() {
		this.loadRepoContent();
		this.props.actions.repo.setMainRepoComponent({
			loadRepoContent: this.loadRepoContent,
			changeFolderDirectory: this.changeFolderDirectory,
			repoFileSelected: this.repoFileSelected,
			exitRepo: this.exitRepo
		});
	}

	componentDidUpdate(prevProps){
		const { popups, popupComponent, repo, actions } = this.props;
		if(prevProps.repo.currentFolder.id !== repo.currentFolder.id){
			this.loadRepoContent();
		}

		if (popups.repoPopup) {
			actions.helper.togglePopup("repoPopup");
			popupComponent.toggleContent();
		}
	}

	repoFileSelected() {
		var selectedFiles = this.props.repo.selectedFiles;

		if (selectedFiles.length == 0) { return; }

		const { repo } = this.props;
		var file = selectedFiles[0].file;

		switch (repo.settings.selectionType) {
		case 1:
		{
			var preview = document.querySelectorAll(".repoImagePreview");

			preview.forEach((e)=>{
				e.setAttribute("style", `background: url("${repo.contentdir}${file.name}.${file.type}") center ; background-size:cover;`);
				e.dataset.image = JSON.stringify(file);
			});

			this.exitRepo();
			break;
		}
		case 2: {
			var imagePreview = document.querySelector(".repoImagePreview img");
            
			imagePreview.setAttribute("src", `${repo.contentdir}/${file.name}.${file.type}`);
			imagePreview.dataset.image = file;

			this.exitRepo();
			break;
		}
		case 4:
		case 5: {
			this.exitRepo();
			break;
		}
		}
	}

	exitRepo() {
		this.props.actions.helper.togglePopup("repoPopup");
	}

	loadRepoContent() {
		this.props.actions.repo.loadRepoContent();
		this.props.actions.repo.getRepoContent();
	}

	changeFolderDirectory(folderId, folderName) {
		this.props.actions.repo.changeRepoFolderDirectory({folder:{id: folderId, name: folderName}});
		this.loadRepoContent();
	}

	render() {
		return (
			<div className="repo SB">
				<RepoExplorer />
				<RepoCategoryView />

				<Popup component={<DeleteFileConfirmationPopUp />} />
				<Popup component={<DeleteFolderConfirmationPopUp />} />
			</div>
		);
	}
}

Repo.propTypes = {
	popupComponent: PropTypes.object,
	parent: PropTypes.object,
	selectionType: PropTypes.number,
	types: PropTypes.object,
	requiredCount: PropTypes.number,
	repo: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	popups: PropTypes.object.isRequired
};

Repo.defaultTypes = {
	requiredCount: 0
}


function mapStateToProps(state){
	return {
		repo: state.repoReducer,
		popups: state.popupReducer
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:{
			repo: bindActionCreators(RepoActions, dispatch),
			helper: bindActionCreators(HelperActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Repo);
