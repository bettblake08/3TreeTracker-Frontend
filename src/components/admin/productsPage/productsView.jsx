import React, { Component } from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as ProductActions from "../../../actions/productActions";
import Button from "../../UI/button";
import ButtonWithIcon from "../../UI/buttonWithIcon";
import Product from "./product";


class ProductsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: [],
			offset: 0,
			buttons: []
		};

		this.getProducts = this.getProducts.bind(this);
	}

	componentDidMount() {
		this.getProducts();
	}

	getProducts(reset = false) {
		this.props.actions.product.getProductsAsAdmin(reset, this.props.products.offset);
	}

	render() {
		var c = this;
		return (
			<div id="content">
				<div className="topBar row">
					<div className="topBar__title f_h1 f_text-left f_text-capitalize"></div>
					<div className="topBar__right">

						<div className="topBar__right__add">
							<ButtonWithIcon
								parent={this}
								status={0}
								config={{
									class: "btnIcon_1",
									label: "Product",
									text: "",
									icon: "add-2",
									action: () => {
										c.props.parent.setView(2);
									}
								}} />
						</div>

					</div>
				</div>

				<div className="content__view">
					{
						this.state.content.map((item, i) => {
							return <Product post={item} key={i} parent={this} />;
						})
					}
				</div>

				<div className="loadBtn">
					<Button
						parent={this}
						status={0}
						config={{
							type: "btn_1",
							label: "More",
							text: "",
							action: () => {
								c.getProducts();
							}
						}} />
				</div>
			</div>
		);
	}
}

ProductsView.propTypes = {
	actions: PropTypes.object.isRequired,
	products: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		products: {
			content: state.productReducer.products.content,
			offset: state.productReducer.products.offset
		}
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			product: bindActionCreators(ProductActions, dispatch)
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductsView);