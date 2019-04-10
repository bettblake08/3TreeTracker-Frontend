import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { API_URL, DEFAULT_USER_PIC } from "../../../abstract/variables";
import MultiLineTextInput from "../../UI/MultiLineTextInput";
import TextInput from "../../UI/textInput";
import Button from "../../UI/button";
import * as CommentActions from "../../redux/actions/commentActions";

class CommentInput extends Component {
	constructor(props) {
		super(props);

		this.postComment = this.postComment.bind(this);
		this.reloadAjaxRequest = this.reloadAjaxRequest.bind(this);

		this.state = {
			textInputs: [],
			buttons: [],
			ajax: {
				postComment: {
					attempts: 0
				}
			}
		};
	}

	reloadAjaxRequest(option) {
		var state = this.state;

		switch (option) {
		case 1: {

			if (state.ajax.postComment.attempts < 10) {
				state.ajax.postComment.attempts += 1;
				this.setState(state);
				this.postComment();
			}
			else {
				this.props.parent.state.errorPopup.displayError("Access to server failed. Try again Later! ");
				state.ajax.postComment.attempts = 0;
				this.setState(state);
			}
			break;
		}
		}

	}

	postComment() {
		var component = this;
		var state = this.state;
		var textInputs = state.textInputs;

		textInputs.forEach((elem) => {

			if (elem.state.inputValue == "") {
				elem.state.status = 1;
				elem.focus();
				return;
			}
		});

		var formData = {
			name: textInputs[0].state.inputValue,
			email: textInputs[1].state.inputValue,
			comment: textInputs[2].state.inputValue
		};

		var url = API_URL + "comment/" + this.props.main.props.commentingOn + "/";

		switch (this.props.main.props.commentingOn) {
		case 1: {
			url += this.props.main.props.product.log.id + "/0";
			break;
		}
		}

		state.buttons[0].setStatus(3);
		var errorPopup = this.props.main.state.errorPopup;
        
		this.props.actions.comment.postComment({
			postType: this.props.main.props.commentingOn,
			product: this.props.main.props.product,
			user: {
				name: textInputs[0].state.inputValue,
				email: textInputs[1].state.inputValue,
			},
			text: textInputs[2].state.inputValue
		},()=>{
			state.buttons[0].setStatus(2);
			component.props.main.getComments();
		},()=>{
			state.buttons[0].setStatus(1);
		});

		axios({
			url: url,
			method: "POST",
			data: formData
		}).then((response) => {

			switch (response.status) {
			case 201: {
				
				break;
			}
			}

		}).catch((response) => {
			

			switch (response.status) {
			case 400:
			case 500: {
				errorPopup.displayError("Access to server failed. Try again Later! ");
				break;
			}
			case 404: {
				errorPopup.displayError("Post not found. Try again Later! ");
				break;
			}
			}

		});

	}

	render() {
		return (
			<div className="commentInput">
				<div className="commentInput__form">
					<div className="commentInput__user">
						<div className="commentInput__user__pic">
							<img src={DEFAULT_USER_PIC[1]} />
						</div>
					</div>

					<div className="commentInput__user__details">
						<div className="commentInput__user__name">
							<TextInput
								parent={this}
								status={0}
								config={{
									label: "",
									length: 60,
									type: "text_input_4",
									placeholder: "Name ...",
									comment: "Maximum characters allowed is (60)."
								}} />
						</div>

						<div className="commentInput__user__email">
							<TextInput
								parent={this}
								status={0}
								config={{
									label: "",
									type: "text_input_4",
									placeholder: "Email Address ...",
									comment: "Maximum characters allowed is (80)."
								}} />
						</div>
					</div>

					<div className="commentInput__box">
						<MultiLineTextInput
							parent={this}
							status={0}
							config={{
								label: "Comment",
								type: "mul_text_input",
								placeholder: "Add a comment..."
							}}
						/>


						<div className="commentInput__sendBtn">
							<Button
								parent={this}
								config={{
									type: "btn_1",
									action: this.postComment,
									label: "Send",
									text: ""
								}}
								status={0} />
						</div>
					</div>


				</div>
			</div>
		);
	}
}


CommentInput.propTypes = {
	actions: PropTypes.object.isRequired,
	main: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired
};

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			comment: bindActionCreators(CommentActions, dispatch)
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommentInput);
