import React, { Component } from "react";
import humanize from "@nlib/human-readable";
import PropTypes from "prop-types";
import {WEB_URL} from "../../../abstract/variables";

class Product extends Component {
	render() {
		var post = this.props.post;
		var parent = this.props.parent.props.parent;

		const image = {
			background: `url('${WEB_URL}repo/${post.post.image.name}/thumb_150_150.jpg')`,
			backgroundPosition: "center",
			backgroundSize: "cover"
		};

		return (
			<div className="pro--1__con" id={"p-" + post.log.id}>
				<div className="pro--1__con__up" style={image}
					onClick={
						() => {
							parent.setView(2);
							parent.state.viewProduct.state.product.id = post.post.id;
							parent.state.viewProduct.getProduct();
						}}>

					<div className="pro--1__link">
						<div className="pro--1__title f_normal f_text-capitalize">{post.post.title}</div>
						<svg className="icon">
							<use xlinkHref="#view" />
						</svg>
					</div>


				</div>

				<div className="pro--1__con__down">

					<div className="pro--1__stat">
						<div className="pro--1__stat__view">
							<div className="pro--1__stat__icon">
								<div className="iconBtn--normal">
									<svg className="icon">
										<use xlinkHref="#view" />
									</svg>
								</div>
							</div>
							<div className="pro--1__stat__value f_h2 f_text-bold">{humanize(post.post.stat.views)}</div>
						</div>

						<div className="pro--1__stat__likes">
							<div className="pro--1__stat__icon">
								<div className="iconBtn--normal">
									<svg className="icon">
										<use xlinkHref="#like" />
									</svg>
								</div>
							</div>
							<div className="pro--1__stat__value f_h2 f_text-bold">{humanize(post.post.stat.reactions)}</div>
						</div>

						<div className="pro--1__stat__com">
							<div className="pro--1__stat__icon">
								<div className="iconBtn--normal">
									<svg className="icon">
										<use xlinkHref="#communication" />
									</svg>
								</div>
							</div>
							<div className="pro--1__stat__value f_h2 f_text-bold">{humanize(post.post.stat.comments)}</div>
						</div>


					</div>
				</div>
			</div>
		);
	}
}

Product.propTypes = {
	post: PropTypes.object.isRequired,
	parent: PropTypes.object.isRequired
};

export default Product;