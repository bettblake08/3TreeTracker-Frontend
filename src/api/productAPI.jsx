import axios from "axios";
import { API_URL } from "../abstract/variables";
import { MOCK } from "./config";
import ProductAPIMock from "./mock/productAPI";

class ProductAPI{
	static getProductsbyOffset(reset = false, offset = 0){
		if(MOCK) return ProductAPIMock.getProductsbyOffset(reset, offset);

		if (reset) {
			offset = 0;
		}

		return new Promise((resolve)=>{
			axios({
				url: `${API_URL}getProducts/${offset}`,
				method: "GET"
			}).then((response) => {
				var data = response.data;

				switch (response.status) {
				case 200: {
					var content = data.content;
					offset += data.content.length;

					resolve({ content, offset });
				}
				}
			}).catch((response) => {
				var responseStatus = response.status;

				switch (responseStatus) {
				case 404: {
					resolve({
						error:{
							status: responseStatus,
							message: "There are no more products to retrieve."
						}
					});
					break;
				}
				}
			});
		});
	}
    
	static getProduct(productId) {
		if (MOCK) return ProductAPIMock.getProduct(productId);

		return new Promise((resolve) => {
			axios({
				url: `${API_URL}getProduct/${productId}`,
				method: "GET"
			}).then((response) => {

				if (response.status == 200) {
					var data = response.data;
                    
					resolve({
						product: data.content,
						likes: data.content.likes == undefined ? 0 : data.content.likes.length
					});

					/* if (state.commentingSystem.state != undefined) {
						state.commentingSystem.getComments();
					}

					setTimeout(() => {
						component.setCoverPhoto();
					}, 1000); */
				}

			}).catch((response) => {
				if (response.status != 200) {
					resolve({
						error:{
							status: response.response.status
						}
					});
				}
			});
		});
	}
}

export default ProductAPI;