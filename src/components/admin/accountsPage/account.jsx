import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import IconButton from "../../UI/iconButton";
import * as longrichAccountActions from "../../../actions/longrichAccountActions";
import { bindActionCreators } from "redux";

class Account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			iconButtons: [],
			toggleButtons: this.props.account.status != null ? true : false
		};

		this.getGender = this.getGender.bind(this);
	}

	getGender() {
		return this.props.account.gender == 0 ? "M" : "F";
	}

	render() {
		var account = this.props.account;
		if (account == undefined) { return <div></div>; }

		var parent = this.props.parent;
		var placement = account.placementId == 0 ? "None" : `${account.placement.name} ${account.placement.surname}`;

		return (
			<div className="account">
				<div className="account__title f_normal ">{`${account.name} ${account.name}`}</div>
				<div className="account__gender f_normal f_text-center">{this.getGender()}</div>
				<div className="account__nation f_normal f_text-center">{account.nationality}</div>
				<div className="account__email f_normal f_text-center">{account.email}</div>
				<div className="account__phoneNo f_normal f_text-center">{account.phoneNo}</div>
				<div className="account__code f_normal f_text-center">{account.code}</div>
				<div className="account__placement f_normal f_text-center">{placement}</div>
				<div className={`account__verified--${account.verified ? "t": "f"}t f_normal f_text-center`}>
					{account.verified ? "True" : "False"}
				</div>

				<div className="account__buttons">

					<div className="account__buttons__button">
						<IconButton
							parent={this}
							status={0}
							config={{
								action: () => {
									parent.toggleEditAccountPopup();
									this.props.actions.longrichAccountActions.setAccountInFocus(account);
									parent.state.editAccountPopup.state != undefined ? parent.state.editAccountPopup.setInput() : null;
								},
								class: "iconBtn",
								icon: "edit"
							}} />

					</div>

				</div>
			</div>
		);
	}
}

Account.propTypes = {
	account: PropTypes.object.isRequired,
	parent: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapDistpatchToProps(dispatch) {
	return {
		actions: {
			longrichAccountActions: bindActionCreators(longrichAccountActions, dispatch)
		}
	};
}

export default connect(()=>{}, mapDistpatchToProps)(Account);
