import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	switch (action.type) {
	case types.GET_REPO_CONTENT_SUCCESS: {
		let foldersLoaded = objectAssign([], state.foldersLoaded);
		let data = action.data;

		//This code checks if the folder has already been loaded. If so, it overwrite a loaded folder with an updated list of subFolders.

		var loadedFolderIndex = foldersLoaded.findIndex(folder => folder.id === data.folder_id);

		var fLoaded = {
			id: data.folder_id,
			subFolders: data.content.folders,
			subFiles: data.content.files,
		};

		if (loadedFolderIndex >= 0) {	foldersLoaded[loadedFolderIndex] = fLoaded;	}
		else {	foldersLoaded.push(fLoaded);	}

		return { ...state, ...data.content, foldersLoaded};
	}
	case types.LOAD_REPO_CONTENT: {
		let repo = objectAssign({}, state);

		//Deepest folder explored
		var folderIds = repo.folderIds;
		var currentFolderId = folderIds[folderIds.length - 1];
		var preLoadedFolders = repo.foldersLoaded;

		var preLoadedFolderIndex = preLoadedFolders.findIndex( folder => folder.id === currentFolderId);

		if(preLoadedFolderIndex < 0){	return state;	}

		return {
			...state,
			folders: preLoadedFolders[preLoadedFolderIndex].subFolders,
			files: preLoadedFolders[preLoadedFolderIndex].subFiles
		};
	}	
	case types.UPDATE_REPO_FOLDER_DIRECTORY:{
		let folderIds = objectAssign([], state.folderIds);
		let folderDirs = objectAssign([], state.folderDirs);
		let { folder } = action.data;

		folderIds.push(folder.id);
		folderDirs.push(folder.name);

		return {
			...state,
			folderIds,
			folderDirs,
			currentFolder: {
				id: folder.id,
				name: folder.name
			}
		};
	}
	case types.UPDATE_TO_PREV_FOLDER_DIRECTORY: {
		let folderIds = objectAssign([], state.folderIds);
		let folderDirs = objectAssign([], state.folderDirs);

		if(folderIds.length <= 1) return state;

		folderIds.pop();
		folderDirs.pop();

		return {
			...state,
			folderIds,
			folderDirs,
			currentFolder: {
				id: folderIds[folderIds.length - 1],
				name: folderDirs[folderDirs.length - 1]
			}
		};
	}
	case types.SET_REPO_SETTINGS: {
		let settings = objectAssign({}, state.settings);
		settings = {
			...settings,
			...action.data
		};

		return {...state, settings};
	}
	case types.TOGGLE_SELECT_REPO_FILE: {
		let selectedFiles = objectAssign([], state.selectedFiles);
		let file = action.data;

		let fileIndex = selectedFiles.findIndex(selectedFile => selectedFile.id === file.id);

		if (fileIndex < 0) {
			// Repo file has not been selected, so we select
			var fileCount = state.settings.requiredCount;
            
			// Check if the required number of files to be selected has not been passed
			if (fileCount === null || selectedFiles.length >= fileCount) { return state; }

			// Check is file to be selected is of the required types of files
			if (state.settings.requiredTypes.find(type => type == file.type) === undefined) return state;

			selectedFiles.push({
				id: file.id,
				file: file
			});
		}
		else {
			// Repo file has been selected, so we deselect
			selectedFiles.splice(fileIndex, 1);
		}

		return {...state, selectedFiles};
	}
	case types.SELECT_REPO_FILE_IN_FOCUS: {
		return { ...state, fileInFocus: action.file };
	}
	case types.SELECT_REPO_FOLDER_IN_FOCUS: {
		return { ...state, folderInFocus: action.folder };
	}
	case types.SET_MAIN_REPO_COMPONENT: {
		return { ...state, mainComponent: action.component };
	}
	case types.TOGGLE_CREATE_REPO_FOLDER_DISPLAY: {
		return { ...state, createFolderDisplay: !state.createFolderDisplay };
	}
	case types.TOGGLE_UPLOAD_FILE_DISPLAY: {
		return { ...state, uploadFileDisplay: !state.uploadFileDisplay };
	}
	case types.DELETE_REPO_FOLDER_SUCCESS: {
		return { ...state, folders: state.folders.filter(folder => folder.id !== action.data)};
	}
	case types.DELETE_REPO_FILE_SUCCESS: {
		return { ...state, files: state.files.filter(file => file.id !== action.data) };
	}
	default: {
		return state;
	}
	}
};
