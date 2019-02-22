/* eslint-disable import/no-unresolved */
import {getLoggedInUser} from "../helper/auth";
import {WEB_URL} from "../abstract/variables";

export default {
	productReducer: {
		products: {
			content: [],
			offset: 0,
			hasMore: false,
			isLoading: false
		},
		product: { 
			content: {}, 
			likes: 0,
			isLoading: false
		},
		reactionIsLoading: false
	},
	apiCallReducer: {
		apiCall: {}
	},
	placementReducer: {
		placements: { 
			suggestions: [], 
			selected: {}
		}
	},
	loginAuthReducer: {
		auth: getLoggedInUser()
	},
	errorPopupReducer: {
		errorPopup: { 
			errors: [] 
		}
	},
	repoReducer:{
		mainComponent: {},
		currentFolder: {
			id: "root"
		},
		folderIds: ["root"],
		folderDirs: ["root"],
		foldersLoaded: [],
		folders: [],
		files: [],
		cached: {
			folderIds: []
		},
		fileInFocus: {},
		folderInFocus: {},
		selectedFiles: [],
		contentdir: `${WEB_URL}repo/`,
		createFolderDisplay: false,
		uploadFileDisplay: false
	},
	longrichAccountsReducer:{
		accounts: [],
		offset: 0,
		accountInFocus: {},
		hasMore: false,
		isLoading: false
	},
	tagReducer: {
		selectedTags: [],
		suggestedTags: []
	},
	popupReducer: {
		deleteFileConfirmationPopup: false,
		deleteFolderConfirmationPopup: false,
		editAccountPopup: false,
		repoPopup: false
	}
};