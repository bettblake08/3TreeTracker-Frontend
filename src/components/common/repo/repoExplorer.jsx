import React, { Component } from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import RepoCreateFolder from "./repoCreateFolder";
import RepoFileUpload from "./repoFileUpload";
import RepoContent from "./repoContent";

import * as RepoActions from "../../../actions/repoActions";


class RepoExplorer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			toggleButtons: false
		};

		this.setRepoDirName = this.setRepoDirName.bind(this);
		this.changeToPrevFolderDir = this.changeToPrevFolderDir.bind(this);
	}

	setRepoDirName() {
		var breadCrumb = "root";
		
		this.props.repo.folderDirs.forEach((folderName)=>{
			breadCrumb += `/${folderName}`;
		});

		return breadCrumb;
	}

	changeToPrevFolderDir() {
		this.props.actions.repo.changeToPreviousFolderDirectory();
		this.props.actions.repo.loadRepoContent();
	}

	render() {
		var repo = this.props.main;

		return (
			<div className="repo__explorer">

				{/*  <RepoStatistics repo={repo} /> */}

				<RepoFileUpload main={repo} />
				<RepoCreateFolder main={repo} />

				<div className="repo__explorer__topBar ">
					<div className="repo__explorer__topBar__fName f_h1">{this.setRepoDirName()}</div>

					<div className="repo__explorer__topBar__toggle" onClick={() => {
						this.setState({ toggleButtons: !this.state.toggleButtons });
					}}>
						<div className="iconBtn--normal">
							<svg className="icon">
								<use xlinkHref="#menu" />
							</svg>
						</div>
					</div>

					<div className={`repo__explorer__topBar__buttons${this.state.toggleButtons ? "--active": ""}`}>

						<div className="repo__explorer__topBar__button" onClick={() => { this.changeToPrevFolderDir(); }}>
							<div className="btn_1 f_button_2 f_text-capitalize">Return</div>
						</div>

						<div className="repo__explorer__topBar__button" onClick={() => { 
							this.props.actions.repo.toggleUploadFileDisplay();
						}}>
							<div className="btn_1 f_button_2 f_text-capitalize">Upload</div>
						</div>

						<div className="repo__explorer__topBar__button" onClick={() => {
							this.props.actions.repo.toggleCreateRepoFolderDisplay();
						}}>
							<div className="btn_1 f_button_2 f_text-capitalize">New Folder</div>
						</div>

						<div className="repo__explorer__topBar__button" onClick={() => {
							this.props.actions.repo.getRepoContent();
						}}>
							<div className="btn_1--warning f_button_2 f_text-capitalize">Reload</div>
						</div>

					</div>

				</div>


				<RepoContent />
			</div>
		);
	}
}


RepoExplorer.propTypes = {
	main: PropTypes.object.isRequired,
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
		actions: {
			repo: bindActionCreators(RepoActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoExplorer);