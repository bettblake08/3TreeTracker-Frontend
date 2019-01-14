import * as types from "./actionTypes";
import RepoAPI from "../api/repoAPI";
import * as ErrorPopup from "../actions/errorPopupActions";
import * as apiCall from "./apiCallActions";
import {history} from "../store/configureStore";

export function getRepoContentSuccess(data) {
	return (dispatch) => {
		return dispatch({ type: types.GET_REPO_CONTENT_SUCCESS, data });
	};
}

export function getRepoContent() {
	return (dispatch, getState) => {
		let repo = getState().repoReducer.repo;
		var fids = repo.cached.folderIds;
		var folder_id = fids[fids.length - 1];
        
		return RepoAPI.getRepoContent(folder_id).then((response) => {
			if (response.error == undefined) {
				dispatch(getRepoContentSuccess(response));
                
				if (repo.selectedFiles != null) {
					repo.selectedFiles.forEach((selectedFile)=>{
						var file = document.getElementById(`#fl-${selectedFile}`);
						file.className.replace("repoFile", "repoFile--selected");
					});
				}
			}
			else {
				//dispatch(errorPopup.displayErrorMessage(response.error.message));
				switch(response.error){
				case 302: {
					history.push("/login");
					break;
				}
				default: {
					dispatch(apiCall.reloadAPICall("getRepoContentByFolder", 5));
				}   
				}
			}
		});
	};
}

export function loadRepoContent(data) {
	return (dispatch) => {
		return dispatch({ type: types.LOAD_REPO_CONTENT, data });
	};
}

export function changeRepoFolderDirectory(data) {
	return (dispatch) => {
		return dispatch({ type: types.UPDATE_REPO_FOLDER_DIRECTORY, data });
	};
}

export function changeToPreviousFolderDirectory() {
	return (dispatch) => {
		return dispatch({ type: types.UPDATE_TO_PREV_FOLDER_DIRECTORY});
	};
}

export function setRepoSettings(data) {
	return (dispatch) => {
		return dispatch({ type: types.SET_REPO_SETTINGS, data });
	};
}

export function createFolderinRepoSuccess(data) {
	return (dispatch) => {
		return dispatch({ type: types.GET_REPO_CONTENT_SUCCESS, data });
	};
}

export function createFolderinRepo(folderName, onSuccess = () => {}, onFailure = () => {}) {
	return (dispatch, getState) => {
		let repo = getState().repoReducer.repo;
		var fids = repo.loadedFolderIds;
		var folderId = fids[fids.length - 1];

		return RepoAPI.getRepoContent(folderId, folderName).then((response) => {
			if (response.error == undefined) {
				dispatch(createFolderinRepoSuccess(response));
				onSuccess();
			}
			else {
				//dispatch(errorPopup.displayErrorMessage(response.error.message));
				onFailure();
				dispatch(apiCall.reloadAPICall("createFolderinRepo", 5));
			}
		});
	};
}

export function deleteFileInRepoSuccess(data) {
	return (dispatch) => {
		return dispatch({ type: types.GET_REPO_CONTENT_SUCCESS, data });
	};
}

export function deleteFileInRepo(fileId, delChoice, onSuccess = () => { }, onFailure = () => { }) {
	return (dispatch) => {

		return RepoAPI.getRepoContent(fileId, delChoice).then((response) => {
			if (response.error == undefined) {
				dispatch(deleteFileInRepoSuccess(response));
				onSuccess();
			}
			else {
				dispatch(ErrorPopup.displayErrorMessage(response.error.message));
				onFailure();
			}
		});
	};
}

export function toggleSelectRepoFile(fileIndex) {
	return (dispatch) => {
		return dispatch({ type: types.TOGGLE_SELECT_REPO_FILE, fileIndex });
	};
}

export function selectRepoFileInFocus(fileComponent) {
	return (dispatch) => {
		return dispatch({ type: types.SELECT_REPO_FILE_IN_FOCUS, fileComponent });
	};
}

export function setMainRepoComponent(component) {
	return (dispatch) => {
		return dispatch({ type: types.SET_MAIN_REPO_COMPONENT, component });
	};
}

export function toggleCreateRepoFolderDisplay() {
	return (dispatch) => {
		return dispatch({ type: types.TOGGLE_CREATE_REPO_FOLDER_DISPLAY });
	};
}

export function toggleUploadFileDisplay() {
	return (dispatch) => {
		return dispatch({ type: types.TOGGLE_UPLOAD_FILE_DISPLAY });
	};
}

