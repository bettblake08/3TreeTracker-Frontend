import * as types from "./actionTypes";
import CommentAPi from "../api/commentAPI";
import * as errorPopup from "./errorPopupActions";

export function getProductsSuccess(data) {
	return (dispatch) => {
		return dispatch({ type: types.GET_PRODUCTS_SUCCESS, data });
	};
}

export function postComment(comment, onSuccess = ()=>{}, onFailure = ()=>{}) {
	return (dispatch) => {
		return CommentAPi.postComment(comment,onSuccess, onFailure).then((response) => {
			if (response.error == undefined) {
				dispatch(getProductsSuccess(response));
			}
			else {
				dispatch(errorPopup.displayErrorMessage(response.error.message));
			}
		});
	};
}