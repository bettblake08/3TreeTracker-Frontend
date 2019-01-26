import {history} from "../store/configureStore";
import {adminLogoutSuccess} from "./adminAccountAuthActions";

export const checkIfUnauthorized = (response, dispatch) => {
	if (response.error.status === 401) {
		dispatch(adminLogoutSuccess());
		history.replace("/admin/login");
		return true;
	}

	return false;
};