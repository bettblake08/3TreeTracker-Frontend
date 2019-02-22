export const getLoggedInUser = () => {
	let user = JSON.parse(localStorage.getItem("loggedInUser"));

	if (user === null) {
		return {
			user: {},
			userType: ""
		};
	}

	return user;
};

export const logoutUser = () => {
	localStorage.removeItem("loggedInUser");
};

export const setLoggedInUser = (user) => {
	localStorage.setItem("loggedInUser", JSON.stringify(user));
	return true;
};