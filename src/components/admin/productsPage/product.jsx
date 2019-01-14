import React, { Component } from "react";
import moment from "moment";
import humanize from "@nlib/human-readable";
import PropTypes from "prop-types";

import { WEB_URL } from "../../../abstract/variables";

class Product extends Component {
	render() {
		var post = this.props.product;
		var parent = this.props.parent.props.parent;

		const image = {
			background: `url('${WEB_URL}repo/${post.post.image.name}/thumb_150_150.jpg')`,
			backgroundPosition: "center",
			backgroundSize: "cover"
		};

		var time = moment(post.log.created_at, "YYYY-MM-DD HH:mm:ss").utc(3).local();
		var ctime = moment.duration(time.diff(moment()), "milliseconds").humanize();

		return (
			<div className="product--1__con" id={`p-${post.log.id}`}>
				<div className="product--1__con__up" style={image}
					onClick={
						() => {
							parent.setView(3);
							parent.state.EditProduct.state.productId = post.post.id;
							parent.state.EditProduct.getProduct();
						}}></div>

				<div className="product--1__con__down">

					<div className="product--1__title f_h1 f_text-capitalize">{post.post.title}</div>
					<div className="product--1__time f_comment_1 f_text-capitalize ">{ctime + " ago"}</div>
					<div className="product--1__text f_normal">{post.post.summary}</div>

					<div className="product--1__stat">
						<div className="product--1__stat__view">
							<div className="product--1__stat__icon">
								<div className="iconBtn--normal">
									<svg className="icon">
										<use xlinkHref="#view" />
									</svg>
								</div>
							</div>
							<div className="product--1__stat__value f_h2 f_text-bold">{humanize(post.post.stat.views)}</div>
						</div>

						<div className="product--1__stat__likes">
							<div className="product--1__stat__icon">
								<div className="iconBtn--normal">
									<svg className="icon">
										<use xlinkHref="#like" />
									</svg>
								</div>
							</div>
							<div className="product--1__stat__value f_h2 f_text-bold">{humanize(post.post.stat.reactions)}</div>
						</div>

						<div className="product--1__stat__com">
							<div className="product--1__stat__icon">
								<div className="iconBtn--normal">
									<svg className="icon">
										<use xlinkHref="#communication" />
									</svg>
								</div>
							</div>
							<div className="product--1__stat__value f_h2 f_text-bold">{humanize(post.post.stat.comments)}</div>
						</div>



						<div className="product--1__edit"
							onClick={
								() => {
									parent.setView(3);
									parent.state.editProduct.state.productId = post.post.id;
									parent.state.editProduct.getProduct();
								}}>
							<div className="iconBtn--success">
								<svg className="icon">
									<use xlinkHref="#edit" />
								</svg>
							</div>
						</div>


					</div>
				</div>
			</div>
		);
	}
}

Product.propTypes = {
	parent:PropTypes.object.isRequired,
	product: PropTypes.object.isRequired
};

export default Product;