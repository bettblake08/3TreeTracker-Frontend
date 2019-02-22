import React, { Component } from "react";

import ErrorPopup from "../UI/errorPopup";
import ProductsView from "./productsPage/productsView";
import AddProduct from "./productsPage/addProduct";
import EditProduct from "./productsPage/editProduct";

import "../../assets/styles/scss/pages/admin/products.scss";


class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 1,
			AddProduct:{},
			ProductsView:{},
			productOnFocus: 0
		};

		this.setView = this.setView.bind(this);
	}

	setView(option) {
		this.setState({view: option});
	}

	setFocusOnProduct(productId){
		this.setState({ productOnFocus: productId });
	}

	render() {
		return (
			<div className="admin section__1 SB adminProductsPage">
				<ErrorPopup />

				<div className={`view--${this.state.view == 1 ? "active": "disabled"}`}>
					<ProductsView parent={this}/>
				</div>

				<div className={`view--${this.state.view == 2 ? "active" : "disabled"}`}>
					{this.state.view === 2 ? <AddProduct parent={this} /> : null}
				</div>

				<div className={`view--${this.state.view == 3 ? "active" : "disabled"}`}>
					{this.state.view === 3 ? <EditProduct parent={this} productId={this.state.productOnFocus} /> : null }
				</div>

			</div>
		);
	}
}

export default Products;