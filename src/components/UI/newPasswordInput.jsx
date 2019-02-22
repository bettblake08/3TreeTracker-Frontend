import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class NewPasswordInput extends Component {
	static propTypes = {
		regex: PropTypes.object,
		config: PropTypes.object.isRequired,
		parent: PropTypes.object.isRequired
	}
	
	constructor(props) {
		super(props);
		this.state = { 
			passwordInputs:[],
			regex:this.props.regex,
			lastTyped: Date.now(),
			inputValue:""
		};

		this.checkPasswords = this.checkPasswords.bind(this);
	}

	componentDidMount(){
		var state = this.props.parent.state;
		state.newPasswordInput = this;
		this.setState(state);
	}

	checkPasswords(){
		var state = this.state;
		var c = this;
		this.setState({ lastTyped: Date.now()});

		setTimeout(() => {
			if ((Date.now() - c.state.lastTyped) >= 1000) {
				var regex = this.state.regex;
				var passwordInputs = c.state.passwordInputs;
                
				if (regex.test(passwordInputs[0].state.inputValue) && regex.test(passwordInputs[1].state.inputValue) &&
                    passwordInputs[0].state.inputValue == passwordInputs[1].state.inputValue){
					passwordInputs[0].setStatus(6);
					passwordInputs[1].setStatus(6);
					state.inputValue = passwordInputs[0].state.inputValue;
					c.setState(state);
				}
				else {
					passwordInputs[0].setStatus(5);
					passwordInputs[1].setStatus(5);
					state.inputValue = "";
					c.setState(state);
				}
			}
		}, 1000);
	}

	render() {
		return (
			<div className="passwords">
				<div className="pass">
					<PasswordInput 
						parent={this}
						status={0}
						index={1}
						config={{
							class:"text_input_4",
							floatingLabel:true,
							label:"Password",
							placeholder:this.props.config.placeholder,
							action:this.checkPasswords
						}} />
				</div>
				<div className="pass">
					<PasswordInput
						parent={this}
						status={0}
						index={2}
						config={{
							class: "text_input_4",
							floatingLabel: true,
							label: "Re-enter Password",
							placeholder: this.props.config.placeholder,
							action:this.checkPasswords
						}} />
				</div>
			</div>
		);
	}
}


class PasswordInput extends Component {

	static propTypes = {
		config: PropTypes.object.isRequired,
		status: PropTypes.object.isRequired,
		parent: PropTypes.object.isRequired,
		index: PropTypes.object
	}

	static defaultProps = {
		index: 0
	}

	constructor(props) {
		/* 
        <PasswordInput
            parent={this}
            status={0}
            config={{
                class: "text_input_4",              Required
                floatingLabel: true,                Required
                label: "Password",                  Required
                placeholder: "Placeholder"          Optional
                action: ()={}                       Optional
            }}
        />
        */
		super(props);
		var config = this.props.config;

		this.state = {
			defaultStatus: this.props.status,
			status: this.props.status,
			errorText: "",
			inputValue: config.inputValue,
			action: config.action == undefined ? ()=>{} : config.action
		};

		this.inputRef = React.createRef();

		this.handleValueChange = this.handleValueChange.bind(this);
		this.focus = this.focus.bind(this);
		this.setFloatingLabel = this.setFloatingLabel.bind(this);
		this.setStatus = this.setStatus.bind(this);
	}

	componentDidMount() {
		var state = this.props.parent.state;
		state.passwordInputs.push(this);
		this.props.parent.setState(state);
	}

	componentDidUpdate() {
		var state = this.state;
		if (state.status == 1 || state.status == 2) {
			var component = this;
			setTimeout(() => {
				state.status = state.defaultStatus;
				component.setState(state);
			}, 3000);
		}
	}

	setStatus(status){
		this.setState({status});
	}

	handleValueChange(e){
		var state = this.state;
		state.inputValue = e.target.value;
		state.action();
		this.setState(state);
	}

	focus() {
		this.inputRef.focus();
	}

	setFloatingLabel() {
		var label = this.props.config.floatingLabel;
		if (label != undefined && label) {
			var name = this.props.config.label;
			return (
				<label htmlFor={name.replace(" ", "")} >{name}</label>
			);
		}
	}

	render() {
		var status = "";
		var error = false;

		switch (this.state.status) {
		case 0: { status = "normal"; break; }
		case 1:
		case 5: { 
			status = "fail"; 
			error = this.state.errorText !== ""; 
			break; 
		}
		case 2:
		case 6: { 
			status = "success"; 
			error = this.state.errorText !== "";
			break; 
		}
		case 3: { status = "loading"; break; }
		case 4: { status = "warning"; break; }
		}

		const { index, config } = this.props; 
		var errorClass = `f_comment_1 ${config.class}__error--`;
		var commentClass = `f_comment_1 ${config.class}__comment--`;

		var mainClass = `${config.class}--${status} ${
			config.floatingLabel != undefined && config.floatingLabel ? "f_input_1 has-float-label" : ""
		}`;

		return (
			<div className={mainClass} >
				<div className={`${config.class}__label f_label_1`}>{config.label}</div>

				<input 
					id={`password-${index}`}
					ref={(ref)=> this.inputRef = ref } 
					type="password" 
					className="f_input_1" 
					value={this.state.inputValue} 
					onChange={this.handleValueChange}
					placeholder={config.placeholder == undefined ? "" : config.placeholder}
				/>

				{this.setFloatingLabel()}

				<div className={`${commentClass}${error ? "disabled" : "active" }`}>
					{config.comment}
				</div>

				<div className={`${errorClass}${!error ? "disabled" : "active"}`}>
					{this.state.errorText}
				</div>

			</div>
		);
	}
}

export {
	PasswordInput,
	NewPasswordInput
};
