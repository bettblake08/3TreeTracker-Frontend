import React, { Component } from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "react-loaders";

import * as ProductActions from "../../../actions/productActions";
import ButtonWithIcon from "../../UI/buttonWithIcon";
import Product from "./product";


class ProductsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttons: []
		};

		this.getProducts = this.getProducts.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}

	componentDidMount() {
		this.getProducts(true);
	}

	getProducts(reset = false) {
		const { actions } = this.props;
		actions.product.getProducts(reset, true);
	}

	loadMore(){
		this.getProducts();
	}

	render() {
		var c = this;
		var { products, parent } = this.props;

		return (
			<div className="admin content">
				<div className="ad__products__topBar row">
					<div className="ad__products__topBar__title f_h1 f_text-left f_text-capitalize">Products</div>
					<div className="ad__products__topBar__right">

						<div className="ad__products__topBar__right__add">
							<ButtonWithIcon
								parent={this}
								status={0}
								config={{
									class: "btnIcon_1",
									label: "Product",
									text: "",
									icon: "add-2",
									action: () => {
										parent.setView(2);
									}
								}} />
						</div>

					</div>
				</div>
				
				<div className="ad__products__view" ref={(ref) => { parent.scrollParentRef = ref; }}>
					<InfiniteScroll
						pageStart={0}
						loadMore={this.loadMore}
						hasMore={products.hasMore}
						useWindow={false}
						getScrollParent={() => this.scrollParentRef}
						loader={(<Loader type="line-scale" key={0} />)}
					>
						<div className="ad__products__grid" >
							{
								products.content.map((item, i) => {
									return <Product product={item} key={i} parent={this} />;
								})
							}
						</div>
					</InfiniteScroll>
				</div>
			</div>
		);
	}
}

ProductsView.propTypes = {
	actions: PropTypes.object.isRequired,
	products: PropTypes.object.isRequired,
	parent: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		products: state.productReducer.products
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