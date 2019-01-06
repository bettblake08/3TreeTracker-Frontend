import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import CKEditor from "@ckeditor/ckeditor5-react";

import Button from "../../UI/button";
import ErrorPopup from "../../UI/errorPopup";
import Repo from "../../common/repo/index";
import { DEFAULT_PRODUCT_COVER_PIC } from "../../../abstract/variables";
import Popup from "../../UI/popup";
import TagInput from "../../UI/tagInput";
import TextInput from "../../UI/textInput";
import MultiLineText from "../../UI/MultiLineTextInput";
import * as ProductActions from "../../../actions/productActions";


class AddProduct extends Component {
	constructor(props) {
		super(props);

		this.productSubmit = this.productSubmit.bind(this);
		this.loadRepo = this.loadRepo.bind(this);
		this.toggleRepo = this.toggleRepo.bind(this);
		this.onProductBodyChange = this.onProductBodyChange.bind(this);

		this.state = {
			toggleRepo: false,
			loaded: false,
			popups: [],
			errorPopup: {},
			tags: [],
			textInputs: [],
			buttons: [],
			editor: {},
			form: {
				body: "<p>Start editing now!</p>",
			}
		};

	}

	componentDidMount() {
		this.setState({loaded: true});
	}

	onProductBodyChange(event, editor) {
		var state = this.state;
		state.form.body = editor.getData().substr(0, 60000);
		this.setState(state);
	}

	productSubmit() {
		var imageFile = document.querySelector("#img_select__img").dataset.image;       //Check if image has been selected

		if (imageFile == undefined || imageFile.length == 0) {
			this.toggleRepo();
			return;
		}
		else {
			imageFile = JSON.parse(imageFile);
		}

		var textInputs = this.state.textInputs;
		var form =  this.state.form;

		textInputs.forEach((elem) => {
			if (elem.state.inputValue == "") {
				elem.focus();
			}
		});

		if (form.body == "") {
			document.querySelector("#pro__text").focus();
			return;
		}

		var tags = [];

		this.state.tags.forEach((elem) => {
			tags.push(elem.id);
		});
        
		this.props.actions.product(
			{
				pro__image: imageFile.id,
				pro__title: textInputs[0].state.inputValue,
				pro__body: form.body,
				pro__summary: textInputs[1].state.inputValue,
				pro__tags: tags
			}
		);

	}

	toggleRepo() {
		this.state.popups[0].toggleContent();
	}

	loadRepo() {
		if (this.state.loaded == true) {
			return (<Popup component={<Repo parent={this} sType={1} rCount={1} userType={3} />} parent={this} />);
		}
	}

	render() {
		var c = this;
		var placeholder = {
			backgroundImage: `url('${DEFAULT_PRODUCT_COVER_PIC}')`,
			backgroundPosition: "center",
			backgroundSize: "cover"
		};

		BalloonEditor.defaultConfig.toolbar.items = [
			"heading",
			"|",
			"bold",
			"italic",
			"link",
			"bulletedList",
			"numberedList",
			"imageUpload",
			"blockQuote",
			"undo",
			"redo"
		];

		return (
			<div className="view--scrollable SB">
				<div id="content--full">
					<ErrorPopup parent={this} />

					<div className="base">
						<form method="post" encType="multipart/form-data" style={{ margin: 0, padding: 0 }}>
							{/* <!-- IMAGE SELECT AREA--> */}

							<div id="pro__image">
								<div id="img_select">
									<div id="img_select__img" className="repoImagePreview" style={placeholder}>
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

							<div id="pro__form" >
								{/* <!-- PRODUCT TITLE AREA--> */}
								<div id="pro__title">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Title",
											type: "text_input_4",
											placeholder: "Title",
											length: 80,
											comment: "Maximum characters allowed is (80)."
										}} />
								</div>
								{/* <!-- PRODUCT TITLE AREA--> */}

								{/* <!-- PRODUCT TEXT AREA--> */}
								<div id="pro__textBox">
									<div id="pro__textBox__label" className="f_h1 f_text-capitalize">Body Text</div>
									<div id="pro__textBox__input ck--1">
										<CKEditor
											editor={BalloonEditor}
											data={this.state.form.body}
											onChange={this.onProductBodyChange}
										/>
									</div>

									<div className="comment f_comment_1 f_text-capitalize">Maximum characters allowed is (60000). Currently, its ( {this.state.form.body.length} ) </div>

								</div>
								{/* <!-- PRODUCT TEXT AREA--> */}

								{/* <!-- PRODUCT SUMMARY AREA--> */}
								<div id="pro__summaryBox">
									<MultiLineText
										parent={this}
										status={0}
										config={{
											text: "",
											label: "Summary",
											type: "mul_text_input",
											comment: "Maximum characters allowed is (200)."
										}} />

								</div>
								{/* <!-- PRODUCT SUMMARY AREA--> */}


								<div id="pro__summaryBox">
									<div id="pro__summaryBox__label" className="f_h1 f_text-capitalize">Tags</div>
									<div id="pro__summaryBox__input" >
										<TagInput main={this} parent={this} />
									</div>
								</div>

								<div id="pro__save">
									<Button parent={this} status={0} config={{
										label: "Save",
										action: this.productSubmit,
										type: "btn_1",
										text: ""
									}} />
								</div>

								<div id="pro__return">
									<Button parent={this} status={0} config={{
										label: "Back",
										action: () => {
											c.props.parent.setView(1);
										},
										type: "btn_1",
										text: ""
									}} />
								</div>

							</div>
						</form>
					</div>


					{this.loadRepo()}
				</div>

			</div>
		);
	}
}


AddProduct.propTypes = {
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
)(AddProduct);
