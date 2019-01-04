// Set up your root reducer here...
import { combineReducers } from "redux";
import productReducers from "./productReducer";
import apiCallReducer from "./apiCallReducer";
import placementReducer from "./placementReducer";
import adminLoginAuthReducer from "./adminLoginAuthReducer";

export default combineReducers({
	productReducers,
	apiCallReducer,
	placementReducer,
	adminLoginAuthReducer
});