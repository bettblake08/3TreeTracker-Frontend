import React, { Component } from "react";
import PropTypes from "prop-types";
import AccountRegistration from "./accountRegistration";
import AccountLogin from "./accountLogin";

class AccountView extends Component {
	render() {
		return (
			<div className="accountView">
				<div><AccountLogin parent={this.props.parent} /></div>
				<div><AccountRegistration parent={this.props.parent} /></div>
			</div>
		);
	}
}

AccountView.propTypes = {
	parent: PropTypes.object.isRequired
};

export default AccountView;