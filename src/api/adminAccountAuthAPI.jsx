import axios from "axios";
import { API_URL } from "../abstract/variables";

class AdminAccountAuthAPI {
	static login(loginDetails){

		return new Promise((resolve) => {
			axios({
				url: `${API_URL}admin/loginAuth`,
				method: "POST",
				data: {
					usernameType: loginDetails.usernameType,
					username: loginDetails.username,
					password: loginDetails.password
				}
			}).then((response) => {
				var data = response.data;

				switch (data.error) {
				case 200: {
					resolve({success:true});
					//;
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
}

export default AdminAccountAuthAPI;