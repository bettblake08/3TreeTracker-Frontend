import axios from "axios";
import AdminAccountAuthAPIMock from "./mock/adminAccountAuthAPI";
import { MOCK } from "./config";
import { API_URL } from "../abstract/variables";

class AdminAccountAuthAPI {
	static login(loginDetails){
		if (MOCK) return AdminAccountAuthAPIMock.login();

		return new Promise((resolve) => {
			axios({
				url: `${API_URL}admin/login`,
				method: "POST",
				data: {
					username: loginDetails.username,
					password: loginDetails.password
				}
			}).then((response) => {
				var data = response.data;

				switch (data.error) {
				case 200: {
					resolve({
						success:true,
						user: data.user,
						userType: "admin"
					});
					break;
				}
				}

			}).catch((response) => {
				if (response.status != 200) {
					resolve({
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