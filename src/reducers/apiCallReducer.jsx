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
		return state;
	}
	case types.RESET_API_COUNT: {
		if(apiCall != undefined || apiCall[action.request] != undefined){
			apiCall[action.request].attempts = 0;
		}

		return state;
	}
	default: {
		return state;
	}
	}
};