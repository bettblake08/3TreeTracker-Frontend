import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	let newState = objectAssign({}, state);

	switch (action.type) {
	case types.DISPLAY_ERROR_MESSAGE: {
		if (newState.errorPopup == undefined) {
			newState.errorPopup = {errors: []};
		}
		let errorPopup = objectAssign({}, newState.errorPopup);
		errorPopup.errors.push(action.message);
        
		return { ...newState, errorPopup };
	}
	default: {
		return state;
	}
	}
};