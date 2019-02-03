import { MOCK_DELAY as DELAY } from "../config";

let responseStatus = 200;
let user = {
	id: 1,
	username: "johndoe1",
	password: "johndoe@A2"
};


class AuthenticationAPI {
	static login(){
		return new Promise((resolve) => {
			setTimeout(() => {
				if (responseStatus == 200) {
					resolve({
						success: true,
						user,
						userType: "admin"
					});
				}
				else {
					resolve({
						error: {
							status: responseStatus,
							message: "Error accessing server. Please try again later."
						}
					});
				}
			}, DELAY);
		});
	}

	static logout() {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (responseStatus == 200) {
					resolve({
						success: true
					});
				}
				else {
					resolve({
						error: {
							status: responseStatus,
							message: "Error accessing server. Please try again later."
						}
					});
				}
			}, DELAY);
		});
	}
}

export default AuthenticationAPI;