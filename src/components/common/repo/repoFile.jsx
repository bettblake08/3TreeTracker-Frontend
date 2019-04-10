import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as RepoActions from "../../../redux/actions/repoActions";
import * as HelperActions from "../../../redux/actions/helpers";

import RepoDocFile from "./repoDocFile";
import RepoImageFile from "./repoImageFile";

class RepoFile extends Component {
	constructor(props) {
		super(props);

		this.repoFileByType = this.repoFileByType.bind(this);
		this.repoFileSelect = this.repoFileSelect.bind(this);
		this.deleteFileFromRepo = this.deleteFileFromRepo.bind(this);
		this.checkIfSelected = this.checkIfSelected.bind(this);
		this.toggleFileView = this.toggleFileView.bind(this);
		this.getDisplayName = this.getDisplayName.bind(this);

		this.state = {
			displayName: this.getDisplayName(),
			selected: false,
			toggle: false,
			dir: props.repo.contentdir,
			selectedClass: {
				true: "repoFile--selected",
				false: "repoFile"
			}
		};

	}

	componentDidUpdate(prevProps){
		if(prevProps.file.id !== this.props.file.id){
			this.setState({displayName: this.getDisplayName()});
		}

		if(prevProps.repo.selectedFiles.length !== this.props.repo.selectedFiles.length){
			this.checkIfSelected();
		}
	}

	getDisplayName(){
		var fName = this.props.file.originalName;
		if (fName.length > 10) { fName = `${fName.substr(0, 10)} ...`; }
		return fName;
	}

	checkIfSelected() {
		var selectedFile = this.props.repo.selectedFiles.find(file => file.id == this.props.file.id);
		this.setState({selected: selectedFile !== undefined});
	}

	toggleFileView() {
		this.setState({toggle: !this.state.toggle});
	}

	repoFileSelect() {
		this.props.actions.repo.toggleSelectRepoFile(this.props.file);
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

	deleteFileFromRepo(delChoice = false) {
		const { actions, file } = this.props;
		const component = this;

		if (!delChoice) {
			actions.repo.selectRepoFileInFocus(file);
			actions.helper.togglePopup("deleteFileConfirmationPopup");
			this.toggleFileView();
			return;
		}

		actions.repo.deleteFileFromRepo(file.id, delChoice, ()=>{
			component.toggleFileView();
		});
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
	file: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		repo: state.repoReducer
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

export default connect(mapStateToProps, mapDispatchToProps)(RepoFile);
