import * as types from "./actionTypes";

export function displayErrorMessage(message){
	return (dispatch)=>{
		return dispatch({type: types.DISPLAY_ERROR_MESSAGE, message});
	};
}
