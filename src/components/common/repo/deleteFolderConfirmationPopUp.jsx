import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class DeleteFolderConfirmationPopUp extends Component {
	render() {
		return (
			<div className="deletePP">
				<div className="deletePP__content">
					<div className="deletePP__text f_text-center f_h1">This folder contains files that are currently being used. If you proceed, all subfiles and subfolder shall be deleted. Are you sure you wish to delete the folder?</div>
				</div>

				<div className="deletePP__buttons">
					<div className="deletePP__buttons__button">
						<div className="btn_1--danger f_button_2 f_text-capitalize" onClick={() => { this.props.repo.toggleDeleteFolderConfirmationPopUp(); }}>Cancel</div>
					</div>

					<div className="deletePP__buttons__button">
						<div className="btn_1--success f_button_2 f_text-capitalize" onClick={() => { 
							this.props.repo.state.folderInFocus.deleteFolderFromRepo(true);
							this.props.repo.toggleDeleteFolderConfirmationPopUp();
						}}>Confirm</div>
					</div>

				</div>
			</div>
		);
	}
}

DeleteFolderConfirmationPopUp.propTypes = {
	repo: PropTypes.object.isRequired
};

function mapStatetoProps(state){
	return {
		repo: state.repoReducer.repo
	};
}

export default connect(mapStatetoProps)(DeleteFolderConfirmationPopUp);