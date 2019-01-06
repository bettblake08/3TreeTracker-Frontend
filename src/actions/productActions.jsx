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
				dispatch(errorPopup.displayErrorMessage(response.error.message));
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

export function getProductAsAdmin(productId, onSuccess = () => {}) {
	return (dispatch) => {
		return ProductAPI.getProductAsAdmin(productId).then((response) => {
			if (response.error == undefined) {
				onSuccess(response);
			}
			else {
				dispatch(apiCall.reloadAPICall("getProductAsAdmin", 5));
			}
		});
	};
}

export function getProductsAsAdmin(reset = false, offset = 0, onSuccess = () => { }) {
	return (dispatch) => {
		return ProductAPI.getProductsbyOffset(reset, offset, true).then((response) => {
			if (response.error == undefined) {
				onSuccess(response);
				dispatch(getProductsSuccess(response));
			}
			else {
				dispatch(apiCall.reloadAPICall("getProductsAsAdmin", 5));
			}
		});
	};
}

export function postProduct(product, onSuccess = () => { }) {
	return (dispatch) => {
		return ProductAPI.postProduct(product).then((response) => {
			if (response.error == undefined) {
				onSuccess(response);
			}
			else {
				dispatch(errorPopup.displayErrorMessage(response.error.message));
			}
		});
	};
}

export function updateProduct(product, onSuccess = () => { }) {
	return (dispatch) => {
		return ProductAPI.updateProduct(product).then((response) => {
			if (response.error == undefined) {
				onSuccess(response);
			}
			else {
				dispatch(errorPopup.displayErrorMessage(response.error.message));
			}
		});
	};
}