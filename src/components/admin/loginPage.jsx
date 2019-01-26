import React, { Component } from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminAccountAuthActions from "../../actions/adminAccountAuthActions";
import {ADMIN_LOGIN_BACKGROUND} from "../../abstract/variables";
import Button from "../UI/button";
import TextInput from "../UI/textInput";
import {PasswordInput} from "../UI/newPasswordInput";

import "../../assets/styles/scss/pages/admin/login.scss";

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.adminLogin = this.adminLogin.bind(this);

		this.state = {
			error: 0,
			errors: {
				404: "User doesn't exist. Please enter a valid username",
				401: "Username or password is incorrect. Please try again.",
				400: "Incorrect input value. Please input an email or phone number.",
				500: "Access to server failed. Please try again. ",
			},
			buttons:[],
			textInputs:[],
			passwordInputs:[]
		};
	}

	componentDidUpdate() {
		if (this.state.error != 0) {
			setTimeout(() => {
				this.setState({error: 0});
			}, 3000);
		}
	}

	adminLogin() {
		var state = this.state;
		var component = this;

		state.buttons[0].state.status = 3;
		component.setState(state);
        
		this.props.actions.auth.adminLogin({
			username: state.textInputs[0].state.inputValue,
			password: state.passwordInputs[0].state.inputValue
		}, () => {
			state.buttons[0].state.status = 2;
			component.setState(state);
		}, (response) => {
			state.error = response.status;
			state.buttons[0].state.status = 1;
			component.setState(state);
		});
	}


	render() {
		var errorText = this.state.errors[this.state.error];

		const back_img = {
			background: `url('${ADMIN_LOGIN_BACKGROUND}')`,
			backgroundPosition:"center",
			backgroundSize: "cover"
		};

		return (
			<div>
				<div className="back_img" style={back_img}></div>
				<div className="adminLogin">
					<div className="adminLogin__form">
 
						<div className="icon__sec">
							{/* <div className="icon">
                                <img src={MAIN_LOGO} />
                            </div> */}
						</div>

						<form>
							<div id="username_tb">
								<TextInput
									parent={this}
									status={0}
									config={{
										text: "",
										floatingLabel: true,
										label: "Username",
										type: "text_input_4",
										placeholder: "Username",
										length: 60,
										comment: "Maximum characters allowed is (60)."
									}} />
							</div>

							<div id="pass_tb">
								<PasswordInput
									parent={this}
									status={0}
									config={{
										class: "text_input_4",
										floatingLabel: true,
										label: "Password",
										placeholder: "Password",
										comment: "At least 1 of each (A-Z),(a-z),(1-9),(@$.#). 8-16 characters."
									}}
								/>
							</div>

							<div className={`adminLogin__errorComment errorComment--${this.state.error != 0 ? "active" : "disabled"} f_comment_1`}>
								{errorText}
							</div>

							<div className="login_btn">
								<Button 
									parent={this}
									status={0}
									config={{
										text:"",
										label:"Log In",
										type:"btn_1",
										action:this.adminLogin
									}}
								/>
							</div>


						</form>
					</div>
				</div>
			</div>
		);
	}
}

LoginPage.propTypes = {
	actions: PropTypes.object.isRequired
};

function mapStateToProps(){
	return {};
}

function mapDispatchToProps(dispatch){ 
	return {
		actions: {
			auth: bindActionCreators(AdminAccountAuthActions, dispatch)
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage);