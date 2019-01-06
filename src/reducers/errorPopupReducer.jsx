import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	switch (action.type) {
	case types.DISPLAY_ERROR_MESSAGE: {
		let errorPopup = objectAssign({}, state.errorPopup);
		errorPopup.errors.push(action.message);
        
		return { ...state, errorPopup };
	}
	default: {
		return state;
	}
	}
};