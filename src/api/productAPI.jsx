import axios, { axiosProtected, MOCK } from "./config";
import ProductAPIMock from "./mock/productAPI";

class ProductAPI{
	static getProductsbyOffset(reset = false, offset = 0, admin = false){
		if(MOCK) return ProductAPIMock.getProductsbyOffset(reset, offset);
		if (reset) { offset = 0; }

		const instance = admin ? axiosProtected : axios;
		return instance(`${admin ? "admin/" : ""}getProducts/${offset}`)
		.then((response) => {
			var data = response.data;
			
			if(response.status === 200){
				return {
					success: true,
					content: data.content,
					offset: offset + data.content.length
				};
			}
		}).catch((response) => {
			var responseStatus = admin ? response.status: response.response.status;
			switch (responseStatus) {
				case 404: {
					return {
						success: false,
						error: {
							status: responseStatus,
							message: "There are no more products to retrieve."
						}
					};
				}
				default: {
					return {
						success: false,
						error: {
							status: responseStatus,
							message: "Failed to access server!"
						}
					};
				}
			}
		});
	}
    
	static getProduct(productId, admin = false) {
		if (MOCK) return ProductAPIMock.getProduct(productId);

		const instance = admin ? axiosProtected : axios;

		return instance(`${admin ? "admin/product" : "getProduct" }/${productId}`)
		.then((response) => {
			if (response.status === 200) {
				var data = response.data;

				return {
					success: true,
					product: data.content,
					likes: data.content.likes == undefined ? 0 : data.content.likes.length
				};
			}
		}).catch((response) => {
			if (response.response.status !== 200) {
				return {
					success: false,
					error: {
						status: response.response.status
					}
				};
			}
		});
	}

	static postProduct(product) {
		if (MOCK) return ProductAPIMock.postProduct(product);

		return axiosProtected({
			url: `admin/product/0`,
			method: "POST",
			data: product
		}).then((response) => {
			if (response.status === 201) {
				return { success: true, product };
			}

		}).catch((response) => {
			switch (response.status) {
				default: {
					return {
						success: false,
						error: {
							status: response.status,
							message: "Failed to access server. Please try again in a few minutes."
						}
					};
				}
			}
		});
	}

	static updateProduct(product){
		if (MOCK) return ProductAPIMock.updateProduct(product);

		return axiosProtected({
			url: `admin/product/${product.pro__id}`,
			method: "PUT",
			data: product
		}).then((response) => {

			if (response.status === 200) {
				return { success: true, product };
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
					res.error.message = "Product does not exist! If you have an concerns, contact developer!";
					return res;
				}
				case 500: {
					res.error.message = "Failed to save the product. Please try again!";
					return res;
				}
				default: {
					res.error.message = "Failed to access server. Please try again in a few minutes.";
					return res;
				}
			}

		});
	}

	static reactToProduct(productId, reaction = 0) {

		return axiosProtected(`productReaction/${productId}/${reaction}`)
		.then((response) => {

			if (response.status === 200) {
				return {	success: true	};
			}

		}).catch((response) => {
			if(response.status !== 200){
				return {
					success: false,
					error: {
						status: response.status
					}
				}
			}
		});
	}
}

export default ProductAPI;