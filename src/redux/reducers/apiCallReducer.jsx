import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	let apiCall = objectAssign({}, state.apiCall);

	switch (action.type) {
	case types.RELOAD_API_CALL: {
		if (apiCall[action.request] == undefined){
			apiCall[action.request] = {
				max: action.max,
				attempts: 0
			};
		}
        
		apiCall[action.request].attempts += 1;
		return {...state, apiCall};
	}
	case types.RESET_API_COUNT: {
		if(apiCall[action.request] === undefined)	return state;
		apiCall[action.request].attempts = 0;
		return {...state, apiCall};
	}
	default: {
		return state;
	}
	}
};