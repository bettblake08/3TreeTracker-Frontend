import * as types from "./actionTypes";

export function reloadAPICall(request, max = 3) {
	return (dispatch) => {
		return dispatch({ type: types.RELOAD_API_CALL, request, max});
	};
}

export function resetAPICount(request) {
	return (dispatch) => {
		return dispatch({ type: types.RESET_API_COUNT, request});
	};
}