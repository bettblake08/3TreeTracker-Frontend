import * as types from "../actions/actionTypes";
import objectAssign from "object-assign";

export default (state = [], action) => {
	switch (action.type) {
	case types.GET_REPO_CONTENT_SUCCESS: {
		let repo = objectAssign({}, state.repo);
		let data = action.data;
        
		// repoContent(data.content);
		repo.folders = data.content.folders;
		repo.files = data.content.files;
		repo.stats = data.content.stats;

		//This code checks if the folder has already been loaded. If so, it overwrite a loaded folder with an updated list of subFolders.

		var loadedFolderIndex = repo.foldersLoaded.findIndex((folder)=>{
			return folder.id === data.folder_id;
		});

		var fLoaded = {
			id: data.folder_id,
			subFolders: data.content.folders,
			subFiles: data.content.files,
		};

		if (loadedFolderIndex >= 0) {
			repo.foldersLoaded[loadedFolderIndex] = fLoaded;
		}
		else {
			repo.foldersLoaded.push(fLoaded);
		}

		return { ...state, repo };
	}
	case types.LOAD_REPO_CONTENT: {
		let repo = objectAssign({}, state.repo);

		//Deepest folder explored
		var folderIds = repo.folderIds;
		var currentFolderId = folderIds[folderIds.length - 1];
		var preLoadedFolders = repo.foldersLoaded;

		var preLoadedFolderIndex = preLoadedFolders.findIndex((folder)=>{
			return folder.id == currentFolderId;
		});

		if(preLoadedFolderIndex < 0){
			return state;
		}

		repo.folders = preLoadedFolders[preLoadedFolderIndex].subFolders;
		repo.files = preLoadedFolders[preLoadedFolderIndex].subFiles;

		return {...state, repo};
	}
	case types.UPDATE_REPO_FOLDER_DIRECTORY:{
		let repo = objectAssign({}, state.repo);

		repo.folderIds.push(action.data.folder.id);
		repo.folderDirs.push(action.data.folder.name);
        
		repo.currentFolder = {
			id: action.data.folder.id,
			name: action.data.folder.name
		};

		return {...state, repo};
	}
	case types.UPDATE_TO_PREV_FOLDER_DIRECTORY: {
		let repo = objectAssign({}, state.repo);

		if(repo.folderIds.length <=1) return state;

		repo.folderIds.pop();
		repo.folderDirs.pop();
        
		repo.currentFolder.id = repo.folderIds[repo.folderIds.length-1];
		repo.currentFolder.name = repo.folderDirs[repo.folderIds.length-1];

		return { ...state, repo };
	}
	case types.SET_REPO_SETTINGS: {
		let repo = objectAssign({}, state.repo);
		repo.settings = {...repo.settings, ...action.data};
		return {...state, repo};
	}
	case types.TOGGLE_SELECT_REPO_FILE: {
		let repo = objectAssign({}, state.repo);
        
		let fileIndex = repo.selectedFiles.findIndex(file => {
			return file.id == this.props.file.id;
		});

		if (fileIndex < 0) {
			// Repo file has not been selected, so we select
			var fileCount = repo.settings.requiredCount;
            
			// Check if the required number of files to be selected has not been passed
			if (fileCount == null) { return state; }
			if (repo.selectedFiles.length >= fileCount) { return state; }

			// Check is file to be selected is of the required types of files
			var fileFound = repo.requiredTypes.forEach((type)=>{
				return type == this.props.file.type;
			});

			if (fileFound == undefined) { return state; }

			repo.selectedFiles.push({
				id: this.props.file.id,
				file: this.props.file
			});
            
			return {...state, repo};
		}

		// Repo file has been selected, so we deselect
		repo.selectedFiles.splice(fileIndex);

		return {...state, repo};
	}
	case types.SELECT_REPO_FILE_IN_FOCUS: {
		let repo = objectAssign({}, state.repo);
		repo.fileInFocus = action.fileComponent;
		return { ...state, repo };
	}
	case types.SET_MAIN_REPO_COMPONENT: {
		let repo = objectAssign({}, state.repo);
		repo.mainComponent = action.component;
		return { ...state, repo };
	}
	case types.TOGGLE_CREATE_REPO_FOLDER_DISPLAY: {
		let repo = objectAssign({}, state.repo);
		repo.createFolderDisplay = !repo.createFolderDisplay;
		return { ...state, repo };
	}
	case types.TOGGLE_UPLOAD_FILE_DISPLAY: {
		let repo = objectAssign({}, state.repo);
		repo.uploadFileDisplay = !repo.uploadFileDisplay;
		return { ...state, repo };
	}
	default: {
		return state;
	}
	}
};
