import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as RepoActions from "../../../actions/repoActions";
import RepoDocFile from "./repoDocFile";
import RepoImageFile from "./repoImageFile";

class RepoFile extends Component {
	constructor(props) {
		super(props);

		var files = this.props.repo.files;
		var file = this.props.file;

		let fileFound = files.find((file)=>{
			return file.id == this.props.file.id;
		});

		var fName = file.originalName;

		if (fName.length > 10) {
			fName = fName.substr(0, 10) + " ...";
		}

		this.state = {
			displayName: fName,
			display: fileFound == undefined ? false : true,
			dir: this.props.repo.contentdir,
			selected: false,
			toggle: false,
			selectedClass: {
				true: "repoFile--selected",
				false: "repoFile"
			}
		};

		this.repoFileByType = this.repoFileByType.bind(this);
		this.repoFileSelect = this.repoFileSelect.bind(this);
		this.deleteFileFromRepo = this.deleteFileFromRepo.bind(this);
		this.checkIfSelected = this.checkIfSelected.bind(this);
		this.toggleFileView = this.toggleFileView.bind(this);
	}

	checkIfSelected() {
		var selectedFile = this.props.repo.selectedFiles.find((file)=>{
			return file.id == this.props.file.id;
		});

		this.setState({selected: selectedFile == undefined ? false : true});
	}

	toggleFileView() {
		this.setState({toggle: !this.state.toggle});
	}

	repoFileSelect() {
		this.props.actions.repo.toggleSelectRepoFile(this.props.file.id);
		this.checkIfSelected();
	}

	repoFileByType() {

		switch (this.props.file.type) {
		case "png":
		case "jpg":
		case "jpeg":
		case "gif":
		{
			return <RepoImageFile repoFile={this} />;
		}
		case "doc":
		case "pdf":
		case "docx":
		case "xls":
		{
			return <RepoDocFile repoFile={this} />;
		}
		default: {
			return <div></div>;
		}
		}

	}

	deleteFileFromRepo(delChoice) {
		var repo = this.props.main;

		if (!delChoice) {
			this.props.actions.repo.selectRepoFileInFocus(this);
			repo.toggleDeleteFileConfirmationPopUp();
			return;
		}

		this.props.actions.repo.deleteFileFromRepo(this.props.file.id, delChoice);
	}

	render() {
		return (
			this.repoFileByType()
		);
	}
}

RepoFile.propTypes = {
	actions:PropTypes.object.isRequired,
	repo: PropTypes.object.isRequired,
	file: PropTypes.object.isRequired,
	index: PropTypes.object.isRequired,
	main: PropTypes.object.isRequired
};

function mapStateToProps(state) {
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

export default connect(mapStateToProps, mapDispatchToProps)(RepoFile);
