import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	let newState = {};

	switch (action.type) {
	case types.RELOAD_API_CALL: {
		newState = objectAssign({}, state);

		if(newState.apiCall == undefined){
			newState.apiCall =  {};
		}
        
		if (newState.apiCall[action.request] == undefined){
			newState.apiCall[action.request] = {
				max: action.max,
				attempts: 0
			};
		}
        
		newState.apiCall[action.request].attempts += 1;
		return newState;
	}
	case types.RESET_API_COUNT: {
		newState = objectAssign({}, state);

		if(newState.apiCall != undefined || newState.apiCall[action.request] != undefined){
			newState.apiCall[action.request].attempts = 0;
		}

		return newState;
	}
	default: {
		return state;
	}
	}
};