import * as types from "./actionTypes";
import * as apiCall from "./apiCallActions";
import * as errorPopup from "./errorPopupActions";
import longrichAccountAPI from "../api/longrichAccountAPI";
import {checkIfUnauthorized} from "./helpers";

export function createLongrichAccountSuccess(data) {
	return (dispatch) => {
		return dispatch({ type: types.CREATE_LONGRICH_ACCCOUNT_SUCCESS, data });
	};
}

export function createLongrichAccountError(data) {
	return (dispatch) => {
		return dispatch({ type: types.CREATE_LONGRICH_ACCCOUNT_ERROR, data });
	};
}

export function createLongrichAccount(account) {
	return (dispatch) => {
		return longrichAccountAPI.createAccount(account).then((response) => {
			if (response.error == undefined) {
				dispatch(createLongrichAccountSuccess(response));
			}
			else {
				dispatch(createLongrichAccountError(response));
			}
		});
	};
}

export function getLongrichAccountsSuccess(data) {
	return (dispatch) => {
		return dispatch({ type: types.GET_LONGRICH_ACCOUNTS_SUCCESS, data });
	};
}

export function getLongrichAccountsAsAdmin(filter, offset) {
	const mainFunction = this;
	
	return (dispatch) => {

		return longrichAccountAPI.getAccounts(filter, offset, true).then((response) => {
			if (response.success) {
				dispatch(getLongrichAccountsSuccess(response));
			}
			else {
				checkIfUnauthorized(response, dispatch);
				
				if(response.error.status !== 200){
					dispatch(apiCall.reloadAPICall(mainFunction, 5));
					return;
				}
				
				dispatch(errorPopup.displayErrorMessage(response.error.message));
			}
		});
	};
}
