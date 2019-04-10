import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import{ WEB_URL, MAIN_LOGO} from "../../abstract/variables";
import Button from "../UI/button";
import MainHeader from "./mainHeader";
import * as AuthenticationActions from "../../redux/actions/authenticationActions";

class Header extends Component {
	constructor(props) {
		super(props);

		this.setHeader = this.setHeader.bind(this);
	}

	setHeader() {
		if(this.props.auth.userType == "admin"){
			return (<AdminHeader actions={this.props.actions}/>);
		}

		return (<MainHeader />);
	}

	render() {
		return (
			<div>
				{this.setHeader()}
			</div>
		);
	}
}

class AdminHeader extends Component {
	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);

		this.state = {
			buttons: []
		};
	}

	logout() {
		this.props.actions.auth.adminLogout();
	}

	render() {
		
		return (
			<div className="admin header--active" style={{ margin: 0, padding: 0 }}>
				<div className="header">
					<div className="header__left">
						<a href={`${WEB_URL}admin/home`}>
							<div className="header__logo">
								<img src={MAIN_LOGO} />
							</div>
						</a>
					</div>

					<div className="header__title f_banner_1 f_text-capitalize">Admin Platform</div>


					<div className="header__right">
						<div className="header__right__logOut">
							<Button
								parent={this}
								status={5}
								config={{
									text: "",
									label: "Log Out",
									type: "btn_1",
									action: this.logout
								}}
							/>
						</div>
					</div>

				</div>
			</div>
		);
	}
}

Header.propTypes = {
	actions: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

AdminHeader.propTypes = {
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		auth: state.loginAuthReducer.auth
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions:{
			auth: bindActionCreators(AuthenticationActions, dispatch)
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);