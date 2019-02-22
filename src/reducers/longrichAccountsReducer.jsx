import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = {}, action) => {
	switch (action.type) {
	case types.GET_LONGRICH_ACCOUNTS_SUCCESS: {
		let accounts = objectAssign([], state.accounts);

		accounts = action.data.reset ? action.data.content : accounts.concat(action.data.content);

		return {
			...state,
			accounts,
			offset: action.data.offset,
			hasMore: !(action.data.content.length === 0)
		};
	}
	case types.GET_LONGRICH_ACCOUNTS_LOADING: {
		return { ...state, isLoading: !state.isLoading };
	}
	case types.SET_LONGRICH_ACCOUNT_IN_FOCUS: {
		return { ...state, accountInFocus: action.data };
	}
	default: return state;
	}
};
