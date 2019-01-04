import DELAY from "./delay";

let responseStatus = 200;
let products = {
	content: [
		{
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
					"name": "G67S5A",
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
		}
	]
};

let product = {
	content: {},
	likes: {}
};

class ProductAPI{
	static getProductsbyOffset(reset = false, offset = 0){
		if (reset) {
			offset = 0;
		}

		return new Promise((resolve)=>{
			setTimeout(()=>{
				offset += products.content.length;

				if (responseStatus == 200) {
					resolve({ content: products.content, offset });
				}
				else {
					resolve({
						error: {
							status: responseStatus,
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
						product: product.content,
						likes: product.likes
					});
				}
				else {
					resolve({
						error: {
							status: responseStatus
						}
					});
				}
			}, DELAY);
		});
	}
}

export default ProductAPI;