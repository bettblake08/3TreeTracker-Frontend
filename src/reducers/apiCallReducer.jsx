import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	let newState = objectAssign({}, state);

	if (newState.apiCall == undefined) {
		newState.apiCall = {};
	}

	let apiCall = objectAssign({}, newState);

	switch (action.type) {
	case types.RELOAD_API_CALL: {
		if (apiCall[action.request] == undefined){
			apiCall[action.request] = {
				max: action.max,
				attempts: 0
			};
		}
        
		apiCall[action.request].attempts += 1;
		return newState;
	}
	case types.RESET_API_COUNT: {
		if(apiCall != undefined || apiCall[action.request] != undefined){
			apiCall[action.request].attempts = 0;
		}

		return newState;
	}
	default: {
		return state;
	}
	}
};