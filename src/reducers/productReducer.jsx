import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	switch(action.type){
	case types.GET_PRODUCTS_SUCCESS:{
		let products = objectAssign({}, state.products);
		products.content = products.content.concat(action.data.content);
		products.offset = action.data.offset;
		return { ...state, products};		
	}
	case types.GET_PRODUCT_SUCCESS: {
		let product = objectAssign({}, state.products);
		product.content = action.data.product;
		product.likes = action.data.likes;
		return {...state, product};
	}
	default:{
		return state;
	}
	}
};