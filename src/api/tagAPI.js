import { MOCK, axiosProtected } from "./config";
// import TagAPIMock from "./mock/placementAPI";

class TagAPI {
    static postNewTag(tagName) {
        // if (MOCK) return TagAPIMock.getPlacements();

        return axiosProtected(`admin/tag/${tagName}`)
        .then((response) => {

            switch(response.status){
                case 201:
                case 200:{
                    return {
                        success: true,
                        content: response.data.content
                    };
                }
                case 403: {
                    return {
                        success: false,
                        error: {
                            status: response.status,
                            message: `Tag (${tagName}) already exists!`
                        }
                    };
                }
                default: {
                    return {
                        success: false,
                        error: {
                            status: response.status,
                            message: "Access to server failed!"
                        }       
                    };
                }
            }
           
        });
    }

    static getTagSuggestions(tagName){

        return axiosProtected(`admin/tags/${tagName}`)
        .then((response) => {

            switch(response.status){
                case 200:{
                    return {
                        success: true,
                        content: response.data.content
                    }
                }
                default:{
                    return {
                        success: false,
                        error: {
                            status: response.status
                        }
                    }  
                }
            }
        });
    }
}

export default TagAPI;
