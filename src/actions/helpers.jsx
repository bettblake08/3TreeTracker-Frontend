import {history} from "../store/configureStore";
import {adminLogoutSuccess} from "./authenticationActions";
import {getLoggedInUser, setLoggedInUser } from "../helper/auth";
import AuthenticationAPI from "../api/authenticationAPI";
import { store } from "../index";
import * as types from "./actionTypes";

export const checkIfUnauthorized = (response, onRefresh = () => {} ) => {
	if (response.error.status === 401) {
		let user = getLoggedInUser();
		user.userType === "" ? forceLogOut() : refreshToken(user, dispatch, onRefresh);
		return true;
	}

	return false;
};

export function refreshToken(user, onRefresh) {
	return AuthenticationAPI.refreshToken().then((response) => {
		if (response.success){
			user.user.accessToken = response.accessToken;
			setLoggedInUser(user);
			return onRefresh();
		}
		else {
			return forceLogOut();
		}
	});
}

export function forceLogOut(){
	store.dispatch(adminLogoutSuccess());
	history.replace("/admin/login");
}


export function togglePopup(popup) {
	return (dispatch) => {
		return dispatch({ type: types.TOGGLE_POPUP, popup });
	}
}
