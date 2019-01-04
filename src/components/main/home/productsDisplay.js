import React, { Component } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import Product from "../../common/product";
import * as productActions from "../../../actions/productActions";
import Button from "../../UI/button";

class ProductsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttons: []
		};

		this.getProducts = this.getProducts.bind(this);
	}

	componentDidMount() {
		this.getProducts();
	}

	getProducts(reset = false) {
		let offset = this.props.products.offset;
		this.props.actions.products.getProducts(reset, offset == undefined ? 0: offset);
	}

	render() {
		var c = this;
		
		return (
			<div id="content">
				<div className="content__view">
					{
						this.props.products.content.map((item, i) => {
							return (
								<div className="pro" key={i}>
									<Product post={item} parent={this} />
								</div>);
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
			content: state.products == undefined ? []: state.products.content,
			offset: state.products == undefined ? 0 : state.products.offset
		}
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			products: bindActionCreators(productActions, dispatch)
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductsView);
