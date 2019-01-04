import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	let newState = objectAssign({}, state);

	if (newState.products == undefined) {
		newState.products = { content: [], offset: 0 };
	}

	switch(action.type){
	case types.GET_PRODUCTS_SUCCESS:{
		let products = objectAssign({}, newState.products);
		
		if(products == undefined){
			products = {content: [], offset:0};
		}

		products.content = products.content.concat(action.data.content);
		products.offset = action.data.offset;
		return newState;
	}
	case types.GET_PRODUCT_SUCCESS: {
		let product = objectAssign({}, newState.products);

		newState = objectAssign({}, state);
		if (product == undefined) {
			product = { content: [], likes: 0 };
		}
		
		product.content = action.data.product;
		product.likes = action.data.likes;
		return newState;
	}
	default:{
		return state;
	}
	}
};