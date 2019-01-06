import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";
import {setLoggedInUser, logoutUser} from "../helper/auth";

export default (state = [], action) => {
	switch (action.type) {
	case types.ADMIN_LOGIN_SUCCESS: {
		let auth = objectAssign({}, state.auth);
		auth.userType = action.data.userType;
		auth.user = action.data.user;
		setLoggedInUser(action.data);
		return { ...state, auth };
	}
	case types.ADMIN_LOGOUT_SUCCESS: {
		let auth = objectAssign({}, state.auth);
		auth.userType = "";
		auth.user = {};
		logoutUser();
		return { ...state, auth };
	}
	default: {
		return state;
	}
	}
};