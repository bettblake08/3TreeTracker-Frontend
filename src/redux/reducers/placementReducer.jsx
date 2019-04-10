import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	let placements = objectAssign({}, state.placements);

	switch (action.type) {
	case types.SELECT_PLACEMENT: {
		// Gets current selected placement
		let placements = objectAssign({}, state.placements);
		let suggestedPlacements = objectAssign([], placements.suggestions);
		let selected = objectAssign({}, placements.selected);
		
		if(placements.selected.id === action.placement.id){
			suggestedPlacements.push(action.placement);
			selected = {};
		}
		else {
			suggestedPlacements = suggestedPlacements.filter((elem) => elem.id !== action.placement.id);
			if(selected.id === undefined) debugger;
			suggestedPlacements.push(selected);
			selected = action.placement;
		}

		placements = {
			...placements,
			selected,
			suggestions: suggestedPlacements
		};
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