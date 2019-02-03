import axios, { MOCK } from "./config";
import PlacementAPIMock from "./mock/placementAPI";

class PlacementAPI{
	static getPlacements(placementName){
		if(MOCK) return PlacementAPIMock.getPlacements();

		return axios(`getPlacements/${placementName.toLowerCase()}`)
		.then((response) => {
			if(response.status === 200){
				return ({
					success: true,
					suggestions: response.data.content
				});
			}
		}).catch((response) => {

			switch (response.response.status) {
				case 404: {
					return ({
						success: false,
						error: {
							status: response.response.status,
							message: "No placement suggestions found!"
						}
					});
				}
				default : {
					return ({
						success: false,
						error: {
							status: response.response.status,
							message: "Error accessing server. Please try again later."
						}
					});
				}
			}
		});
	}
    
	
}

export default PlacementAPI;