import * as types from "./actionTypes";
import RepoAPI from "../api/repoAPI";
import * as ErrorPopup from "../actions/errorPopupActions";
import * as apiCall from "./apiCallActions";


export function getRepoContentSuccess(data) {
	return { type: types.GET_REPO_CONTENT_SUCCESS, data };
}

export function getRepoContent() {
	return (dispatch, getState) => {
		let { folderIds } = getState().repoReducer;

		var folderId = folderIds[folderIds.length - 1];

		return RepoAPI.getRepoContent(folderId).then((response) => {
			if (response.success) {
				dispatch(getRepoContentSuccess(response));
                
				if (repo.selectedFiles != null) {
					repo.selectedFiles.forEach((selectedFile)=>{
						var file = document.getElementById(`#fl-${selectedFile}`);
						file.className.replace("repoFile", "repoFile--selected");
					});
				}
			}
			else {
				dispatch(apiCall.reloadAPICall("getRepoContentByFolder", 5));
			}
		});
	};
}

export function loadRepoContent() {
	return (dispatch) => {
		return dispatch({ type: types.LOAD_REPO_CONTENT });
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

export function createFolderinRepo(folderName, onSuccess = () => {}, onFailure = () => {}) {
	return (dispatch, getState) => {
		let { folderIds } = getState().repoReducer;
		var folderId = folderIds[folderIds.length - 1];

		return RepoAPI.createFolderinRepo(folderId, folderName).then((response) => {
			if (response.success) {
				getRepoContent();
				onSuccess();
			}
			else {			
				onFailure();
				dispatch(apiCall.reloadAPICall("createFolderinRepo", 5));
			}
		});
	};
}

export function deleteFileInRepoSuccess(data) {
	return { type: types.DELETE_REPO_FILE_SUCCESS, data };
}

export function deleteFileInRepo(fileId, delChoice = false, onSuccess = () => { }, onFailure = () => { }) {
	return (dispatch) => {

		return RepoAPI.deleteFileFromRepo(fileId, delChoice).then((response) => {
			if (response.success) {
				dispatch(deleteFileInRepoSuccess(fileId));
				onSuccess();
			}
			else {			
				dispatch(ErrorPopup.displayErrorMessage(response.error.message));
				onFailure();
			}
		});
	};
}

export function toggleSelectRepoFile(data) {
	return (dispatch) => {
		return dispatch({ type: types.TOGGLE_SELECT_REPO_FILE, data });
	};
}

export function selectRepoFileInFocus(file) {
	return (dispatch) => {
		return dispatch({ type: types.SELECT_REPO_FILE_IN_FOCUS, file });
	};
}

export function selectRepoFolderInFocus(folder) {
	return (dispatch) => {
		return dispatch({ type: types.SELECT_REPO_FOLDER_IN_FOCUS, folder });
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

export function deleteFolderInRepoSuccess(data) {
	return { type: types.DELETE_REPO_FOLDER_SUCCESS, data };
}

export function deleteFolderInRepo(folderId, delChoice = false, onSuccess = () => { }, onFailure = () => { }) {
	return (dispatch) => {

		return RepoAPI.deleteFolderFromRepo(folderId, delChoice).then((response) => {
			if (response.success) {
				dispatch(deleteFolderInRepoSuccess(folderId));
				onSuccess();
			}
			else {
				dispatch(ErrorPopup.displayErrorMessage(response.error.message));
				onFailure();
			}
		});
	};
}
