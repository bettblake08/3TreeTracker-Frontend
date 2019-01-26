import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	switch (action.type) {
	case types.GET_LONGRICH_ACCOUNTS_SUCCESS: {
		let accounts = objectAssign({}, state.accounts);
		accounts.list = accounts.concat(action.data.content);
		accounts.offset = action.data.offset;
		return { ...state, accounts };
	}
	default: {
		return state;
	}
	}
};
