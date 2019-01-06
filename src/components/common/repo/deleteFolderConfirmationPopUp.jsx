import React, { Component } from "react";

class DeleteFolderConfirmationPopUp extends Component {
	constructor(props) {
		super(props);
		this.confirm = this.confirm.bind(this);
	}

	confirm() {
		this.props.repo.state.folderInFocus.deleteFolderFromRepo(true);
		this.props.repo.toggleDeleteFolderConfirmationPopUp();
	}

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
						<div className="btn_1--success f_button_2 f_text-capitalize" onClick={() => { this.confirm(); }}>Confirm</div>
					</div>

				</div>
			</div>
		);
	}
}

export default DeleteFolderConfirmationPopUp;