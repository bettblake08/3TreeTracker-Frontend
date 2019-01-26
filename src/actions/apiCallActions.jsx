import * as types from "./actionTypes";

export function reloadAPICall(request, max = 3) {
	return (dispatch, getState) => {
		const attempts = getState.apiCallReducer[request.name].attempts;

		if(attempts < max){
			dispatch(setAPICount(request.name, max));
			dispatch(request());
		}
		else {
			dispatch(resetAPICount(request.name));
		}
		
	};
}

export function setAPICount(request, max = 3){
	return (dispatch) =>{
		return dispatch({types: types.RELOAD_API_CALL, request, max});
	};
}

export function resetAPICount(request) {
	return (dispatch) => {
		return dispatch({ type: types.RESET_API_COUNT, request});
	};
}