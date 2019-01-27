import axios from "./config";
import AdminAccountAuthAPIMock from "./mock/adminAccountAuthAPI";
import { MOCK } from "./config";
import { API_URL } from "../abstract/variables";

class AdminAccountAuthAPI {
	static login(loginDetails){
		if (MOCK) return AdminAccountAuthAPIMock.login();

		return new Promise((resolve) => {
			axios.post(`${API_URL}admin/login`, {
				username: loginDetails.username,
				password: loginDetails.password
			}).then((response) => {

				switch (response.status) {
				case 200: {
					resolve({
						success:true,
						user: response.data.user,
						userType: "admin"
					});
					break;
				}
				}

			}).catch((response) => {
				if (response.response.status != 200) {
					resolve({
						success: false,
						error:{
							status:response.response.status,
						}
					});
				}
			});
		});
        
	}

	static logout() {
		if (MOCK) return AdminAccountAuthAPIMock.logout();

		return new Promise((resolve) => {
			axios({
				url: `${API_URL}admin/logout`,
				method: "GET"
			}).then((response) => {
				if (response.status == 200) {
					resolve({success:true});
				}

			}).catch((response) => {
				let responseStatus = response.status;
				switch (responseStatus) {
				default: {
					resolve({
						error: {
							status: responseStatus,
							message: "Error accessing server. Please try again later."
						}});
					break;
				}
				}
			});

		});

	}
}

export default AdminAccountAuthAPI;