import * as types from "./actionTypes";
import {WEB_URL} from "../abstract/variables";
import AdminAccountAuthAPI from "../api/adminAccountAuthAPI";

export function adminLoginSuccess(data){
	return {type: types.ADMIN_LOGIN_SUCCESS, data};
}

export function adminLogin(loginDetails, onSuccess = () => {}, onFailure = () => {}) {
	return (dispatch) => {
		return AdminAccountAuthAPI.login(loginDetails).then((response) => {
			if (response.error == undefined) {
				onSuccess();
				dispatch(adminLoginSuccess(response));
				window.location.href = `${WEB_URL}admin/products`;
			}
			else {
				onFailure(response);
			}
		});
	};
}