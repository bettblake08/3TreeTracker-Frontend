/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "react-loaders";

import Product from "./product";
import * as productActions from "../../../actions/productActions";

class ProductsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttons: []
		};

		this.getProducts = this.getProducts.bind(this);
	}

	getProducts(reset = false) {
		this.props.actions.products.getProducts(reset);
	}

	render() {
		const { products } = this.props;
		
		return (
			<div id="content" className="products__view SB" ref={(ref => this.scrollParentRef = ref)}>

				<InfiniteScroll
					pageStart={0}
					loadMore={() => { this.getProducts(); }}
					hasMore={products.hasMore}
					useWindow={false}
					getScrollParent={() => this.scrollParentRef}
					loader={(<Loader type="line-scale" key={0} />)}
				>
					<div className="products__content">

						{
							products.content.map((item, i) => {
								return (
									<div className="pro" key={i}>
										<Product post={item} parent={this} viewType={1} />
									</div>);
							})
						}
						
					</div>

				</InfiniteScroll>
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
		products: state.productReducer.products
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
