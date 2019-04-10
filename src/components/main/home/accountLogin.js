/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PasswordInput } from "../../UI/newPasswordInput";
import TextInput from "../../UI/textInput";
import Button from "../../UI/button";
import * as AuthenticationActions from "../../../redux/actions/authenticationActions";


class AccountLogin extends Component {
	constructor(props) {
		super(props);

		this.userLogin = this.userLogin.bind(this);

		this.state = {
			error: 0,
			buttons: [],
			passwordInputs: [],
			textInputs: []
		};
	}

	componentDidUpdate() {
		if (this.state.error != 0) {
			setTimeout(() => {
				var state = this.state;
				state.error = 0;
				this.setState(state);
			}, 3000);
		}
	}

	userLogin() {
		var component = this;
		var state = this.state;
		var usernameType = 0;
		var username = this.state.username;

		var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (username == "") {
			state.textInputs[0].state.errorText = "Incorrect input value. Please input an email or account code.";
			state.textInputs[0].state.status = 1;
			component.setState(state);
			return;
		}
		else if (emailRegex.test(String(username).toLowerCase())) { usernameType = 1; }
		else { usernameType = 2; }

		state.buttons[0].state.status = 3;
		component.setState(state);

		this.props.actions.adminLogin.login({
			usernameType,
			username,
			password: state.passwordInputs[0].state.inputValue
		}, () => {
			state.buttons[0].state.status = 3;
			component.setState(state);
		}, (response) => {
			state.error = response.error.status;
			component.setState(state);
		}
		);

	}


	render() {
		var errorText = "";

		switch (this.state.error) {
		case 404: {
			errorText = "User doesn't exist. Please enter a valid username";
			break;
		}
		case 401: {
			errorText = "Username or password is incorrect. Please try again.";
			break;
		}
		case 403: {
			errorText = "User has not been verified!";
			break;
		}
		case 400:
		case 500: {
			errorText = "Access to server failed. Please try again.";
			break;
		}
		}

		let loginError = "loginForm__errorComment f_comment_1 errorComment";

		return (
			<div className="loginForm view--scrollable SB">
				<div className="loginForm__form">
					<form method="post">
						<h1 className="f_title">Account Login.</h1>
						<h2 className="f_h2">
                            If this is your first time, please provide a Longrich account code provided by Longrich. If not, you may ingore.</h2>
						<div className="loginForm__code">
							<TextInput
								parent={this}
								status={0}
								config={{
									text: "",
									floatingLabel: true,
									label: "Code",
									type: "text_input_4",
									placeholder: "Account Code",
									length: 60,
									comment: "Maximum characters allowed is (60)."
								}} />

						</div>

						<h2 className="f_h2">The following details are required.</h2>

						<div className="loginForm__username">
							<TextInput
								parent={this}
								status={0}
								config={{
									text: "",
									floatingLabel: true,
									label: "Account",
									type: "text_input_4",
									placeholder: "Email Address / Account Code",
									length: 60,
									comment: "Maximum characters allowed is (60)."
								}} />

						</div>

						<div className="loginForm__pass" >
							<PasswordInput
								parent={this}
								status={0}
								config={{
									class: "text_input_4",
									floatingLabel: true,
									label: "Password",
									placeholder: "At least 1 of each (A-Z),(a-z),(1-9),(@$.#). 8-16 characters."
								}} />
						</div>

						<div className={`${loginError}--${this.state.error != 0 ? "active" : "disabled"}`}>{errorText}</div>

						<div className="loginForm__btn">
							<Button
								parent={this}
								status={0}
								config={{
									text: "",
									label: "Log In",
									type: "btn_1",
									action: this.userLogin
								}}
							/>
						</div>


					</form>
				</div>
			</div>

		);
	}
}

AccountLogin.propTypes = {
	parent: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			adminLogin: bindActionCreators(AuthenticationActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountLogin);