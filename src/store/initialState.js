/* eslint-disable import/no-unresolved */
import {getLoggedInUser} from "../helper/auth";
import {WEB_URL} from "../abstract/variables";

export default {
	productReducer: {
		products: {
			content: [],
			offset: 0 
		},
		product: { 
			content: [], 
			likes: 0 }
	},
	apiCallReducer: {
		apiCall: {}
	},
	placementReducer: {
		placements: { 
			suggestions: [], 
			selected: {} }
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
		repo: {
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
		}
	},
	longrichAccountsReducer:{
		accounts: [],
		offset: 0,
		accountInFocus: {}
	}
};