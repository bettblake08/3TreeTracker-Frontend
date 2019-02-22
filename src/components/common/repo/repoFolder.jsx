import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import * as RepoActions from "../../../actions/repoActions"

class RepoFolder extends Component {
	constructor(props) {
		super(props);

		this.deleteFolderFromRepo = this.deleteFolderFromRepo.bind(this);
		this.toggleFolderView = this.toggleFolderView.bind(this);
		this.changeDirectory = this.changeDirectory.bind(this);
		this.getDisplayName = this.getDisplayName.bind(this);

		this.state = {
			displayName: this.getDisplayName(),
			toggle: false
		};
	}

	componentDidUpdate(prevProps){
		if (prevProps.folder.id !== this.props.folder.id){
			this.setState({ displayName: this.getDisplayName() });
		}
	}

	getDisplayName(){
		var fName = this.props.folder.name;
		if (fName.length > 10) { fName = `${fName.substr(0, 10)} ...`; };
		return fName;
	}

	toggleFolderView() {
		this.setState({toggle: !this.state.toggle});
	}

	deleteFolderFromRepo(delChoice = false) {
		const { actions, folder } = this.props;
		actions.repo.deleteFolderInRepo(folder.id, delChoice);
	}

	changeDirectory() {
		const { folder, actions } = this.props;
		actions.repo.changeRepoFolderDirectory({ folder });
	}

	render() {
		const { folder } = this.props;
		const { toggle } = this.state;

		return (
			<div className="repoFolder" id={`fd-${folder.id}`}>
				<div className={`repoFolder__${toggle ? "back" : "front"}`}>
					<div className="repoFolder__preview">
						<svg className="repoFolder__icon icon" onClick={this.changeDirectory}>
							<use xlinkHref="#folder-1" />
						</svg>
					</div>

					<div className="repoFolder__front__bottom">
						<div className="repoFolder__name f_normal">{this.state.displayName}</div>
						<div className="repoFolder__menuBtn" >
							<div className="iconBtn--white" onClick={this.toggleFolderView}>
								<svg className="icon">
									<use xlinkHref="#back" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div className={`repoFolder__${toggle ? "front" : "back" }`}>
					<div className="repoFolder__menu">

						<div className="repoFolder__menu__option">
							<div className="iconBtn" onClick={this.changeDirectory}>
								<svg className="icon">
									<use xlinkHref="#view" />
								</svg>
							</div>
						</div>

						<div className="repoFolder__menu__option--delete ">
							<div
								className="iconBtn--danger"
								onClick={() => {
									this.deleteFolderFromRepo(false);
							}}>
								<svg className="icon">
									<use xlinkHref="#trash" />
								</svg>
							</div>
						</div>
					</div>

					<div className="repoFolder__back__bottom" >
						<div className="repoFolder__back__bottom__box" ></div>
						<div className="repoFolder__menuBtn" onClick={this.toggleFolderView}>
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

RepoFolder.propTypes = {
	folders: PropTypes.array.isRequired,
	folder: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	folders: state.repoReducer.folders
});

const mapDispatchToProps = (dispatch) => ({
	actions: {
		repo: bindActionCreators(RepoActions, dispatch)
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(RepoFolder);