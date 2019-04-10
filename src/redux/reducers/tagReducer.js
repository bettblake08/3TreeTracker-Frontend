import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
    switch (action.type) {
        case types.GET_TAG_SUGGESTIONS_SUCCESS: {
            return { ...state, suggestedTags: action.data.tags };
        }
        case types.TOGGLE_SELECT_TAG: {
            const selectedTags = objectAssign([], state.selectedTags);
            const suggestedTags = objectAssign([], state.suggestedTags);
            const selectedTag = action.data;
            
            const foundTag = selectedTags.findIndex(elem => elem.id === selectedTag.id);

            if (foundTag < 0) {
                // Tag has not been selected yet
                selectedTags.push(selectedTag);
                const index = suggestedTags.findIndex(tag => tag.id === selectedTag.id);
                if (index >= 0) suggestedTags.splice(index, 1);
            }
            else {
                // Tag has alreday been selected
                selectedTags.splice(foundTag, 1);
                suggestedTags.push(selectedTag);
            }

            return { ...state, selectedTags, suggestedTags };
        }
        case types.SET_TAGS: {
            return {...state, selectedTags: action.data };
        }
        default: {
            return state;
        }
    }
};
