import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

import { getCountries } from "../../abstract/country";
import Button from "../UI/button";
import Popup from "../UI/popup";
import TextInput from "../UI/textInput";
import DropdownInput from "../UI/dropdownInput";
import EditAccountPopup from "./accountsPage/editAccountPopup";
import Account from "./accountsPage/account";

import * as LongrichAccountsActions from "../../actions/longrichAccountActions";

import "../../assets/styles/scss/pages/admin/accounts.scss";

class AccountsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filterSearch:{
				name:"0",
				country:"0",
			},
			popups:[],
			buttons:[],
			textInputs:[],
			dropdownInputs:[],
			loaded:false,
			editAccountPopup:{}
		};

		this.getAccounts = this.getAccounts.bind(this);
		this.toggleEditAccountPopup = this.toggleEditAccountPopup.bind(this);
		this.loadEditAccountPopup = this.loadEditAccountPopup.bind(this);
	}

	componentDidMount(){
		this.setState({laoded: true});
		this.getAccounts();
	}

	getAccounts(reset = false) {
		var c = this;
		var state = c.state;
		const {longrichAccounts} = this.props;

		if(reset){
			state.offset = 0;
			state.content = [];
		}
		
		this.props.actions.longrichAccount.getLongrichAccountsAsAdmin(
			state.filterSearch,
			longrichAccounts.offset
		);
	}

	toggleEditAccountPopup() {
		this.state.popups[0].toggleContent();
	}

	loadEditAccountPopup() {
		if (this.state.loaded) {
			return (<Popup component={<EditAccountPopup parent={this} />} parent={this} />);
		}
	}

	render() {
		var main = this;
		var countries = [];

		getCountries().forEach((n) => {
			countries.push({
				value: n.Code,
				label: n.Name
			});
		});

		return (
			<div className="admin section__1 SB" >

				<div className="admin content">
					{this.loadEditAccountPopup()}

					<div className="topBar">
						<div className="topBar__title f_h1">Accounts</div>
						<div className="topBar__searchBar">
							<TextInput
								parent={this}
								status={0}
								config={{
									text: "",
									floatingLabel: true,
									label: "Name",
									type: "text_input_4",
									placeholder: "Firstname / Surname",
									length: 30
								}} />
						</div>

						<div className="topBar__searchBar">
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

						<div className="topBar__searchBtn">
							<Button
								parent={this}
								status={0}
								config={{
									type: "btn_1",
									label: "Filter",
									text: "",
									action: () => {
										var state = main.state;
										var n = state.textInputs[0].state.inputValue;
										var c = state.dropdownInputs[0].state.inputValue;
										state.filterSearch.name = n != "" ? n : "0";
										state.filterSearch.country = c != "" ? c : "0";
										c.setState(state);
										c.getAccounts(true);
									}
								}} />
						</div>

					</div>

					<div className="content__view">
						{
							this.props.longrichAccounts.accounts.map((item, i) => {
								return <Account account={item.account} key={i} parent={this} />;
							})
						}
					</div>

					<div className="loadBtn">
						<Button
							parent={this}
							status={0}
							config={{
								type: "btn_1",
								label: "More",
								text: "",
								action: this.getAccounts
							}} />
					</div>
				</div>

			</div>

		);
	}
}

AccountsView.propTypes = {
	longrichAccounts: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
		longrichAccounts: state.longrichAccountsReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			longrichAccount: bindActionCreators(LongrichAccountsActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsView);