import React, { Component } from "react";


class RepoFileView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			toggleButtons: false
		};

		this.setRepoDirName = this.setRepoDirName.bind(this);
		this.changeToPrevFolderDir = this.changeToPrevFolderDir.bind(this);
		this.toggleButtons = this.toggleButtons.bind(this);
		this.toggleCreateFolderDisplay = this.toggleCreateFolderDisplay.bind(this);
		this.toggleUploadFileDisplay = this.toggleUploadFileDisplay.bind(this);
	}

	setRepoDirName() {
		var dirNames = this.props.main.state.folder_dirs;
		var dir = "root";

		for (var i = 1; dirNames[i] != null; i++) {
			dir += " / " + dirNames[i];
		}

		return dir;
	}


	changeToPrevFolderDir() {
		var repo = this.props.main;
		if (repo.state.folder_ids.length <= 1) { return; }

		var states = repo.state;

		states.folder_ids.pop();
		states.folder_dirs.pop();

		repo.setState(states);
		repo.loadRepoContent();
	}

	toggleButtons() {
		var state = this.state;
		state.toggleButtons = state.toggleButtons ? false : true;
		this.setState(state);
	}

	toggleCreateFolderDisplay() {
		var state = this.props.main.state;
		state.createFolderDisplay = state.createFolderDisplay ? false : true;
		this.props.main.setState(state);
	}

	toggleUploadFileDisplay() {
		var state = this.props.main.state;
		state.uploadFileDisplay = state.uploadFileDisplay ? false : true;
		this.props.main.setState(state);
	}

	render() {
		var repo = this.props.main;
		var fids = repo.state.folder_ids;

		return (
			<div className="repo__fileView">

				{/*  <RepoStatistics repo={repo} /> */}
				<RepoFileUpload
					values={{
						folderId: fids[fids.length - 1],
						repo: repo
					}}
				/>
				<RepoCreateFolder
					values={{
						folderId: fids[fids.length - 1],
						repo: repo
					}} />

				<div className="repo__fileView__topBar ">
					<div className="repo__fileView__topBar__fName f_h1">{this.setRepoDirName()}</div>

					<div className="repo__fileView__topBar__toggle" onClick={() => { this.toggleButtons(); }}>
						<div className="iconBtn--normal">
							<svg className="icon">
								<use xlinkHref="#menu" />
							</svg>
						</div>
					</div>

					<div className={this.state.toggleButtons == true ? "repo__fileView__topBar__buttons--active" : "repo__fileView__topBar__buttons"}>

						<div className="repo__fileView__topBar__button" onClick={() => { this.changeToPrevFolderDir(); }}>
							<div className="btn_1 f_button_2 f_text-capitalize">Return</div>
						</div>

						<div className="repo__fileView__topBar__button" onClick={() => { this.toggleUploadFileDisplay(); }}>
							<div className="btn_1 f_button_2 f_text-capitalize">Upload</div>
						</div>

						<div className="repo__fileView__topBar__button" onClick={() => { this.toggleCreateFolderDisplay(); }}>
							<div className="btn_1 f_button_2 f_text-capitalize">New Folder</div>
						</div>

						<div className="repo__fileView__topBar__button" onClick={() => { repo.retrieveRepoContent(); }}>
							<div className="btn_1--warning f_button_2 f_text-capitalize">Reload</div>
						</div>

					</div>

				</div>


				<RepoContent main={repo} />

			</div>
		);
	}
}

export default RepoFileView;