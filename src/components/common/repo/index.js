import React, { Component } from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Popup from "../../UI/popup";
import RepoCategoryView from "./repoCategoryView";
import RepoExplorer from "./repoExplorer";
import DeleteFolderConfirmationPopUp from "./deleteFolderConfirmationPopUp";
import DeleteFileConfirmationPopUp from "./deleteFileConfirmationPopUp";

import * as RepoActions from "../../../actions/repoActions";

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

		switch (this.props.selectionType) {
		case 0: {
			break;
		}
		case 1:
		case 2:
		case 3:
		{
			//Rquired amount of images need to be specified requiredCount
			types = this.props.types;
			rCount = this.props.requiredCount == undefined;

			if (types == undefined) { types = ["png", "jpg", "jpeg"]; }
			break;
		}

		case 4:
		case 5:
		{
			types = this.props.types;
			rCount = this.props.requiredCount;

			if (types == undefined) { types = ["doc", "docx"]; }
			break;
		}

		case "default": return;
		}

		this.props.actions.repo.setRepoSettings({
			selectionType: this.props.selectionType,
			requiredTypes: types,
			requiredCount: rCount == undefined ? 0 : rCount
		});

		this.state = {
			popup: 0,
			popups: [],
			loaded: false
		};

		this.loadRepoContent = this.loadRepoContent.bind(this);
		this.changeFolderDirectory = this.changeFolderDirectory.bind(this);
		this.repoFileSelected = this.repoFileSelected.bind(this);
		this.exitRepo = this.exitRepo.bind(this);
		this.toggleDeleteFileConfirmationPopUp = this.toggleDeleteFileConfirmationPopUp.bind(this);
		this.loadDeleteFileConfirmationPopUp = this.loadDeleteFileConfirmationPopUp.bind(this);
		this.toggleDeleteFolderConfirmationPopUp = this.toggleDeleteFolderConfirmationPopUp.bind(this);
		this.loadDeleteFolderConfirmationPopUp = this.loadDeleteFolderConfirmationPopUp.bind(this);
		
	}

	componentDidMount() {
		this.setState({loaded: true});
		this.loadRepoContent();
	}

	repoFileSelected() {
		var selectedFiles = this.props.repo.selectedFiles;

		if (selectedFiles.length == 0) { return; }

		var file = selectedFiles[0].file;

		switch (this.props.repo.selectionType) {
		case 1:
		{
			var preview = document.querySelectorAll(".repoImagePreview");

			preview.forEach((e)=>{
				e.setAttribute("style", `background: url("${this.props.repo.contentdir}${file.name}.${file.type}") center ; background-size:cover;`);
				e.dataset.image = JSON.stringify(file);
			});

			this.exitRepo();
			break;
		}
		case 2: {
			var imagePreview = document.querySelector(".repoImagePreview img");
            
			imagePreview.setAttribute("src", `${this.props.repo.contentdir}/${file.name}.${file.type}`);
			imagePreview.dataset.image = file;

			this.exitRepo();
			break;
		}
		case 4:
		case 5: {
			this.props.parent.setState({selectedFiles});
			this.exitRepo();
			break;
		}
		}
	}

	exitRepo() {
		this.props.parent.toggleRepo();
	}

	loadRepoContent() {
		this.props.actions.repo.loadRepoContent();
		this.props.actions.repo.getRepoContent();
	}

	changeFolderDirectory(folderId, folderName) {
		this.props.actions.repo.changeRepoFolderDirectory({folder:{id: folderId, name: folderName}});
		this.loadRepoContent();
	}

	toggleDeleteFileConfirmationPopUp() {
		this.state.popups[0].toggleContent();
	}

	loadDeleteFileConfirmationPopUp() {
		if (this.state.loaded) {
			return (<Popup component={<DeleteFileConfirmationPopUp />} parent={this} />);
		}
	}

	toggleDeleteFolderConfirmationPopUp() {
		this.state.popups[1].toggleContent();
	}

	loadDeleteFolderConfirmationPopUp() {
		if (this.state.loaded) {
			return (<Popup component={<DeleteFolderConfirmationPopUp />} parent={this} />);
		}
	}

	render() {
		return (
			<div className="repo SB">
				<RepoExplorer main={this} />
				<RepoCategoryView main={this} />

				{this.loadDeleteFileConfirmationPopUp()}
				{this.loadDeleteFolderConfirmationPopUp()}
			</div>
		);
	}
}

Repo.propTypes = {
	parent: PropTypes.object,
	selectionType: PropTypes.number.isRequired,
	types: PropTypes.object,
	requiredCount: PropTypes.number,
	repo: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
		repo: state.repoReducer.repo
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:{
			repo: bindActionCreators(RepoActions, dispatch)
		}
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Repo);