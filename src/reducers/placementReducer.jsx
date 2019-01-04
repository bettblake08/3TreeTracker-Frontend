import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	let newState = objectAssign({}, state);

	if (newState.placements == undefined) {
		newState.placements = { suggestions: [], selected: {} };
	}

	let placements = objectAssign({}, newState.placements);

	switch (action.type) {
	case types.SELECT_PLACEMENT: {
		// Gets current selected placement
		let selectedPlacement = newState.placements.selected;

		if (selectedPlacement.id == undefined || selectedPlacement.id == action.placement.id) {
			return newState;
		}

		var index = newState.placements.suggestions.findIndex((elem) => {
			return elem.id == action.placement.id;
		});
        
		// If placement exists in the suggestions, we remove it from the suggestions
		if (index >= 0) {
			newState.placements.suggestions.splice(index, 1);
		}

		placements.selected = selectedPlacement;
		return {...newState, placements};
	}
	case types.GET_PLACEMENTS_SUCCESS: {
		placements.suggestions = action.data.suggestions;
		return {...newState, placements};
	}
	case types.REMOVE_SELECTED_PLACEMENT:{
		placements.selected = {};
		return {...newState, placements};		
	}
	case types.RESET_PLACEMENT_SUGGESTIONS: {
		placements.suggestions = [];
		return {...newState, placements};
	}
	default: {
		return state;
	}
	}
};