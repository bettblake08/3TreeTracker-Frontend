import * as types from "./actionTypes";
import TagAPI from "../api/tagAPI";
import * as errorPopup from "./errorPopupActions";

export function getTagSuggestionsSuccess(data){
    return { type: types.GET_TAG_SUGGESTIONS_SUCCESS, data}
}

export function toggleSelectTag(tag) {
    return (dispatch) => dispatch({ type: types.TOGGLE_SELECT_TAG, data: tag });
}

export function setTags(tagArray) {
    return (dispatch) => dispatch({ type: types.SET_TAGS, data: tagArray });
}

export function resetTags() {
    return (dispatch) => dispatch(getTagSuggestionsSuccess({tags: []}));
}

export function addNewTag(tagName) {
    return (dispatch) => {
        return TagAPI.postNewTag(tagName).then((response) => {
            if (response.success) {
                dispatch(toggleSelectTag(response.content));
            }
            else {
                dispatch(errorPopup.displayErrorMessage(response.error.message));
            }
        });
    };
}

export function getTagSuggestions(tagName) {
    return (dispatch) => {
        return TagAPI.getTagSuggestions(tagName).then((response) => {
            if (response.success) {
                dispatch(getTagSuggestionsSuccess({tags: response.content }));
            }
            else {
                dispatch(errorPopup.displayErrorMessage(response.error.message));
            }
        });
    };
}
