import * as types from "./actionTypes";
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