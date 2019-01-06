import React, { Component } from "react";
import axios from "axios";

class RepoFolder extends Component {
	constructor(props) {
		super(props);
		var folders = this.props.main.state.folders;
		var folder = this.props.folder;
		var display = false;

		for (var i = 0; folders[i] != null; i++) {
			if (folders[i]._id == this.props.index) {
				display = true;
				break;
			}
		}

		var fName = folder.name;
		if (fName.length > 10) {
			fName = fName.substr(0, 10) + " ...";
		}

		this.state = {
			folder: folder,
			folder_index: this.props.index,
			displayName: fName,
			display: display,
			toggle: false
		};

		this.deleteFolderFromRepo = this.deleteFolderFromRepo.bind(this);
		this.toggleFolderView = this.toggleFolderView.bind(this);
	}

	toggleFolderView() {
		var state = this.state;
		state.toggle = state.toggle ? false : true;
		this.setState(state);
	}


	/* API  */
	deleteFolderFromRepo(delChoice = false) {
		var repo = this.props.main;
		var url = repo.state.url.deleteFolderFromRepo + this.state.folder.id;

		axios({
			url: url,
			method: delChoice ? "DELETE" : "GET"
		}).then((response) => {
			switch (response.data.error) {
			case 0: {
				repo.retrieveRepoContent();
				break;
			}
			case 1: {
				repo.state.folderInFocus = this;
				repo.toggleDeleteFolderConfirmationPopUp();
				break;
			}
			}
		});

	}
	/* API  */

	render() {
		const inActive = {
			display: "none"
		};

		const active = {
			display: "block"
		};

		return (
			<div className="repoFolder" id={"fd-" + this.state.folder_index} style={this.state.display == false ? inActive : active}>
				<div className={this.state.toggle ? "repoFolder__back" : "repoFolder__front"}>
					<div className="repoFolder__preview">
						<svg className="repoFolder__icon icon" onClick={() => { this.props.main.changeFolderDirectory(this.state.folder.id, this.state.folder.name); }}>
							<use xlinkHref="#folder-1" />
						</svg>
					</div>

					<div className="repoFolder__front__bottom">
						<div className="repoFolder__name f_normal">{this.state.displayName}</div>
						<div className="repoFolder__menuBtn" >
							<div className="iconBtn--white" onClick={() => { this.toggleFolderView(); }}>
								<svg className="icon">
									<use xlinkHref="#back" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div className={this.state.toggle ? "repoFolder__front" : "repoFolder__back"}>
					<div className="repoFolder__menu">

						<div className="repoFolder__menu__option">
							<div className="iconBtn" onClick={() => { this.props.main.changeFolderDirectory(this.state.folder.id, this.state.folder.name); }}>
								<svg className="icon">
									<use xlinkHref="#view" />
								</svg>
							</div>
						</div>

						<div className="repoFolder__menu__option--delete ">
							<div className="iconBtn--danger" onClick={() => { this.deleteFolderFromRepo(false); }}>
								<svg className="icon">
									<use xlinkHref="#trash" />
								</svg>
							</div>
						</div>
					</div>

					<div className="repoFolder__back__bottom" >
						<div className="repoFolder__back__bottom__box" ></div>
						<div className="repoFolder__menuBtn" onClick={() => { this.toggleFolderView(); }}>
							<div className="iconBtn--normal">
								<svg className="icon">
									<use xlinkHref="#back" />
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default RepoFolder;