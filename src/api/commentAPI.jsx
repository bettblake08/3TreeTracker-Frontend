import { MOCK, axiosProtected } from "./config";

class ProductAPI {
	static postComment(comment, onComplete = () => { }, onFailure = () => {}) {
		var url = `comment/${comment.postType}`;

		switch (comment.postType) {
		case 1: {
			url += `${comment.product.log.id}/0`;
			break;
		}
		}

		return axiosProtected({
			url,
			method: "POST",
			data: {
				name: comment.user.name,
				email: comment.user.email,
				comment: comment.text
			}
		}).then((response) => {

			if(response.status === 201){
				onComplete();
				return;
			}

		}).catch((response) => {
			onFailure();
			let res = {
				success: false,
				error: {
					status: response.response.status
				}
			};

			switch (response.response.status) {
				case 400:
				case 500: {
					res.error.message = "Access to server failed. Try again Later! ";
					return res;
				}
				case 404: {
					res.error.message = "Post not found. Try again Later! ";
					return res;
				}
			}

		});
	}

	static reactToComment(reaction, onComplete = ()=>{}) {
		if (MOCK) return CommentAPIMock.reactToComment();
        
		//Reactions
		//1 - Like
		//2 - Dislike
        
		return axiosProtected(`commentReaction/${reaction.postType}/${reaction.commentId}/${reaction.id}`)
			.then((response) => {

				if(response.status === 200){
					// onComplete();
					return {success: true};
				}

		}).catch((response) => {
			let responseStatus = response.response.status;
			switch (responseStatus) {
				case 404: {
					// errorPopupActions.displayErrorMessage("Comment not found! Try again later!");
					return {success:false, error:{ status: responseStatus }};
				}
			}
		});
	}
}

export default ProductAPI;