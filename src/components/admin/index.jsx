import React, { Component } from "react";
import { Route, Switch , Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import AdminHeader from "../header/adminHeader";
import ProductsPage from "./productsPage";
import AccountsPage from "./accountsPage";
import RepoPage from "./repoPage";
import SideBar from "../admin/sidebar";

import "../../assets/styles/scss/admin.scss";

class AdminPlatform extends Component {
	constructor(props) {
		super(props);

		this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
	}
    
	checkIfLoggedIn(Component){
		if(this.props.auth.userType == "admin"){
			return (<Component />);
		}

		return (<Redirect to={"/admin/login"} />);
	}

	render() {
		let path = this.props.match.path;
		return (
			<div>
				<AdminHeader />

				<div className="admin main">
					<SideBar />
					
					<Switch>
						<Route path={`${path}/products`} render={() => this.checkIfLoggedIn(ProductsPage)} />
						<Route path={`${path}/accounts`} render={() => this.checkIfLoggedIn(AccountsPage)} />
						<Route path={`${path}/repo`} render={() => this.checkIfLoggedIn(RepoPage)} />
					</Switch>
				</div>
			</div>
		);
	}
}


AdminPlatform.propTypes = {
	auth: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		auth: state.loginAuthReducer.auth
	};
}

export default connect(
	mapStateToProps
)(AdminPlatform);
