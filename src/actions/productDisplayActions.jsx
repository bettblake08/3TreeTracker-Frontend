import * as types from "./actionTypes";

export function setView(view) {
	return (dispatch) => {
		return dispatch({ type: types.SET_PRODUCT_DISPLAY_VIEW, view });
	};
}