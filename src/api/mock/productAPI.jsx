import { MOCK_DELAY as DELAY } from "../config";


let product = {
	content: {
		"log": {
			"created_at": "2018-12-02 13:50:47",
			"id": 1,
			"postId": 1,
			"type": 1
		},
		"post": {
			"body": "",
			"id": 1,
			"image": {
				"folderId": 1,
				"id": 1,
				"name": "A67S5A",
				"originalName": "test",
				"type": "jpg",
				"uuid": "11aa"
			},
			"stat": {
				"comments": 0,
				"reactions": 0,
				"views": 1
			},
			"stats": [],
			"summary": "This is a test product",
			"title": "This is a test product"
		},
		"tags": [
			{
				"id": 1,
				"name": "soap"
			}
		]
	},
	likes: {}
};

let responseStatus = 200;
let products = {
	content: []
};

for(var i = 0; i < 100; i++){
	products.content.push(product.content);
}

class ProductAPI{
	static getProductsbyOffset(reset = false, offset = 0){
		if (reset) {
			offset = 0;
		}

		return new Promise((resolve)=>{
			setTimeout(()=>{
				const responseContent = products.content.slice(offset, offset + 20);
				offset += responseContent.length;
				if (responseContent.length > 0) {
					resolve({ success: true, content: responseContent, offset });
				}
				else {
					resolve({
						success: false,
						error: {
							status: 404,
							message: "There are no more products to retrieve."
						}
					});
				}
			}, DELAY);
		});
	}
    
	static getProduct() {
		return new Promise((resolve) => {
			setTimeout(()=>{
				if (responseStatus == 200) {
					resolve({
						success: true,
						product: product.content,
						likes: product.likes
					});
				}
				else {
					resolve({
						success: false,
						error: {
							status: responseStatus
						}
					});
				}
			}, DELAY);
		});
	}

	static postProduct(product) {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (responseStatus == 201) {
					resolve({ success: true, product });
				}
				else {
					resolve({
						success: false,
						error: {
							status: responseStatus,
							message: "Failed to access server. Please try again in a few minutes."
						}
					});
				}
			}, DELAY);
		});
	}

	static updateProduct(product) {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (responseStatus == 200) {
					resolve({ success: true, product });
				}
				else {
					resolve({
						success: false,
						error: {
							status: responseStatus,
							message: "Failed to access server. Please try again in a few minutes."
						}
					});
				}
			}, DELAY);
		});
	}
}

export default ProductAPI;