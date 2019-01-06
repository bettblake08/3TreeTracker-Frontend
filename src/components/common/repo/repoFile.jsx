import React, { Component } from "react";
import axios from "axios";

class RepoFile extends Component {
	constructor(props) {
		super(props);

		var files = this.props.main.state.files;
		var file = this.props.file;
		var display = false;

		for (var i = 0; files[i] != null; i++) {
			if (files[i]._id == this.props.index) {
				display = true;
				break;
			}
		}

		var fName = file.originalName;

		if (fName.length > 10) {
			fName = fName.substr(0, 10) + " ...";
		}

		this.state = {
			displayName: fName,
			display: display,
			dir: this.props.main.state.url.contentdir,
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
		var selected = false;
		var selectedFiles = this.props.main.state.selected_files;

		for (var i = 0; selectedFiles[i] != null; i++) {
			if (selectedFiles[i].id == this.props.index) {
				selected = true;
				break;
			}
		}

		var states = this.state;
		states.selected = selected;
		this.setState(states);
	}

	toggleFileView() {
		var state = this.state;
		state.toggle = state.toggle ? false : true;
		this.setState(state);
	}

	repoFileSelect() {
		var repo = this.props.main;
		var state = repo.state;
		var selectedFiles = state.selected_files;

		if (this.state.selected == true) {
			for (var i = 0; selectedFiles[i] != null; i++) {
				if (selectedFiles[i].id == this.props.index) {
					selectedFiles.splice(i);
				}
			}

			state.selected_files = selectedFiles;
			repo.setState(state);
			this.checkIfSelected();

			return;
		}
		else {

			var fileCount = state.required_count;
			if (fileCount == null) { return; }

			if (selectedFiles.length >= fileCount) { return; }

			var requiredTypes = state.required_types;
			var fileType = this.props.file.type;
			var found = false;

			for (var typeIndex = 0; requiredTypes[typeIndex] != null; typeIndex++) {
				if (fileType == requiredTypes[typeIndex]) { found = true; break; }
			}

			if (found == false) { return; }

			state.selected_files.push({
				id: this.props.index,
				file: this.props.file
			});

			repo.setState(state);
			this.checkIfSelected();

			//console.log('It is selected');
		}

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


	/* API */

	deleteFileFromRepo(delChoice) {
		var repo = this.props.main;

		if (!delChoice) {
			repo.state.fileInFocus = this;
			repo.toggleDeleteFileConfirmationPopUp();
			return;
		}

		axios({
			url: repo.state.url.deleteFileFromRepo + this.props.file.id,
			method: delChoice ? "DELETE" : "GET"
		}).then((response) => {
			switch (response.data.error) {
			case 0: {
				repo.retrieveRepoContent();
				break;
			}
			case 1: {
				break;
			}
			}
		});
	}

	/* API */

	render() {
		return (
			this.repoFileByType()
		);
	}
}

export default RepoFile;