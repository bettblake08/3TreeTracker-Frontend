import DELAY from "./delay";

let responseStatus = 200;
let placements = [];

class PlacementAPI {
	static getPlacements(){

		return new Promise((resolve)=>{
			setTimeout(() => {
				if (responseStatus == 200) {
					resolve({
						suggestions: placements
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

export default PlacementAPI;