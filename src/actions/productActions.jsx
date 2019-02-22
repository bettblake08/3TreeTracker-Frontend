import * as types from "./actionTypes";
import ProductAPI from "../api/productAPI";
import * as errorPopup from "./errorPopupActions";
import * as apiCall from "./apiCallActions";

export const getProductsSuccess = (data) => ({ type: types.GET_PRODUCTS_SUCCESS, data });
export const getProductsIsLoading = () => ({ type: types.GET_PRODUCTS_LOADING });
export const getProductsFailure = () => ({ type: types.GET_PRODUCTS_FAILURE });

export function getProducts(reset = false, admin = false){
	return (dispatch, getState) => {
		const { offset } = getState().productReducer.products;

		return ProductAPI.getProductsbyOffset(reset, offset, admin).then((response) => {
			
			if(response.success){
				if(response.content.length === 0){ 
					dispatch(getProductsFailure());
				}
				else {
					dispatch(getProductsSuccess({ ...response, reset }));
				}
			}
			else {
				if(response.error.status === 404){
					dispatch(getProductsFailure());
				}
				else {
					dispatch(apiCall.reloadAPICall(`getProducts${admin ? "AsAdmin" : ""}`, 5));
					dispatch(errorPopup.displayErrorMessage(response.error.message));
				}
			}
		});
	};
}

export const getProductSuccess = (data) => ({ type: types.GET_PRODUCT_SUCCESS, data });

export function getProduct(productId, onSuccess = () => { }, admin = false) {
	return (dispatch) => {
		ProductAPI.getProduct(productId, admin).then((response) => {
			if (response.success) {
				dispatch(getProductSuccess(response));
				onSuccess();
			}
			else {
				dispatch(apiCall.reloadAPICall(`getProduct${admin ? "AsAdmin" : ""}`, 5));
			}
		});
	};
}

export function postProduct(product, onSuccess = () => { }) {
	return (dispatch) => {
		return ProductAPI.postProduct(product).then((response) => {
			if (response.success) {
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
			if (response.success) {
				onSuccess(response);
			}
			else {
				dispatch(errorPopup.displayErrorMessage(response.error.message));
			}
		});
	};
}

export const reactToProductSuccess = (data) => ({ type: types.REACT_TO_PRODUCT_SUCCESS, data });
export const reactToProductLoading = () => ({ type: types.REACT_TO_PRODUCT_LOADING });

export const reactToProduct = (reaction, onSuccess = () => {}) => (dispatch, getState) => {
	let productId = getState().productReducer.product.id;
	let userId = getState().loginAuthReducer.auth.user.id;

	if (userId === undefined) return dispatch(errorPopup.displayErrorMessage(
		"Please login as a Longrich User to use this feature!"
	));

	dispatch(reactToProductLoading());

	return ProductAPI.reactToProduct(productId, reaction)
		.then(response => {
			dispatch(reactToProductLoading({}));

			if(response.success){
				dispatch(reactToProductSuccess());
				onSuccess();
			}
			else {
				dispatch(errorPopup.displayErrorMessage(response.error.message));
			}
		});
}
