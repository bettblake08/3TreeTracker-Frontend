import axios from "axios";
import {API_URL} from "../abstract/variables";


class LongrichAccountAPI{
	static createAccount(newAccount){

		return new Promise((resolve)=>{
			axios({
				url: `${API_URL}longrichAccount`,
				method: "POST",
				data: newAccount
			}).then((response) => {
				/* state.placement = response.data.content.placement;
				c.setState(state);
                c.setView(2); */
				resolve({content: response.data.content});
			}).catch((response) => {

				switch (response.status) {
				case 400: {
					resolve({
						error:{
							status: response.response.status,
							message: "Failed to register you into the system. Please try again"
						}
					});
					break;
				}
				default: {
					resolve({
						error: {
							status: response.response.status,
							message: "Failed to access server. Please try again in a few minutes."
						}
					});
					break;
				}
				}
			});
		});

		
	}
}

export default LongrichAccountAPI;