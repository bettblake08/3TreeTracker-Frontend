/* eslint-disable import/no-unresolved */
// Set up your root reducer here...
import { combineReducers } from "redux";
import productReducer from "./productReducer";
import apiCallReducer from "./apiCallReducer";
import placementReducer from "./placementReducer";
import loginAuthReducer from "./loginAuthReducer";
import errorPopupReducer from "./errorPopupReducer";
import repoReducer from "./repoReducer";
import longrichAccountsReducer from "./longrichAccountsReducer";

export default combineReducers({
	productReducer,
	apiCallReducer,
	placementReducer,
	loginAuthReducer,
	errorPopupReducer,
	repoReducer,
	longrichAccountsReducer
});