/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import jsPDF from "jspdf";
import { connect } from "react-redux";
import { bindActionCreators} from "redux";
import PropTypes from "prop-types";

import { NewPasswordInput } from "../../UI/newPasswordInput";
import TextInput from "../../UI/textInput";
import { getCountries } from "../../../abstract/country";
import {REGISTRATION_FORM} from "../../../abstract/variables";
import PlacementInput from "../../placementInput";
import Button from "../../UI/button";
import DateInput from "../../UI/dateInput";
import DropdownInput from "../../UI/dropdownInput";
import * as errorPopupActions from "../../../actions/errorPopupActions";
import * as longrichAccountActions from "../../../actions/longrichAccountActions";

class AccountRegistration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textInputs: [],
			dateInputs: [],
			dropdownInputs: [],
			newPasswordInput: {},
			placements: [],
			buttons: [],
			placement: {},
			view: 1
		};

		this.register = this.register.bind(this);
		this.savetoPDF = this.savetoPDF.bind(this);
		this.setView = this.setView.bind(this);
	}

	setView(view) {
		this.setState({ view });
	}

	savetoPDF() {
		var textInputs = this.state.textInputs;
		var dateInputs = this.state.dateInputs;
		var dropdownInputs = this.state.dropdownInputs;
		var c = this;

		var found = textInputs.concat(dateInputs, dropdownInputs).find((elem) => elem.state.inputValue == "");

		if (found != undefined) {
			c.setView(1);
			found.focus();
			return;
		}

		var doc = new jsPDF();

		if (REGISTRATION_FORM === undefined) {
			this.props.actions.errorPopup.displayErrorMessage(
				"Failed to generate PDF version of form. Try again in a minute."
			);
			return;
		}

		doc.addImage(REGISTRATION_FORM, "JPEG", 0, 0, 210, 297);

		doc.setFontSize(16);
		doc.setTextColor(0, 0, 0);

		var pixelRow = 58;
		var pixelRowAdd = 16;

		var placement = this.state.placement;

		doc.text(115, pixelRow + (pixelRowAdd * 0), textInputs[0].state.inputValue);
		doc.text(115, pixelRow + (pixelRowAdd * 1), textInputs[1].state.inputValue);
		doc.text(115, pixelRow + (pixelRowAdd * 2), textInputs[2].state.inputValue);
		doc.text(115, pixelRow + (pixelRowAdd * 3), dropdownInputs[0].state.inputValue == 0 ? "Male" : "Female");
		doc.text(115, pixelRow + (pixelRowAdd * 4), dateInputs[0].state.inputValue);
		doc.text(115, pixelRow + (pixelRowAdd * 5), textInputs[3].state.inputValue);
		doc.text(115, pixelRow + (pixelRowAdd * 6), textInputs[4].state.inputValue);
		doc.text(115, pixelRow + (pixelRowAdd * 7), textInputs[5].state.inputValue);
		doc.text(115, pixelRow + (pixelRowAdd * 8), textInputs[6].state.inputValue);
		doc.text(115, pixelRow + (pixelRowAdd * 9), textInputs[7].state.inputValue);
		doc.text(115, pixelRow + 6 + (pixelRowAdd * 10), textInputs[8].state.inputValue + " - " + textInputs[9].state.inputValue);
		doc.text(115, pixelRow + 6 + (pixelRowAdd * 11), textInputs[10].state.inputValue + " - " + textInputs[11].state.inputValue);
		doc.text(115, pixelRow + 6 + (pixelRowAdd * 12), placement.name + " " + placement.surname + " " + placement.code);


		doc.save("Longrich-Form.pdf");
	}

	register() {
		var textInputs = this.state.textInputs;
		var dateInputs = this.state.dateInputs;
		var dropdownInput = this.state.dropdownInputs;
		var newPasswordInput = this.state.newPasswordInput;

		textInputs.forEach((elem) => {
			if (elem.state.inputValue == "") {
				elem.focus();
				return;
			}
		});

		dateInputs.forEach((elem) => {
			if (elem.state.inputValue == "") {
				elem.focus();
				return;
			}
		});

		dropdownInput.forEach((elem) => {
			if (elem.state.inputValue == "") {
				elem.focus();
				return;
			}
		});

		if (newPasswordInput.state.inputValue == "") {
			newPasswordInput.focus();
			return;
		}

		this.props.actions.account.createLongrichAccount({
			name: textInputs[0].state.inputValue,
			surname: textInputs[1].state.inputValue,
			email: textInputs[4].state.inputValue,
			phoneNo: textInputs[5].state.inputValue,
			gender: dropdownInput[0].state.inputValue,
			nationality: dropdownInput[1].state.inputValue,
			password: newPasswordInput.state.inputValue,
			placement: this.state.placements[0].id
		});
	}


	render() {
		var view = this.state.view;
		var countries = [];

		var cs = getCountries();

		cs.forEach((n) => {
			countries.push({
				value: n.Code,
				label: n.Name
			});
		});

		return (
			<div className="regView">
				<div className={view == 1 ? "viewh--active" : "viewh--disabled"}>
					<div className="regView__view view--scrollable SB">
						<form method="post" encType="multipart/form-data">

							<div className="reg__form" >

								<h1 className="f_title">Create an account now.</h1>
								<h2 className="f_h2">Fill in the form below to register, then download the pdf version offered after completion.</h2>

								<p className="f_normal">
									Please note:<br/><br />
									The account, sponsor and Beneficiary details provided in this form shall not be saved.
									They are only to facilitate the generation of the longrich application form for your convenience.
								</p>
								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Name",
											type: "text_input_4",
											length: 80,
											placeholder: "Firstname Middle Names",
											comment: "Maximum characters allowed is (80)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Surname",
											type: "text_input_4",
											length: 80,
											placeholder: "Surname",
											comment: "Maximum characters allowed is (80)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "ID",
											type: "text_input_4",
											length: 80,
											placeholder: "National ID /Passport",
											comment: "Maximum characters allowed is (80)."
										}} />
								</div>

								<div className="reg__dd">
									<DropdownInput
										parent={this}
										status={0}
										config={{
											label: "Gender",
											floatingLabel: true,
											class: "dropdown_2",
											placeholder: "-- Select Gender -- ",
											options: [
												{
													value: 0,
													label: "Male"
												},
												{
													value: 1,
													label: "Female"
												},
											]
										}}
									/>
								</div>

								<div className="reg__dd">
									<DropdownInput
										parent={this}
										status={0}
										config={{
											floatingLabel: true,
											label: "Nationality",
											class: "dropdown_2",
											placeholder: "-- Select Nationality -- ",
											options: countries
										}}
									/>
								</div>

								<div className="reg__date">
									<DateInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Date of Birth",
											class: "text_input_4"
										}}
									/>
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Address",
											type: "text_input_4",
											placeholder: "Postal Address",
											length: 120,
											comment: "Maximum characters allowed is (120)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Email Address",
											type: "text_input_4",
											placeholder: "Email Address",
											length: 60,
											comment: "Maximum characters allowed is (60)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Phone number",
											type: "text_input_4",
											placeholder: "Mobile number",
											length: 60,
											comment: "Maximum characters allowed is (60)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Bank Name",
											type: "text_input_4",
											placeholder: "Bank name",
											length: 60,
											comment: "Maximum characters allowed is (60)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Bank Account Name",
											type: "text_input_4",
											placeholder: "Name",
											length: 60,
											comment: "Maximum characters allowed is (60)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Bank Account Number",
											type: "text_input_4",
											placeholder: "Number",
											length: 60,
											comment: "Maximum characters allowed is (60)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Bank Account Branch",
											type: "text_input_4",
											placeholder: "Branch",
											length: 60,
											comment: "Maximum characters allowed is (60)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Beneficiary Name",
											type: "text_input_4",
											placeholder: "Full Name",
											length: 60,
											comment: "Maximum characters allowed is (60)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Beneficiary Number",
											type: "text_input_4",
											placeholder: "Mobile number",
											length: 60,
											comment: "Maximum characters allowed is (60)."
										}} />
								</div>


								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Sponsor Name",
											type: "text_input_4",
											placeholder: "Full Name",
											length: 60,
											comment: "Maximum characters allowed is (60)."
										}} />
								</div>

								<div className="reg__text">
									<TextInput
										parent={this}
										status={0}
										config={{
											text: "",
											floatingLabel: true,
											label: "Sponsor Number",
											type: "text_input_4",
											placeholder: "Mobile number",
											length: 60,
											comment: "Maximum characters allowed is (60)."
										}} />
								</div>

								<div className="reg__placement">
									<div className="reg__placement__label f_h1">Recruited by: </div>
									<div className="reg__placement__input" >
										<PlacementInput main={this.props.parent} parent={this} limit={1} />
									</div>
									<div className="reg__placement__comment f_normal">Select a longrich agent to register under.<br />The system shall use this agent to retrieve a placement under him/her.</div>
								</div>

								<div className="reg__password">
									<NewPasswordInput
										parent={this}
										regex={/^((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$.#]).{8,16})$/}
										config={{
											placeholder: "At least 1 of each (A-Z),(a-z),(1-9),(@$.#). 8-16 characters."
										}}
									/>
								</div>


								<div className="reg__save">
									<Button parent={this} status={0} config={{
										label: "Register",
										action: this.savetoPDF,
										type: "btn_1",
										text: ""
									}} />
								</div>

							</div>
						</form>

					</div>

				</div>



				<div className={view == 2 ? "viewh--active" : "viewh--disabled"}>
					<div className="reg__completed">
						<h1 className="f_h1">{"You've successfully registered!"}</h1>
						<h2 className="f_h2">
                            Please download a copy of your pdf form to register at the nearest Longrich Office.
						</h2>
						<div className="reg__completed__buttons">
							<div className="reg__completed__button">
								<Button parent={this} status={0} config={{
									label: "Form",
									action: this.savetoPDF,
									type: "btn_1",
									text: ""
								}} />
							</div>

							<div className="reg__completed__button">
								<Button parent={this} status={0} config={{
									label: "Home",
									action: () => {
										window.location.href = "/";
									},
									type: "btn_1",
									text: ""
								}} />
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

AccountRegistration.propTypes = {
	parent: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			errorPopup: bindActionCreators(errorPopupActions, dispatch),
			account: bindActionCreators(longrichAccountActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountRegistration);