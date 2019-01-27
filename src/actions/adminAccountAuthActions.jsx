import * as types from "./actionTypes";
import AdminAccountAuthAPI from "../api/adminAccountAuthAPI";
import {history} from "../store/configureStore";
import {checkIfUnauthorized} from "./helpers";

export function adminLoginSuccess(data){
	return {type: types.ADMIN_LOGIN_SUCCESS, data};
}

export function adminLogin(loginDetails, onSuccess = () => {}, onFailure = () => {}) {
	return (dispatch) => {
		return AdminAccountAuthAPI.login(loginDetails).then((response) => {
			if (response.error == undefined) {
				onSuccess();
				dispatch(adminLoginSuccess(response));
				//history.push("products");
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
		return AdminAccountAuthAPI.logout().then((response) => {
			if (response.success) {
				onSuccess();
				dispatch(adminLogoutSuccess());
				history.replace("login");
			}
			else {
				if (checkIfUnauthorized(response, dispatch)) return;				
				onFailure(response);
			}
		});
	};
}