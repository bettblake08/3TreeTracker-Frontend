import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import {DEFAULT_USER_PIC} from "../../abstract/variables";
import IconButton from "../../UI/iconButton";
import CommentAPI from "../../../api/commentAPI";

class Comment extends Component {
	constructor(props) {
		super(props);
		var stats = {
			likes: 0,
			dislikes: 0
		};

		this.props.comment.stats.forEach((s) => {
			switch (s.reaction) {
			case 1: {
				stats.likes++;
				break;
			}
			case 2: {
				stats.dislikes++;
				break;
			}
			}
		});

		this.state = {
			reaction: 0,
			stats: stats,
			iconButtons: []
		};

		this.reactToComment = this.reactToComment.bind(this);
		this.updateLikeStats = this.updateLikeStats.bind(this);
	}

	updateLikeStats(prevReaction, newReaction){
		var state = this.state;
		state.reaction = newReaction;

		switch (prevReaction) {
		case 0: {
			switch (newReaction) {
			case 1: {
				state.stats.likes++;
				break;
			}
			case 2: {
				state.stats.dislikes++;
				break;
			}
			}
			break;
		}
		case 1: {
			switch (newReaction) {
			case 2: {
				state.stats.likes--;
				state.stats.dislikes++;
				break;
			}
			}
			break;
		}
		case 2: {
			switch (newReaction) {
			case 1: {
				state.stats.dislikes--;
				state.stats.likes++;
				break;
			}
			}
			break;
		}
		}

		this.setState(state);
	}

	reactToComment(reaction = 1) {
		var component = this;
		var state = component.state;

		CommentAPI.reactToComment(
			{
				id: reaction,
				commentId: this.props.comment.id,
				postType: this.props.main.props.commentingOn
			},
			() => {
				component.updateLikeStats(state.reaction, reaction);
			}
		);
	}


	render() {
		var comment = this.props.comment;
		var time = moment(comment.created_at, "YYYY-MM-DDTHH:mm:ss").utc(3).local();
		var reaction = this.state.reaction;

		return (
			<div className="comment" >
				<div className="comment__user">
					<div className="comment__user__pic">
						<img src={DEFAULT_USER_PIC[1]} />
					</div>
				</div>

				<div className="comment__right">
					<div className="comment__right__top">
						<div className="comment__right__top__name f_h2">{comment.userName}</div>
						<div className="comment__right__top__time f_normal">{moment.duration(moment().diff(time)).humanize() + " ago"}</div>
					</div>

					<div className="comment__text f_normal">{comment.comment}</div>

					<div className="comment__bottom">
						<div className="comment__stats">

							<div className="comment__stats__likes">
								<div className="comment__stats__icon">
									<IconButton
										parent={this}
										status={reaction == 2 ? 5 : 0}
										config={{
											icon: "dislike",
											class: "iconBtn",
											action: () => { this.reactToComment(2); }
										}}
									/>
								</div>
								<div className="comment__stats__values f_normal">{this.state.stats.dislikes}</div>
							</div>


							<div className="comment__stats__likes">
								<div className="comment__stats__icon">
									<IconButton
										parent={this}
										status={reaction == 1 ? 6 : 0}
										config={{
											icon: "like",
											class: "iconBtn",
											action: () => { this.reactToComment(1); }
										}}
									/>
								</div>
								<div className="comment__stats__values f_normal">{this.state.stats.likes}</div>
							</div>


						</div>
					</div>

				</div>
			</div>
		);
	}
}

Comment.propTypes = {
	main: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired
};

export default Comment;
