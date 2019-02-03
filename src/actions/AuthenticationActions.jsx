import * as types from "./actionTypes";
import AuthenticationAPI from "../api/authenticationAPI";
import {history} from "../store/configureStore";
import {checkIfUnauthorized} from "./helpers";

export function adminLoginSuccess(data){
	return {type: types.ADMIN_LOGIN_SUCCESS, data};
}

export function adminLogin(loginDetails, onSuccess = () => {}, onFailure = () => {}) {
	return (dispatch) => {
		return AuthenticationAPI
			.login(loginDetails)
			.then((response) => {
			if (response.success) {
				onSuccess();
				dispatch(adminLoginSuccess(response));
				history.push("products");
			}
			else {
				onFailure(response);
			}
		});
	};
}

export function adminLogoutSuccess(data) {
	return { type: types.ADMIN_LOGOUT_SUCCESS, data };
}

export function adminLogout(onSuccess = () => { }, onFailure = () => { }) {
	return (dispatch) => {
		return AuthenticationAPI.logout().then((response) => {
			if (response.success) {
				onSuccess();
				dispatch(adminLogoutSuccess());
				history.push("login");
			}
			else {
				if (checkIfUnauthorized(response, dispatch)) return;				
				onFailure(response);
			}
		});
	};
}