import axios from "axios";

export const MOCK = process.env.API_MOCK;

const instance = axios.create({
	baseURL: process.env.REACT_APP_API,
	headers: { 
		"Content-Type": "application/json"
	},
});

export default instance;
