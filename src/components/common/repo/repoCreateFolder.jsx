import React, { Component } from "react";
import axios from "axios";

import Button from "../UI/button";
import TextInput from "../UI/textInput";

class RepoCreateFolder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttons: [],
			textInputs: [],
			ajax: {
				createFolderinRepo: {
					attempts: 0,
					error: 0
				}
			}
		};
		this.createFolderinRepo = this.createFolderinRepo.bind(this);
		this.reloadAjaxRequest = this.reloadAjaxRequest.bind(this);
		this.toggleCreateFolderDisplay = this.toggleCreateFolderDisplay.bind(this);
	}


	reloadAjaxRequest(option) {
		var state = this.state;
		switch (option) {
		case 1: {

			if (state.ajax.createFolderinRepo.attempts < 10) {
				state.ajax.createFolderinRepo.attempts += 1;
				this.setState(state);
				this.createFolderinRepo();
			}
			else {
				this.state.vaiues.repo.state.errorPopup.displayError("Access to server failed. Try again Later! ");
				state.ajax.createFolderinRepo.attempts = 0;
				this.setState(state);
			}
			break;
		}
		}

	}

	toggleCreateFolderDisplay() {
		var state = this.props.values.repo.state;
		state.toggleCreateFolderDisplay = state.toggleCreateFolderDisplay ? false : true;
		this.props.values.repo.setState(state);
	}

	/* API */

	createFolderinRepo() {
		var inputName = this.state.textInputs[0];

		if (inputName.state.inputValue == "") {
			inputName.focus();
			return;
		}

		var folderId = this.props.values.folderId;
		var repo = this.props.values.repo;

		var component = this;
		var state = this.state;

		state.buttons[0].state.status = 3;
		component.setState(state);

		axios({
			url: repo.state.url.createFolderinRepo,
			method: "POST",
			data: {
				parentId: folderId,
				name: state.textInputs[0].state.inputValue
			}
		}).then((response) => {
			switch (response.data.error) {
			case 0: {
				state.buttons[0].state.status = 2;
				component.setState(state);

				component.toggleCreateFolderDisplay();
				repo.retrieveRepoContent();
				break;
			}
			case 1: {
				state.buttons[0].state.status = 1;
				break;
			}
			}

			state.ajax.createFolderinRepo.attempts = 0;
			component.setState(state);
		});

	}

	/* API */

	render() {

		return (
			<div className={this.props.values.repo.state.createFolderDisplay ? "repoCreateFolder--active" : "repoCreateFolder--disabled"}>
				<form id="repoCreateFolder__form" action="#" method="post" encType="multipart/form-data">
					<div className="repoCreateFolder__input">
						<TextInput parent={this} status={0} config={{
							type: "text_input_3",
							label: "Folder Name:",
							inputValue: ""
						}} />

						<div className="repoCreateFolder__button">
							<Button parent={this} status={0} config={{ label: "Add", action: this.createFolderinRepo, type: "btn_1", text: "" }} />
						</div>
					</div>

				</form>

			</div>
		);
	}
}

export default RepoCreateFolder;