import {history} from "../store/configureStore";
import {adminLogoutSuccess} from "./AuthenticationActions";
import {getLoggedInUser, setLoggedInUser } from "../helper/auth";
import AuthenticationAPI from "../api/authenticationAPI";

export const checkIfUnauthorized = (response, dispatch, onRefresh = () => {} ) => {
	if (response.error.status === 401) {
		let user = getLoggedInUser();
		user.userType === "" ? forceLogOut(dispatch) : refreshToken(user, dispatch, onRefresh);
		return true;
	}

	return false;
};

function refreshToken(user, dispatch, onRefresh) {
	AuthenticationAPI.refreshToken().then((response) => {
		if (response.success){
			user.accessToken = response.accessToken;
			setLoggedInUser(user);
			onRefresh();
		}
		else {
			forceLogOut(dispatch);
		}
	});
}

function forceLogOut(dispatch){
	dispatch(adminLogoutSuccess());
	history.replace("/admin/login");
}