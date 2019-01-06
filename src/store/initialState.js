import {getLoggedInUser} from "../helper/auth";

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
	}
};