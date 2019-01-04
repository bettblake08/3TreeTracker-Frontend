// Set up your root reducer here...
import { combineReducers } from "redux";
import productReducer from "./productReducer";
import apiCallReducer from "./apiCallReducer";
import placementReducer from "./placementReducer";
import adminLoginAuthReducer from "./adminLoginAuthReducer";
import errorPopupReducer from "./errorPopupReducer";

export default combineReducers({
	productReducer,
	apiCallReducer,
	placementReducer,
	adminLoginAuthReducer,
	errorPopupReducer
});