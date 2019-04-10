import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";

import * as RepoActions from "../../../redux/actions/repoActions";
import * as HelperActions from "../../../redux/actions/helpers";

class DeleteFolderConfirmationPopUp extends React.Component {
	componentDidUpdate() {
		if (this.props.popups.deleteFolderConfirmationPopUp) {
			this.props.popupComponent.toggleContent();
			this.props.actions.helper.toggleContent("deleteFolderConfirmationPopUp");
		}
	}

	render() {
		const { repo, actions } = this.props;

		return (
			<div className="deletePP">
				<div className="deletePP__content">
					<div className="deletePP__text f_text-center f_h1">
						This folder contains files that are currently being used. If you proceed, all subfiles and subfolder shall be deleted. Are you sure you wish to delete the folder?
					</div>
				</div>

				<div className="deletePP__buttons">
					<div className="deletePP__buttons__button">
						<div className="btn_1--danger f_button_2 f_text-capitalize"
							onClick={repo.toggleDeleteFolderConfirmationPopUp}>Cancel</div>
					</div>

					<div className="deletePP__buttons__button">
						<div className="btn_1--success f_button_2 f_text-capitalize" onClick={() => {
							actions.repo.deleteFolderInRepo(
								repo.folderInFocus.id,
								true,
								() => {
									repo.toggleDeleteFolderConfirmationPopUp();
								}
							);
						}}>Confirm</div>
					</div>

				</div>
			</div>
		);
	}
}

DeleteFolderConfirmationPopUp.propTypes = {
	repo: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	popups: PropTypes.object.isRequired,
	popupComponent: PropTypes.object.isRequired
};

function mapStatetoProps(state){
	return {
		repo: state.repoReducer,
		popups: state.popupReducer
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: {
			repo: bindActionCreators(RepoActions, dispatch),
			helper: bindActionCreators(HelperActions, dispatch)
		}
	}
};

export default connect(mapStatetoProps, mapDispatchToProps)(DeleteFolderConfirmationPopUp);
