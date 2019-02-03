import axios from "axios";

export const MOCK = process.env.API_MOCK;
export const MOCK_DELAY = 0;

export default axios.create({
	baseURL: process.env.REACT_APP_API,
	headers: { "Content-Type": "application/json" }
});

export const axiosProtected = axios.create({
	baseURL: process.env.REACT_APP_API,
	headers: { "Content-Type": "application/json" }
});

const user = JSON.parse(localStorage.getItem("user"));

if (user !== null) {
	axiosProtected.defaults.headers.common.Authorization = `Token ${user.token}`;
} else {
	delete axiosProtected.defaults.headers.common.Authorization;
}

export const axiosRefresh = axios.create({
	baseURL: process.env.REACT_APP_API,
	headers: { "Content-Type": "application/json" }
});


if (user !== null) {
	axiosRefresh.defaults.headers.common.Authorization = `Token ${user.refreshToken}`;
} else {
	delete axiosRefresh.defaults.headers.common.Authorization;
}
