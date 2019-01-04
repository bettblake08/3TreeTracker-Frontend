import React, { Component } from "react";
import ProductsDisplay from "./productsDisplay";
import ViewProduct from "./viewProduct";

class Products extends Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 1,
			viewProduct: {},
			productsView: {}
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
			<div>

				<div className={this.state.view == 1 ? "viewh--active" : "viewh--disabled"}>
					<div className="view--scrollable productView">
						<ProductsDisplay parent={this}/>
					</div>
				</div>

				<div className={this.state.view == 2 ? "viewh--active" : "viewh--disabled"}>
					<div className="view--scrollable productView">
						<ViewProduct parent={this} />
					</div>
				</div>

			</div>
		);
	}
}

export default Products;