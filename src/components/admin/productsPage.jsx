import React, { Component } from "react";

import ErrorPopup from "../UI/errorPopup";
import ProductsView from "./productsPage/productsView";
import AddProduct from "./productsPage/addProduct";
import EditProduct from "./productsPage/editProduct";

import "../../styles/scss/pages/admin/products.scss";

class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 1,
			AddProduct:{},
			EditProduct:{},
			ProductsView:{}
		};

		this.setView = this.setView.bind(this);
	}

	setView(option) {
		var state = this.state;
		state.view = option;
		this.setState(state);
	}

	render() {
		return (
			<div id="section_1" className="SB">
				<ErrorPopup />

				<div className={`view--${this.state.view == 1 ? "active": "disabled"}`}>
					<ProductsView parent={this}/>
				</div>

				<div className={`view--${this.state.view == 2 ? "active" : "disabled"}`}>
					<AddProduct parent={this} />
				</div>

				<div className={`view--${this.state.view == 3 ? "active" : "disabled"}`}>
					<EditProduct parent={this} productId={0} />
				</div>

			</div>
		);
	}
}

export default Products;