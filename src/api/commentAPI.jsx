import axios from "axios";
import { API_URL } from "../abstract/variables";
import { MOCK } from "./config";
import * as errorPopupActions from "../actions/errorPopupActions";

class ProductAPI {
	static postComment(comment, onComplete = () => { }, onFailure = () => {}) {
		var url = `${API_URL}comment/${comment.postType}`;

		switch (comment.postType) {
		case 1: {
			url += `${comment.product.log.id}/0`;
			break;
		}
		}

		return new Promise((resolve) => {
			axios({
				url: url,
				method: "POST",
				data: {
					name: comment.user.name,
					email: comment.user.email,
					comment: comment.text
				}
			}).then((response) => {

				switch (response.status) {
				case 201: {
					onComplete();
					break;
				}
				}

			}).catch((response) => {
				onFailure();
				let responseStatus = response.status;

				switch (responseStatus) {
				case 400:
				case 500: {
					resolve({
						error: {
							status: responseStatus,
							message: "Access to server failed. Try again Later! "
						}
					});
					break;
				}
				case 404: {
					resolve({
						error: {
							status: responseStatus,
							message: "Post not found. Try again Later! "
						}
					});
					break;
				}
				}

			});
		});
	}

	static reactToComment(reaction, onComplete = ()=>{}) {
		if (MOCK) return CommentAPIMock.reactToComment();
		let url = `${API_URL}commentReaction/${reaction.postType}/${reaction.commentId}/${reaction.id}`;
        
		//Reactions
		//1 - Like
		//2 - Dislike
        
		return new Promise(() => {
			axios({
				url,
				method: "GET"
			}).then((response) => {

				switch (response.status) {
				case 200: {
					onComplete();
					break;
				}
				}

			}).catch((response) => {
				let responseStatus = response.status;
				switch (responseStatus) {
				case 404: {
					errorPopupActions.displayErrorMessage("Comment not found! Try again later!");
					break;
				}
				}
			});
		});
	}
}

export default ProductAPI;