import axios from "axios";

import { forceLogOut, refreshToken} from '../redux/actions/helpers';
import { getLoggedInUser } from "../helper/auth.js";
export const MOCK = process.env.REACT_APP_API_MOCK === "true";
export const MOCK_DELAY = 0;

const axiosUnprotected = axios.create({
	baseURL: process.env.REACT_APP_API,
	headers: { "Content-Type": "application/json" }
});

export const axiosProtected = axios.create({
	baseURL: process.env.REACT_APP_API,
	headers: { "Content-Type": "application/json" }
});


axiosProtected.interceptors.request.use((config) => {
	const loggedIn = getLoggedInUser();
	if(loggedIn.userType === "") {
		forceLogOut();
		return config;
	}

	const token = loggedIn.user.accessToken;
	const newConfig = config;
	if (token !== undefined) { newConfig.headers.Authorization = `Bearer ${token}`; }

	return newConfig;
});

axiosProtected.interceptors.response.use(response => response, error => {

	if(error.response === undefined) return error;

	if (error.response.status === 401) {
		let user = getLoggedInUser();
		return user.userType === "" 
			? forceLogOut()
			: refreshToken(
				user,
				() => {
				let loggedInUser = getLoggedInUser();

				if (loggedInUser.userType ===  "") return forceLogOut();

				const headers = { Authorization: loggedInUser.user.access_token };
				Object.assign(axiosProtected.defaults, headers);
				Object.assign(error.response.config, headers);
				return axiosProtected.request(error.response.config);
				}
			);
	}

	return error.response;
});

export const axiosRefresh = axios.create({
	baseURL: process.env.REACT_APP_API,
	headers: { "Content-Type": "application/json" }
});


axiosRefresh.interceptors.request.use((config) => {
	const loggedInUser = getLoggedInUser();
	const refreshToken = loggedInUser.user.refreshToken;
	const newConfig = config;

	if (loggedInUser.userType !== "") {
		newConfig.headers.Authorization = `Bearer ${refreshToken}`;
	}
	return newConfig;
});

export default axiosUnprotected;
