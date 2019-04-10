import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	switch(action.type){
	case types.GET_PRODUCTS_SUCCESS:{
		let products = objectAssign({}, state.products);

		if(action.data.reset){	products.content = action.data.content;		}
		else {	products.content = products.content.concat(action.data.content);	}

		products.offset = action.data.offset;
		products.hasMore = true;
		return { ...state, products};		
	}
	case types.GET_PRODUCTS_FAILURE: {
		let products = objectAssign({}, state.products);
		products.hasMore = false;
		return { ...state, products };
	}
	case types.GET_PRODUCTS_LOADING: {
		let products = objectAssign({}, state.products);
		products.isLoading = !products.isLoading;
		return {...state, products };
	}
	case types.GET_PRODUCT_SUCCESS: {
		let product = objectAssign({}, state.product);
		product.content = action.data.product;
		product.likes = action.data.likes;
		return {...state, product};
	}
	case types.REACT_TO_PRODUCT_SUCCESS: {
		let product = objectAssign({}, state.product);
		let { userId: currrentUserId, reaction: currentReaction} = action.data; 
		
		var ind = product.stats.findIndex(item => item.user === currrentUserId);

		if (ind < 0) {
			let oldReactionState = product.stats[ind].reaction;
			product.stats[ind].reaction = currentReaction === oldReactionState ? 0 : reaction;
		}

		return {...state, product};
	}
	case types.REACT_TO_PRODUCT_LOADING: return { ...state, reactionIsLoading: !state.reactionIsLoading };
	default:{
		return state;
	}
	}
};
