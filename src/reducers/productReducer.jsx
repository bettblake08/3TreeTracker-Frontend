import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	let newState = objectAssign({}, state);

	switch(action.type){
	case types.GET_PRODUCTS_SUCCESS:{
		if (newState.products == undefined) {
			newState.products = { content: [], offset: 0 };
		}

		let products = objectAssign({}, newState.products);

		products.content = products.content.concat(action.data.content);
		products.offset = action.data.offset;
		return { ...newState, products};		
	}
	case types.GET_PRODUCT_SUCCESS: {
		if (newState.product == undefined) {
			newState.product = { content: [], likes: 0 };
		}

		let product = objectAssign({}, newState.products);
		
		product.content = action.data.product;
		product.likes = action.data.likes;
		return {...newState, product};
	}
	default:{
		return state;
	}
	}
};