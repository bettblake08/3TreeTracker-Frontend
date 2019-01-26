import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as longrichAccountActions from "../../../actions/longrichAccountActions";
import Button from "../../UI/button";
import PlacementInput from "../../placementInput";


class EditAccountPopup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			account: this.props.accountInFocus,
			placements: [],
			buttons: []
		};

		this.confirm = this.confirm.bind(this);
		this.setInput = this.setInput.bind(this);
	}

	componentDidMount() {
		this.props.parent.setState({ editAccountPopup: this});
		this.setInput();
	}
    
	componentDidUpdate(){
		if(this.props.accountInFocus !== this.props.accountInFocus){
			this.setInput();
		}
	}

	setInput() {
		var account = this.props.accountInFocus;
		var state = this.state;
		account.placement == undefined ? null : state.placements.push(account.placement);
		this.setState(state);
	}

	confirm() {
		this.props.actions.longrichAccount.updateAccount(
			{
				placementId: this.state.placements[0].id
			}
		);
	}

	render() {
		return (
			<div className="editPP">
				<div className="editPP__content">
					<form method="post" encType="multipart/form-data">

						<div className="reg__form" >

							<h1 className="f_h1">Edit Account Information</h1>

							<div className="reg__placement">
								<div className="reg__placement__label f_h1">Placement</div>
								<div className="reg__placement__input" >
									<PlacementInput />
								</div>
								<div className="reg__placement__comment f_comment_1">Select a longrich agent to register under.</div>
							</div>

						</div>
					</form>
				</div>

				<div className="editPP__buttons">
					<div className="editPP__buttons__button">
						<Button
							parent={this}
							status={5}
							config={{
								type: "btn_1",
								label: "Cancel",
								text: "",
								action: this.props.parent.toggleEditAccountPopup
							}} />
					</div>

					<div className="editPP__buttons__button">
						<Button
							parent={this}
							status={6}
							config={{
								type: "btn_1",
								label: "Confirm",
								text: "",
								action: this.confirm
							}} />
					</div>

				</div>
			</div>
		);
	}
}

EditAccountPopup.propTypes = {
	parent: PropTypes.object.isRequired,
	accountInFocus: PropTypes.object.isRequired,    
	actions: PropTypes.object.isRequired  
};

function mapStateToProps(state){
	return {
		accountInFocus: state.longrichAccountActions.accountInFocus
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: {
			longrichAccount: bindActionCreators(longrichAccountActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountPopup);
