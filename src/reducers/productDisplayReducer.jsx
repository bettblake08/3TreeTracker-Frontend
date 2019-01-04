import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	let newState = objectAssign({}, state);

	switch (action.type) {
	case types.GET_PRODUCTS_SUCCESS: {
		if (newState.products == undefined) {
			newState.products = { content: [], offset: 0 };
		}

		let products = objectAssign({}, newState.products);

		products.content = products.content.concat(action.data.content);
		products.offset = action.data.offset;
		return { ...newState, products };
	}
	default: {
		return state;
	}
	}
};