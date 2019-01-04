import axios from "axios";
import { API_URL } from "../abstract/variables";
import { MOCK } from "./config";
import PlacementAPIMock from "./mock/placementAPI";

class PlacementAPI{
	static getPlacements(placementName){
		if(MOCK) return PlacementAPIMock.getPlacements();

		return new Promise((resolve)=>{
			axios({
				url: `${API_URL}getPlacements/${placementName.toLowerCase()}`,
				method: "GET"
			}).then((response) => {

				var data = response.data;
				switch (response.status) {
				case 200: {
					resolve({
						suggestions: data.content
					});
					break;
				}
				}
			}).catch((response) => {

				switch (response.status) {
				case 404: {
					resolve({
						error: {
							status: response.status,
							message: "Error accessing server. Please try again later."
						}
					});
					break;
				}
				}
			});
		});
	}
    
	
}

export default PlacementAPI;