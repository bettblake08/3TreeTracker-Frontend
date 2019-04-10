import React, { Component } from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "react-loaders";

import { getCountries } from "../../abstract/country";
import Button from "../UI/button";
import Popup from "../UI/popup";
import TextInput from "../UI/textInput";
import DropdownInput from "../UI/dropdownInput";
import EditAccountPopup from "./accountsPage/editAccountPopup";
import Account from "./accountsPage/account";

import * as LongrichAccountsActions from "../../redux/actions/longrichAccountActions";

import "../../assets/styles/scss/pages/admin/accounts.scss";

class AccountsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filterSearch:{
				name: "",
				country: "",
			},
			buttons:[],
			textInputs:[],
			dropdownInputs:[],
			loaded:false,
			editAccountPopup:{}
		};

		this.getAccounts = this.getAccounts.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.onFilter = this.onFilter.bind(this);
	}

	componentDidMount(){
		this.setState({loaded: true});
		this.getAccounts();
	}

	getAccounts(reset = false) {
		var c = this;
		var state = c.state;

		this.props.actions.longrichAccount.getLongrichAccounts(
			state.filterSearch,
			reset,
			true
		);
	}

	loadMore(){
		this.getAccounts();
	}

	onFilter(){
		var state = this.state;
	
		state.filterSearch.name = state.textInputs[0].state.inputValue;
		state.filterSearch.country = state.dropdownInputs[0].state.inputValue;

		this.setState(state);
		this.getAccounts(true);
	}

	render() {
		var countries = [];

		getCountries().forEach((n) => {
			countries.push({
				value: n.Code,
				label: n.Name
			});
		});

		const { longrichAccounts } = this.props;

		return (
			<div className="admin section__1 SB adminAccountsPage" >

				<div className="admin content">
					<Popup component={<EditAccountPopup />}/>

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
									action: this.onFilter
								}} />
						</div>

					</div>
					
					<div className="accounts__view" ref={(ref => this.scrollParentRef = ref )}>
					
						<InfiniteScroll
							pageStart={0}
							loadMore={this.loadMore}
							hasMore={longrichAccounts.hasMore}
							useWindow={false}
							getScrollParent={() => this.scrollParentRef}
							loader={(<Loader type="line-scale" key={0} />)}
						>

							{
								longrichAccounts.accounts.map((item, i) => {
									return <Account account={item.account} key={i} parent={this} />;
								})
							}

						</InfiniteScroll>

					</div>
					

					<div className="accounts__loadBtn">
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
			longrichAccount: bindActionCreators(LongrichAccountsActions, dispatch),
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsView);
