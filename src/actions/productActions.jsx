import * as types from "./actionTypes";
import ProductAPI from "../api/productAPI";
import * as errorPopup from "./errorPopupActions";
import * as apiCall from "./apiCallActions";

export function getProductsSuccess(data){
	return (dispatch) => {
		return dispatch({ type: types.GET_PRODUCTS_SUCCESS, data });
	};
}

export function getProducts(reset = false, offset = 0){
	return (dispatch) => {
		return ProductAPI.getProductsbyOffset(reset, offset).then((response) => {
			if(response.error == undefined){
				dispatch(getProductsSuccess(response));
			}
			else {
				dispatch(errorPopup.displayErrorMessage(response.message));
			}
		});
	};
}

export function getProductSuccess(data) {
	return (dispatch) => {
		return dispatch({ type: types.GET_PRODUCT_SUCCESS, data});
	};
}

export function getProduct(productId) {
	return (dispatch) => {
		return ProductAPI.getProduct(productId).then((response) => {
			if (response.error == undefined) {
				dispatch(getProductSuccess(response));
			}
			else {
				dispatch(apiCall.reloadAPICall("getProduct", 5));
			}
		});
	};
}