import axios, { axiosProtected } from "./config";

class LongrichAccountAPI{
	static createAccount(newAccount){

		return axios({
			url: `longrichAccount`,
			method: "POST",
			data: newAccount
		}).then((response) => {

			if(response.status === 201){
				return ({ success: true, content: response.data.content });
			}

		}).catch((response) => {
			

			switch (response.status) {
			case 400: {
				return ({
					success: false,
					error: {
						status: response.response.status,
						message: "Failed to register you into the system. Please try again"
					}
				});
			}
			default: {
				return ({
					success: false,
					error: {
						status: response.response.status,
						message: "Failed to access server. Please try again in a few minutes."
					}
				});
			}
			}
		});
	}

	static getAccounts(filter, offset = 0, admin=false){
		return axiosProtected(`${admin ? "admin/" : ""}getAccounts/${filter.name}/${filter.country}/${offset}`)
		.then((response) => {
			if (response.status === 200) {
				var data = response.data;

				if (data.content.length == 0) {
					return {
						success: false,
						error: {
							message: "There are no more accounts to retrieve. Continue creating more.",
							status: response.status
						}
					};
				}
				
				return {
					success: true,
					content: data.content,
					offset: data.content.length
				};
			}

		}).catch((response) => {
			if (response.status !== 200) {
				return {
					success: false,
					error: {
						status: response.response.status
					},	
				};
			}

		});
	}

	static updateAccount(data){
		return axiosProtected({
			url: `admin/longrichAccount/${data.id}`,
			method: "PUT",
			data
		}).then((response) => {

			if (response.status === 200) {
				return {success: true};
			}

		}).catch((response) => {
			let res = {
				success: false,
				error: {
					status: response.status
				}
			};

			switch (response.status) {
			case 404: {
				res.error.message = "There is no such user with this id. Please use vaild id.";
				return res;
			}
			case 500: {
				res.error.message = "Failed to save changes. Please try again later.";
				return res;
			}
			default: 
				res.error.message = "Failed to access server. Please try again later.";
				return res;
			}

		});
	}
}

export default LongrichAccountAPI;