import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	let placements = objectAssign({}, state.placements);

	switch (action.type) {
	case types.SELECT_PLACEMENT: {
		// Gets current selected placement
		let selectedPlacement = state.placements.selected;

		if (selectedPlacement.id == undefined || selectedPlacement.id == action.placement.id) {
			return state;
		}

		var index = state.placements.suggestions.findIndex((elem) => {
			return elem.id == action.placement.id;
		});
        
		// If placement exists in the suggestions, we remove it from the suggestions
		if (index >= 0) {
			state.placements.suggestions.splice(index, 1);
		}

		placements.selected = selectedPlacement;
		return {...state, placements};
	}
	case types.GET_PLACEMENTS_SUCCESS: {
		placements.suggestions = action.data.suggestions;
		return {...state, placements};
	}
	case types.REMOVE_SELECTED_PLACEMENT:{
		placements.selected = {};
		return {...state, placements};		
	}
	case types.RESET_PLACEMENT_SUGGESTIONS: {
		placements.suggestions = [];
		return {...state, placements};
	}
	default: {
		return state;
	}
	}
};