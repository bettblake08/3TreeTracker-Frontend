import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import CKEditor from "@ckeditor/ckeditor5-react";

import * as ProductActions from "../../../actions/productActions";
import Button from "../../UI/button";
import Repo from "../../common/repo";
import Popup from "../../UI/popup";
import TagInput from "../../UI/tagInput";
import TextInput from "../../UI/textInput";
import MultiLineText from "../../UI/MultiLineTextInput";

class Edit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			toggleRepo: false,
			textInputs: [],
			buttons: [],
			data: {
				currency: [],
				duration: []
			},
			form: {
				title: {
					value: "",
					error: ""
				},
				summary: {
					value: "",
					error: ""
				},
				body: ""
			},
			updated: false,
			loaded: false,
			popups: [],
			tags: []
		};

		this.setProductData = this.setProductData.bind(this);
		this.handleProductBodyChange = this.handleProductBodyChange.bind(this);
		this.toggleRepo = this.toggleRepo.bind(this);
		this.loadRepo = this.loadRepo.bind(this);
		this.productSubmit = this.productSubmit.bind(this);
	}

	componentDidMount() {
		this.setState({loaded: true});
		this.setProductData();
	}

	componentDidUpdate() {
		if (this.props.parent.state.updated != this.state.updated) {
			this.setProductData();
		}
	}

	setProductData() {
		var state = this.state;
		var product = this.props.parent.state.product.post;

		if (product != null) {
			state.id = product.id,
			state.textInputs[0].state.inputValue = product.title;
			state.textInputs[1].state.inputValue = product.summary;
			state.form.body = product.body;
			state.tags = product.tags;
			state.updated = this.props.parent.state.updated;

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
			if (elem.state.inputValue == "") {
				elem.focus();
			}
		});

		if (this.state.form.body == "") {
			document.querySelector(".form__textBox").focus();
			return;
		}

		var tags = [];

		this.state.tags.forEach((elem) => {
			tags.push(elem.id);
		});

		this.props.actions.product(
			{
				pro__id: this.state.id,
				pro__image: imageFile.id,
				pro__title: textInputs[0].state.inputValue,
				pro__body: this.state.form.body,
				pro__summary: textInputs[2].state.inputValue,
				pro__tags: JSON.stringify(tags)
			}
		);
	}

	toggleRepo() {
		this.state.popups[0].toggleContent();
	}

	loadRepo() {
		if (this.state.loaded) {
			return (<Popup 
				component={
					<Repo 
						parent={this} 
						sType={1} 
						rCount={1} 
						userType={3} 
					/>} 
				parent={this} />);
		}
	}

	render() {
		var parent = this.props.parent.props.parent;

		return (
			<div id="editProduct" className="admin content">
				<div className={this.state.toggleRepo ? "base--disabled" : "base"}>
					<form method="post" encType="multipart/form-data">
						{/* <!-- IMAGE SELECT AREA--> */}

						<div className="form__image">
							<div id="img_select">
								<div id="img_select__img" className="repoImagePreview">
									<input type="hidden" id="art_selected_image" name="image" />
								</div>

								<div id="img_select__buttons">
									<div className="btnIcon_1" onClick={() => { this.toggleRepo(); }}>
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

						<div className="form__box">


							{/* <!-- PRODUCT TITLE AREA--> */}
							<div className="form__title">
								<TextInput
									parent={this}
									status={0}
									config={{
										text: "",
										label: "Title",
										type: "text_input_4",
										comment: `Maximum characters allowed is (80). Currently, its ( ${this.state.form.title.value.length} )`,
										inputValue: ""
									}} />

							</div>
							{/* <!-- PRODUCT TITLE AREA--> */}



							{/* <!-- PRODUCT TEXT AREA--> */}
							<div className="form__textBox">
								<div className="form__textBox__label f_label_1 f_text-capitalize">Body</div>
								<div className="form__textBox__input ck--1">
									<CKEditor
										editor={BalloonEditor}
										data={this.state.form.body}
										onChange={this.handleProductBodyChange}
									/>
								</div>
								<div className="comment f_comment_1 f_text-capitalize">Maximum characters allowed is (60000). Currently, its ( {this.state.form.body.length} )</div>
							</div>
							{/* <!-- PRODUCT TEXT AREA--> */}



							{/* <!-- PRODUCT SUMMARY AREA--> */}
							<div className="form__summaryBox">
								<MultiLineText
									parent={this}
									status={0}
									config={{
										text: "",
										label: "Summary",
										type: "mul_text_input",
										comment: `Maximum characters allowed is (200). Currently, its ( ${this.state.form.summary.value.length} )`,
										inputValue: this.state.form.summary.value
									}} />

							</div>
							{/* <!-- PRODUCT SUMMARY AREA--> */}



							<div className="form__tagInput">
								<div className="form__tagInput__label f_label_1 f_text-capitalize">Tags</div>
								<div className="form__tagInput__input" >
									<TagInput main={this.state.parent} parent={this} />
								</div>
							</div>


							<div className="form__buttons">
								<div className="form__buttons__button">
									<Button parent={this} status={0} config={{
										label: "Save",
										action: this.productSubmit,
										type: "btn_1",
										text: ""
									}} />
								</div>

								<div className="form__buttons__button">
									<Button parent={this} status={0} config={{
										label: "Back",
										action: () => {
											parent.setView(1);
										},
										type: "btn_1",
										text: ""
									}} />
								</div>
							</div>


						</div>
					</form>
				</div>

				{this.loadRepo()}
			</div>
		);
	}
}

Edit.propTypes = {
	parent: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
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
)(Edit);