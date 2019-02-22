import React, { Component } from "react";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Button from "../../UI/button";
import TextInput from "../../UI/textInput";

import * as RepoActions from "../../../actions/repoActions";

class RepoCreateFolder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttons: [],
			textInputs: []
		};

		this.createFolderinRepo = this.createFolderinRepo.bind(this);
		this.toggleCreateFolderDisplay = this.toggleCreateFolderDisplay.bind(this);
	}

	toggleCreateFolderDisplay() {
		this.props.actions.repo.toggleCreateRepoFolderDisplay();
	}

	createFolderinRepo() {
		var inputName = this.state.textInputs[0];

		if (inputName.state.inputValue == "") {
			inputName.focus();
			return;
		}

		var state = this.state;
		state.buttons[0].state.status = 3;
		this.setState(state);

		const onSuccess = () => {
			state.buttons[0].state.status = 2;
			this.setState(state);

			this.toggleCreateFolderDisplay();
			this.props.actions.repo.getRepoContent();
		};

		const onFailure = () => {
			state.buttons[0].state.status = 1;
			this.setState(state);
		};

		this.props.actions.repo.createFolderinRepo(state.textInputs[0].state.inputValue, onSuccess, onFailure);
	}

	render() {
		return (
			<div className={`repoCreateFolder--${this.props.repo.createFolderDisplay ? "active" : "disabled"}`}>
				<form id="repoCreateFolder__form" action="#" method="post" encType="multipart/form-data">
					<div className="repoCreateFolder__input">
						<TextInput parent={this} status={0} config={{
							type: "text_input_3",
							label: "Folder Name:",
							inputValue: ""
						}} />

						<div className="repoCreateFolder__button">
							<Button 
								parent={this} 
								status={0} 
								config={{ 
									label: "Add",
									action: this.createFolderinRepo,
									type: "btn_1",
									text: ""
								}} />
						</div>
					</div>

				</form>

			</div>
		);
	}
}

RepoCreateFolder.propTypes = {
	actions: PropTypes.object.isRequired,
	repo: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
		repo: state.repoReducer
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: {
			repo: bindActionCreators(RepoActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoCreateFolder);
