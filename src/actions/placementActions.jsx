import * as types from "./actionTypes";
import placementAPI from "../api/placementAPI";
import * as errorPopup from "./errorPopupActions";

export function getPlacementsSuccess(data) {
	return (dispatch) => {
		return dispatch({ type: types.GET_PLACEMENTS_SUCCESS, data });
	};
}

export function getPlacements(placementName) {
	return (dispatch) => {
		return placementAPI.getPlacements(placementName).then((response) => {
			if (response.success) {
				dispatch(getPlacementsSuccess(response));
			}
			else {
				dispatch(errorPopup.displayErrorMessage(response.message));
			}
		});
	};
}

export function selectPlacement(data) {
	return (dispatch) => {
		return dispatch({ type: types.SELECT_PLACEMENT, placement: data });
	};
}

export function removeSelectedPlacement() {
	return (dispatch) => {
		return dispatch({ type: types.REMOVE_SELECTED_PLACEMENT});
	};
}

export function resetPlacementSuggestions() {
	return (dispatch) => {
		return dispatch({ type: types.RESET_PLACEMENT_SUGGESTIONS});
	};
}