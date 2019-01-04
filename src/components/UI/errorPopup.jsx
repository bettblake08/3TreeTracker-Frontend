import React, { Component } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import * as ErrorPopupActions from "../../actions/errorPopupActions";

class ErrorPopup extends Component {
	render() {
		return (
			<div className="ePP">
				{ 
					this.props.errorPopup.errors.map((item,i)=>{
						return <ErrorMessage error={item} key={i}/>;
					})
				}
			</div>
		);
	}
}

class ErrorMessage extends Component {
	constructor(props){
		super(props);

		this.state = {
			togglePopup:false
		};

		this.togglePopup = this.togglePopup.bind(this);
	}

	componentDidMount(){
		var com = this;
		com.togglePopup();

		setTimeout(()=>{
			com.togglePopup();
		},5000);
	}

	togglePopup(){
		this.setState({ togglePopup: this.state.togglePopup ? false : true});
	}

	render() {
		return (
			<div className={this.state.togglePopup == false ? "ePP__error--disabled" : "ePP__error--active"}>
				<div className="ePP__error__icon">
					<svg className="icon">
						<use xlinkHref="#warning" />
					</svg>
				</div>
				<div className="ePP__error__content f_normal">
					{this.props.error}
				</div>
			</div>
		);
	}
}

ErrorPopup.propTypes = {
	actions: PropTypes.object.isRequired,
	errorPopup: PropTypes.object.isRequired
};

ErrorMessage.propTypes = {
	error: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
};

function mapStateToProps(state) {
	let errorPopup = state.errorPopupReducer.errorPopup;
	return {
		errorPopup:  errorPopup == undefined ? { errors: [] } : errorPopup
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:{
			errorPopup: bindActionCreators(ErrorPopupActions, dispatch)
		}
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ErrorPopup);
