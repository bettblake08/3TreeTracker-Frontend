import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";

import IconButton from "../../UI/iconButton";
import * as longrichAccountActions from "../../../redux/actions/longrichAccountActions";
import * as HelperActions from "../../../redux/actions/helpers";


class Account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			iconButtons: [],
			toggleButtons: this.props.account.status !== null
		};

		this.getGender = this.getGender.bind(this);
	}

	getGender() {
		return this.props.account.gender === 0 ? "M" : "F";
	}

	render() {
		var { account, parent, actions } = this.props;
		if (account === undefined) { return <div></div>; }

		var placement = account.placementId == 0 ? "None" : `${account.placement.name} ${account.placement.surname}`;

		return (
			<div className="account">
				<div className="account__title f_normal ">{`${account.name} ${account.surname}`}</div>
				<div className="account__gender f_normal f_text-center">{this.getGender()}</div>
				<div className="account__nation f_normal f_text-center">{account.nationality}</div>
				<div className="account__email f_normal f_text-center">{account.email}</div>
				<div className="account__phoneNo f_normal f_text-center">{account.phoneNo}</div>
				<div className="account__code f_normal f_text-center">{`${account.code}`}</div>
				<div className="account__placement f_normal f_text-center">{placement}</div>
				<div className={`account__verified--${account.verified ? "t" : "f"} f_normal f_text-center`}>
					{account.verified ? "True" : "False"}
				</div>

				<div className="account__buttons">

					<div className="account__buttons__button">
						<IconButton
							parent={this}
							status={0}
							config={{
								action: () => {
									actions.longrichAccountActions.setAccountInFocus(account);
									actions.helper.toggleContent("editAccountPopup");
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

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			longrichAccountActions: bindActionCreators(longrichAccountActions, dispatch),
			helper: bindActionCreators(HelperActions, dispatch)
		}
	};
}

export default connect(null, mapDispatchToProps)(Account);
