import * as types from "../actions/actionTypes";

export default (state = [], action) => {
    switch (action.type) {
        case types.TOGGLE_POPUP: {
            return { ...state, [action.popup]: !state[action.popup] };
        }
        default: {
            return state;
        }
    }
}