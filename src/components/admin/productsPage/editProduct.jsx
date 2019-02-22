import React, { Component } from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import CKEditor from "@ckeditor/ckeditor5-react";

import * as ProductActions from "../../../actions/productActions";
import * as TagActions from "../../../actions/tagActions";
import * as HelperActions from "../../../actions/helpers";
import { WEB_URL } from "../../../abstract/variables";
import Button from "../../UI/button";
import Repo from "../../common/repo";
import Popup from "../../UI/popup";
import TagInput from "../../UI/tagInput";
import TextInput from "../../UI/textInput";
import MultiLineText from "../../UI/MultiLineTextInput";

class EditProduct extends Component {
	constructor(props) {
		super(props);

		this.getProduct = this.getProduct.bind(this);
		this.setCoverImage = this.setCoverImage.bind(this);

		this.state = {
			toggleRepo: false,
			textInputs: [],
			buttons: [],
			data: {
				currency: [],
				duration: []
			},
			form: {
				body: ""
			},
			errorPopup: {}
		};

		this.setProductData = this.setProductData.bind(this);
		this.handleProductBodyChange = this.handleProductBodyChange.bind(this);
		this.toggleRepo = this.toggleRepo.bind(this);
		this.productSubmit = this.productSubmit.bind(this);
	}

	componentDidMount(){
		this.getProduct();
	}

	componentDidUpdate(prevProps) {
		const prevProduct = prevProps.productId;
		const currentProduct = this.props.productId;

		if (prevProduct !== undefined && currentProduct !== 0 && prevProduct !== currentProduct) {
			this.getProduct();
		}
	}

	getProduct() {
		var component = this;
		const { actions, productId } = this.props;

		actions.product.getProduct(
			productId,
			() => {
				component.setCoverImage();
				component.setProductData();
			}, true);
	}

	setCoverImage() {
		var product = this.props.product.content;

		if (product.post.image != undefined) {
			var preview = document.querySelectorAll(".repoImagePreview");

			preview.forEach((e) => {
				e.setAttribute("style", `background: url("${WEB_URL}repo/${
					product.post.image.name}.${
					product.post.image.type}") center ; background-size:cover;`);
				e.dataset.image = JSON.stringify(product.post.image);
			});

		}
	}

	setProductData() {
		var state = this.state;
		const { actions } = this.props;
		var product = this.props.product.content.post;

		if (product !== null) {
			state.textInputs[0].setState({ inputValue : product.title });
			state.textInputs[1].setState({ inputValue: product.summary });
			state.form.body = product.body;
			actions.tag.setTags(product.tags);
			this.setState(state);
		}
		else {
			this.props.parent.getProduct();
		}
	}

	handleProductBodyChange(event, editor) {
		var state = this.state;
		state.form.body = editor.getData().substr(0, 60000);
		this.setState(state);
	}

	productSubmit() {
		var imageFile = document.querySelector(".repoImagePreview").dataset.image;       //Check if image has been selected

		if (imageFile == undefined || imageFile.length == 0) {
			this.toggleRepo();
			return;
		}
		else {
			imageFile = JSON.parse(imageFile);
		}

		var textInputs = this.state.textInputs;

		textInputs.forEach((elem) => {
			if (elem.state.inputValue === "") {
				elem.focus();
			}
		});

		if (this.state.form.body === "") {
			document.querySelector(".proForm__textBox").focus();
			return;
		}

		const { parent, actions, tags } = this.props;

		const updateProduct = {
			pro__id: this.props.productId,
			pro__image: imageFile.id,
			pro__title: textInputs[0].state.inputValue,
			pro__body: this.state.form.body,
			pro__summary: textInputs[1].state.inputValue,
			pro__tags: JSON.stringify(tags.map(item => item.id))
		};
		
		actions.product.updateProduct(
			updateProduct,
			() => {
				parent.setView(1);
				actions.product.getProducts(true, true);
			});

		actions.tag.resetTags();
	}

