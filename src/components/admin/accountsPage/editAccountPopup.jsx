import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as LongrichAccountActions from "../../../redux/actions/longrichAccountActions";
import * as HelperActions from "../../../redux/actions/helpers";

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
		this.setInput();
	}
    
	componentDidUpdate(prevProps){
		if(this.props.accountInFocus !== prevProps.accountInFocus){
			this.setInput();
		}
	}

	setInput() {
		var { accountInFocus } = this.props;
		var state = this.state;
		if (accountInFocus.placement !== undefined) state.placements.push(accountInFocus.placement);
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

						<div className="editPP__form" >

							<h1 className="f_h1">Edit Account Information</h1>

							<div className="editPP__placement">
								<div className="editPP__placement__label f_h1">Placement</div>
								<div className="editPP__placement__input" >
									<PlacementInput />
								</div>
								<div className="editPP__placement__comment f_comment_1">Select a longrich agent to register under.</div>
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
								action: ()=>{
									this.props.actions.helper.toggleContent("editAccountPopup");
								}
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
	accountInFocus: PropTypes.object.isRequired,    
	actions: PropTypes.object.isRequired  
};

function mapStateToProps(state){
	return {
		accountInFocus: state.longrichAccountsReducer.accountInFocus
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: {
			longrichAccount: bindActionCreators(LongrichAccountActions, dispatch),
			helper: bindActionCreators(HelperActions, dispatch),
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountPopup);
