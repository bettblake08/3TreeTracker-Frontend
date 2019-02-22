import * as types from "./actionTypes";
import * as apiCall from "./apiCallActions";
import * as errorPopup from "./errorPopupActions";
import longrichAccountAPI from "../api/longrichAccountAPI";

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

export function createLongrichAccount(account, onSuccess = () => {}) {
	return (dispatch) => {
		return longrichAccountAPI.createAccount(account).then((response) => {
			if (response.success) {
				dispatch(createLongrichAccountSuccess(response));
				onSuccess();
			}
			else {
				dispatch(errorPopup.displayErrorMessage("Access to server failed!"));
			}
		});
	};
}

export function getLongrichAccountsSuccess(data) {
	return { type: types.GET_LONGRICH_ACCOUNTS_SUCCESS, data }
}


export function getLongrichAccounts(filter, reset = false , admin = false) {
	const mainFunction = this;
	
	return (dispatch, getState) => {
		let { offset } = getState().longrichAccountsReducer; 

		if(reset) offset = 0;

		return longrichAccountAPI.getAccounts(filter, offset, true, admin).then((response) => {
			if (response.success) {
				dispatch(getLongrichAccountsSuccess({ ...response, reset }));
			}
			else {
				if(response.error.status !== 200){
					dispatch(apiCall.reloadAPICall(mainFunction, 5));
					return;
				}
				
				dispatch(errorPopup.displayErrorMessage(response.error.message));
			}
		});
	};
}

export function setAccountInFocus(account) {
	return (dispatch) => {
		return dispatch({ type: types.SET_LONGRICH_ACCOUNT_IN_FOCUS, data: account });
	};
}
