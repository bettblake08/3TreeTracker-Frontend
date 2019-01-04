import DELAY from "./delay";

let responseStatus = 200;
let products = {
	content: [],
	offset: 0
};
let product = {
	content: {},
	likes: {}
};

class ProductAPI{
	static getProductsbyOffset(reset = false, offset = 0){
		offset = products.offset;

		if (reset) {
			offset = 0;
		}

		return new Promise((resolve)=>{
			setTimeout(()=>{
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