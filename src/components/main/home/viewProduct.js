/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import StickyBox from "react-sticky-content";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {WEB_URL, DEFAULT_PRODUCT_COVER_PIC} from "../../../abstract/variables";
// import CommentingSystem from "../../common/commentSystem";
import ButtonWithIcon from "../../UI/buttonWithIcon";

import * as ProductActions from "../../../actions/productActions";
import { getHumanizedTime } from "../../../helper/time";
import Loader from "react-loaders";

class ViewProduct extends Component {
	constructor(props){
		super(props);

		this.state = {
			userId:"",
			coverPhotoUrl:"",
			reaction:0,
			stat:{
				likes:0,
				dislikes:0
			},
			buttons:[],
			product:{
				id: this.props.productId,
				data:{},
			}
		};

		this.setCoverPhoto = this.setCoverPhoto.bind(this);
		this.reactToProduct = this.reactToProduct.bind(this);
		this.getProduct = this.getProduct.bind(this);
		this.checkReaction = this.checkReaction.bind(this);
		this.updateReactionStats = this.updateReactionStats.bind(this);
	}

	componentDidMount() {
		this.props.parent.setState({ viewProduct: this});
	}

	setCoverPhoto(){
		var product = this.props.productsState.product.content.post;
		let coverImage = `${WEB_URL}repo/${product.image.name}.${product.image.type}`;
		this.setState({ coverPhotoUrl: product.image !== undefined ? coverImage : DEFAULT_PRODUCT_COVER_PIC});
	}

	getProduct() {
		this.props.actions.product.getProduct(
			this.state.product.id,
			() => {
				this.setCoverPhoto();
			}
		);
	}

	reactToProduct(reaction = 1) {
		this.props.actions.product.reactToProduct(
			reaction,
			() => {
				this.updateReactionStats(reaction);
				this.checkReaction();
			});
	}

	updateReactionStats(reaction){
		let state = this.state;

		switch (state.reaction) {
			case 0: {
				switch (reaction) {
					case 1: {
						state.stats.likes++;
						break;
					}
					case 2: {
						state.stats.dislikes++;
						break;
					}
				}
				break;
			}
			case 1: {
				switch (reaction) {
					case 2: {
						state.stats.likes--;
						state.stats.dislikes++;
						break;
					}
				}
				break;
			}
			case 2: {
				switch (reaction) {
					case 1: {
						state.stats.dislikes--;
						state.stats.likes++;
						break;
					}
				}
				break;
			}
			default: return;
		}

		this.setState(state);
	}

	checkReaction() {
		var product = this.props.productsState.product.content.data.post;
		var state = this.state;

		var reaction = product.stats.find(item => item.user == state.userId);

		state.reaction = reaction == undefined ? 0 : reaction.reaction;

		state.buttons[0].state.status = state.reaction == 2 ? 5 : 0;
		state.buttons[0].state.label = state.reaction == 2 ? "Disliked" : "Dislike";
		state.buttons[1].state.status = state.reaction == 1 ? 6 : 0;
		state.buttons[1].state.label = state.reaction == 1 ? "Liked" : "Like";

		this.setState(state);
	}

	render() {
		let { parent, productsState } = this.props;

		var product = productsState.product.content;
		if (product.post === undefined) { return <div />; }

		var coverImage = {
			backgroundImage: `url('${this.state.coverPhotoUrl}')`,
			backgroundSize:"cover",
			backgroundPosition:"center"
		};

		let { reaction, stat } = this.state;

		return (
			<div className="vP">
				<div className="pageTop">
					<div className="pageTop__background" style={coverImage}></div>
					<div className="pageTop__foreground"></div>
				</div>

				<div className="section">

					<StickyBox >
						<div className="section__1"></div>
					</StickyBox>
                    
					<StickyBox >

						{
							productsState.productIsLoading
							? <Loader type="line-scale" key={0} />
							: <div className="section__2">
								<div className="navigation">
									<div className="navigation__home">
										<ButtonWithIcon
											parent={this}
											status={0}
											config={{
												class: "btnIcon_1",
												action: () => {
													parent.setView(1);
												},
												label: "Back",
												icon: "back"
											}}
										/>
									</div>



									<div className="navigation__stat">
										<div className="navigation__stat__view">
											<div className="navigation__stat__icon">
												<div className="iconBtn--normal">
													<svg className="icon">
														<use xlinkHref="#view" />
													</svg>
												</div>
											</div>
											<div className="navigation__stat__value f_h2 f_text-bold">{product.post.stat.views}</div>
										</div>

										<div className="navigation__stat__likes">
											<div className="navigation__stat__icon">
												<div className="iconBtn--normal">
													<svg className="icon">
														<use xlinkHref="#like" />
													</svg>
												</div>
											</div>
											<div className="navigation__stat__value f_h2 f_text-bold">{stat.likes}</div>
										</div>

										{/* <div className="navigation__stat__com">
									<div className="navigation__stat__icon">
										<div className="iconBtn--normal">
											<svg className="icon">
												<use xlinkHref="#communication" />
											</svg>
										</div>
									</div>
									<div className="navigation__stat__value f_h2 f_text-bold">{product.stat.comments}</div>
								</div> */}

									</div>

									<div className="navigation__buttons">
										<div className="navigation__buttons__button">
											<ButtonWithIcon
												parent={this}
												status={reaction == 2 ? 5 : 0}
												config={{
													class: "btnIcon_2",
													action: () => { this.reactToProduct(2); },
													label: reaction == 2 ? "Disliked" : "Dislike",
													icon: "dislike"
												}}
											/>
										</div>
										<div className="navigation__buttons__button">
											<ButtonWithIcon
												parent={this}
												status={reaction == 1 ? 6 : 0}
												config={{
													class: "btnIcon_2",
													action: () => { this.reactToProduct(1); },
													label: reaction == 1 ? "Liked" : "Like",
													icon: "like"
												}}
											/>
										</div>
									</div>

								</div>

								<div className="product">
									<div className="product__content">
										<div className="product__primary">

											<div className="product__title f_title f_text-capitalize">{product.post.title}</div>
											<div className="product__time f_normal">{getHumanizedTime(product.log.created_at)}</div>

										</div>
										<div className="product__tags">
											{
												product.post.tags.map((item, i) => {
													return (<div className="product__tag f_normal" key={i}>{item.name}</div>);
												})
											}
										</div>

										<div className="product__text">
											<div className="ck--1" dangerouslySetInnerHTML={{ __html: product.post.body }}></div>
										</div>

									</div>

									{/* <div className="product__commentSection">
								<CommentingSystem commentingOn={1} product={this.state.product.data} parent={this}/>
							</div>  */}

								</div>

							</div>
						}
						

					</StickyBox>

                    

					<StickyBox >
						<div className="section__3"></div>
					</StickyBox>
                    
				</div>  
			</div>
		);
	}
}

ViewProduct.propTypes = {
	productId: PropTypes.number,
	parent:PropTypes.object.isRequired,
	productsState: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	productsState: state.productReducer
});

const mapDispatchToProps = (dispatch) => ({
	actions: {
		product: bindActionCreators(ProductActions, dispatch)
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct);