	toggleRepo() {
		this.props.actions.helper.togglePopup("repoPopup");
	}

	render() {
		const { parent, product } = this.props;
		if (product.content.post == undefined) { return <div></div>; }

		return (
			<div className="view--scrollable SB">
				<div className="product">
					<div id="editProduct" className="admin content">
						<div className={`proForm base${this.state.toggleRepo ? "--disabled" : ""}`}>
							<form method="post" encType="multipart/form-data">
								{/* <!-- IMAGE SELECT AREA--> */}

								<div className="proForm__image">
									<div id="img_select">
										<div id="img_select__img" className="repoImagePreview">
											<input type="hidden" id="art_selected_image" name="image" />
										</div>

										<div id="img_select__buttons">
											<div className="btnIcon_1" onClick={this.toggleRepo}>
												<div className="btnIcon_1__icon">
													<svg className="icon">
														<use xlinkHref="#repo" />
													</svg>
												</div>
												<div className="btnIcon_1__label f_button_2 f_text-capitalize">Repo</div>
											</div>
										</div>

									</div>

								</div>

								{/* <!-- IMAGE SELECT AREA--> */}


								{/* <!-- PRODUCT TITLE AREA--> */}
								<div className="proForm__title">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											label: "Title",
											type: "text_input_4",
											comment: `Maximum characters allowed is (80).`,
											inputValue: ""
										}} />

								</div>
								{/* <!-- PRODUCT TITLE AREA--> */}



								{/* <!-- PRODUCT TEXT AREA--> */}
								<div className="proForm__textBox">
									<div className="proForm__textBox__label f_label_1 f_text-capitalize">Body</div>
									<div className="proForm__textBox__input ck--1">
										<CKEditor
											editor={BalloonEditor}
											data={this.state.form.body}
											onChange={this.handleProductBodyChange}
										/>
									</div>
									<div className="comment f_comment_1 f_text-capitalize">Maximum characters allowed is (60000).</div>
								</div>
								{/* <!-- PRODUCT TEXT AREA--> */}



								{/* <!-- PRODUCT SUMMARY AREA--> */}
								<div className="proForm__summaryBox">
									<MultiLineText
										parent={this}
										status={0}
										config={{
											text: "",
											label: "Summary",
											type: "mul_text_input",
											comment: `Maximum characters allowed is (200).`,
											inputValue: ""
										}} />

								</div>
								{/* <!-- PRODUCT SUMMARY AREA--> */}



								<div className="proForm__tagInput">
									<div className="proForm__tagInput__label f_label_1 f_text-capitalize">Tags</div>
									<div className="proForm__tagInput__input" >
										<TagInput />
									</div>
								</div>


								<div className="proForm__buttons">
									<div className="proForm__buttons__button">
										<Button parent={this} status={0} config={{
											label: "Save",
											action: this.productSubmit,
											type: "btn_1",
											text: ""
										}} />
									</div>

									<div className="proForm__buttons__button">
										<Button parent={this} status={0} config={{
											label: "Back",
											action: () => {
												parent.setState({ productOnFocus: 0 });
												parent.setView(1);
											},
											type: "btn_1",
											text: ""
										}} />
									</div>
								</div>


							</form>
						</div>

						<Popup
							component={
								<Repo
									parent={this}
									selectionType={1}
									requiredCount={1}
									userType={3}
								/>}
						/>
					</div>
				</div>
			</div>
		);
	}
}

EditProduct.propTypes = {
	parent: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired,
	productId: PropTypes.number.isRequired,
	product: PropTypes.object.isRequired,
	tags: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		product: state.productReducer.product,
		tags: state.tagReducer.selectedTags
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			product: bindActionCreators(ProductActions, dispatch),
			tag: bindActionCreators(TagActions, dispatch),
			helper: bindActionCreators(HelperActions, dispatch)
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditProduct);
