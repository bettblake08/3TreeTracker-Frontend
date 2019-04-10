/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ErrorPopup from "../UI/errorPopup";
import LandingView from "./home/landingView";
import ProductView from "./home/productView";
import InfoView from "./home/infoView";
import AccountView from "./home/accountView";
import * as ProductActions from "../../redux/actions/productActions";

import "../../assets/styles/scss/pages/main/home.scss";

class HomePage extends Component {
	constructor(props){
		super(props);

		this.state = {
			view:1,
			errorPopup:{}
		};

		this.setView = this.setView.bind(this);
	}

	setView(option){
		const { actions, products } = this.props;
		this.setState({view: option});

		if(option === 2 && products.offset === 0){
			actions.product.getProducts(true);
		}
	}

	render() {
		const { view } = this.state;
		var viewClass = `view__options--${view}`;
		return (

			<div id="section_1">
				<ErrorPopup />
				<div className={viewClass} >
					<div className={`view__option--${view == 1 ? "active" : "disabled" }`} onClick={() => { this.setView(1); }} >
						<svg className="icon">
							<use xlinkHref="#menu" />
						</svg>
					</div>
					<div className={`view__option--${view == 2 ? "active" : "disabled"}`} onClick={()=>{this.setView(2);}}>
						<svg className="icon">
							<use xlinkHref="#magnifier" />
						</svg>
					</div>
					<div className={`view__option--${view == 3 ? "active" : "disabled"}`} onClick={() => { this.setView(3); }}>
						<svg className="icon">
							<use xlinkHref="#info" />
						</svg>
					</div>
					<div className={`view__option--${view == 4 ? "active" : "disabled"}`} onClick={() => { this.setView(4); }}>
						<svg className="icon">
							<use xlinkHref="#note" />
						</svg>
					</div>
				</div>

				<div className={view == 1 ? "view--active" : "view--disabled"}>
					<LandingView parent={this}/>
				</div>

				<div className={view == 2 ? "view--active" : "view--disabled"}>
					<ProductView parent={this}/>
				</div>

				<div className={view == 3 ? "view--active" : "view--disabled"}>
					<InfoView parent={this}/>
				</div>

				<div className={view == 4 ? "view--active" : "view--disabled"}>
					<AccountView parent={this} />
				</div>

			</div>
		);
	}
}

HomePage.propTypes = {
	actions: PropTypes.object.isRequired,
	products: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	products:  state.productReducer.products
});

const mapDispatchToProps = (dispatch) => ({
	actions: {
		product: bindActionCreators(ProductActions, dispatch)
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
