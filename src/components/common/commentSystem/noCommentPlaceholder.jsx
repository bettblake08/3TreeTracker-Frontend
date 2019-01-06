import React, { Component } from "react";

class NoCommentPlaceholder extends Component {
	render() {
		return (
			<div className="noComment">
				<div className="noComment__text f_normal">No one has commented on this post yet. Be the first. </div>
			</div>
		);
	}
}

export default NoCommentPlaceholder;