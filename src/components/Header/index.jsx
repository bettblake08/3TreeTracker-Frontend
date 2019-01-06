import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import AdminHeader from "./adminHeader";
import MainHeader from "./mainHeader";

class Header extends Component {
	constructor(props) {
		super(props);
        
		this.setHeader = this.setHeader.bind(this);
	}
    
	setHeader(){
		switch (this.props.auth.userType){
		case "lonrichUser": {
			return (<AdminHeader />);
		}
		default: {
			return (<MainHeader />);
		}
		}
	}
	
	render() {
		return (
			<div>
				{this.setHeader()}
			</div>
		);
	}
}

Header.propTypes = {
	actions: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		auth: state.loginAuthReducer.auth
	};
}

export default connect(
	mapStateToProps
)(Header);