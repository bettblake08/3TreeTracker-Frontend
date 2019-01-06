import React, { Component } from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as ProductActions from "../../../actions/productActions";
import { WEB_URL } from "../../../abstract/variables";
import ProductAPI from "../../../api/productAPI";
import EditForm from "./editForm";


class EditProduct extends Component {
	constructor(props) {
		super(props);

		this.getProduct = this.getProduct.bind(this);
		this.setCoverImage = this.setCoverImage.bind(this);

		this.state = {
			ajax: {
				getProduct: {
					error: "",
					attempts: 0
				},
				getExtraData: {
					error: "",
					attempts: 0
				}
			},
			productId: 0,
			product: {
				log: {
					id: "",
					type: "",
					created_at: ""
				},
				post: {
					title: "",
					body: "",
					summary: "",
					id: "",
					tags: []
				}
			},
			updated: false,
			errorPopup: {}
		};

	}

	componentDidMount() {
		this.props.parent.setState({editProduct: this});
	}

	getProduct() {
		var component = this;
		var state = component.state;
        
		ProductAPI.getProductAsAdmin(
			state.productId,
			(response) => {
				component.setState({updated: true, product: response.data.content});
				component.setCoverImage();
			});
	}

	setCoverImage() {
		var state = this.state;

		if (state.product.post.image != undefined) {
			var preview = document.querySelectorAll(".repoImagePreview");

			preview.forEach((e) => {
				e.setAttribute("style", `background: url("${WEB_URL}repo/${
					state.product.post.image.name}.${
					state.product.post.image.type}") center ; background-size:cover;`);
				e.dataset.image = JSON.stringify(state.product.post.image);
			});

		}
	}

	render() {
		if (this.state.product.post.title == undefined) { return <div></div>; }

		return (
			<div className="view--scrollable SB">
				<div className="product">
					<EditForm parent={this} />
				</div>
			</div>

		);
	}
}

EditProduct.propTypes = {
	parent: PropTypes.object.isRequired
};

function mapStateToProps() {
	return {};
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
)(EditProduct);