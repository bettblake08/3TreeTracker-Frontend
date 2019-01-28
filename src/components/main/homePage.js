/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import ErrorPopup from "../UI/errorPopup";
import LandingView from "./home/landingView";
import ProductView from "./home/productView";
import InfoView from "./home/infoView";
import AccountView from "./home/accountView";

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
		var state = this.state;
		state.view = option;
		this.setState(state);
	}

	render() {
		var viewClass = "view__options";
		viewClass += "--" + this.state.view;
		return (

			<div id="section_1">
				<ErrorPopup />
				<div className={viewClass} >
					<div className={this.state.view == 1 ? "view__option--active" : "view__option--disabled"} onClick={() => { this.setView(1); }} >
						<svg className="icon">
							<use xlinkHref="#menu" />
						</svg>
					</div>
					<div className={this.state.view == 2 ? "view__option--active" : "view__option--disabled"} onClick={()=>{this.setView(2);}}>
						<svg className="icon">
							<use xlinkHref="#magnifier" />
						</svg>
					</div>
					<div className={this.state.view == 3 ? "view__option--active" : "view__option--disabled"} onClick={() => { this.setView(3); }}>
						<svg className="icon">
							<use xlinkHref="#info" />
						</svg>
					</div>
					<div className={this.state.view == 4 ? "view__option--active" : "view__option--disabled"} onClick={() => { this.setView(4); }}>
						<svg className="icon">
							<use xlinkHref="#note" />
						</svg>
					</div>
				</div>

				<div className={this.state.view == 1 ? "view--active" : "view--disabled"}>
					<LandingView parent={this}/>
				</div>

				<div className={this.state.view == 2 ? "view--active" : "view--disabled"}>
					<ProductView parent={this}/>
				</div>

				<div className={this.state.view == 3 ? "view--active" : "view--disabled"}>
					<InfoView parent={this}/>
				</div>

				<div className={this.state.view == 4 ? "view--active" : "view--disabled"}>
					<AccountView parent={this} />
				</div>

			</div>
		);
	}
}

export default HomePage;