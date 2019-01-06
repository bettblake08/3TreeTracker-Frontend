import React, { Component } from "react";

class DeleteFileConfirmationPopUp extends Component {
	constructor(props) {
		super(props);
		this.confirm = this.confirm.bind(this);
	}

	confirm() {
		this.props.repo.state.fileInFocus.deleteFileFromRepo(true);
		this.props.repo.toggleDeleteFileConfirmationPopUp();
	}

	render() {
		return (
			<div className="deletePP">
				<div className="deletePP__content">
					<div className="deletePP__text f_text-center f_h1">This file is currently being used. Are you sure you wish to delete the file?</div>
				</div>

				<div className="deletePP__buttons">
					<div className="deletePP__buttons__button">
						<div className="btn_1--danger f_button_2 f_text-capitalize" onClick={() => { this.props.repo.toggleDeleteFileConfirmationPopUp(); }}>Cancel</div>
					</div>

					<div className="deletePP__buttons__button">
						<div className="btn_1--success f_button_2 f_text-capitalize" onClick={() => { this.confirm(); }}>Confirm</div>
					</div>

				</div>
			</div>
		);
	}
}

export default DeleteFileConfirmationPopUp;