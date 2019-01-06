import React, { Component } from "react";
import axios from "axios";
import { API_URL} from "../../abstract/variables";
import ErrorPopup from "../UI/errorPopup";

class CommentingSystem extends Component {
	constructor(props){
		super(props);

		this.setCommentInput = this.setCommentInput.bind(this);
		this.reloadAjaxRequest = this.reloadAjaxRequest.bind(this);
		this.setComments = this.setComments.bind(this);
		this.getComments = this.getComments.bind(this);
		this.toggleViewAll = this.toggleViewAll.bind(this);
		this.clearComments = this.clearComments.bind(this);

		this.state = {
			errorPopup:{},
			preview: this.props.preview == undefined ? {state:false,count:0} : this.props.preview,
			userId:"",
			comments:{
				data: []
			},
			ajax: {
				getComments: {
					attempts: 0,
					error: ""
				}
			}
		};
	}

	componentDidMount(){
		var state = this.props.parent.state;
		state.commentingSystem = this;
		this.props.parent.setState(state);

		this.getComments();
	}

	clearComments(){
		var state = this.state;

		if (state.comments.data.length > 0 ){
			state.comments = {
				data: []
			};

			this.setState(state);
		}
	}

	setCommentInput(){
		return <CommentInput main={this} />;
	}

	setComments() {
		var comments = this.state.comments.data;
		var preview = this.state.preview;

		if (comments != [] || comments != null) {
			comments = comments.reverse();

			return (
				comments.map((item,i)=>{
					if(preview.state == true && preview.count <= i){   return;  }
					else{
						return <Comment key={i} comment={item} main={this} />;
					}
				})
			);
		}
		else {
			return <NoCommentPlaceholder />;
		}
	}

	reloadAjaxRequest(option) {
		var state = this.state;

		switch (option) {
		case 1: {

			if (state.ajax.getComments.attempts < 5) {
				state.ajax.getComments.attempts += 1;
				this.setState(state);
				this.getComments();
			}
			else {
				state.errorPopup.displayError("Access to server failed. Try again Later! ");
				state.ajax.getComments.attempts = 0;
				this.setState(state);
			}
			break;
		}
		}

	}

	getComments() {
		var component = this;
		var state = this.state;
		var url = API_URL;

		switch(this.props.commentingOn){
		case 1:{
			url += "comment/" + this.props.product.post.id;
			break;
		}
		}

		url += state.comments.data.length == 0 || state.comments.data == undefined ? "/1/0" : "/1/" + state.comments.data.length;

		axios({
			url:url,
			method:"GET"
		}).then((response)=>{
			var data = response.data;

			switch(response.status){
			case 200:{
				if (data.content != []) {
					state.comments.data = data.content.concat(state.comments.data);
					state.userId = data.userId;
					component.setState(state);
				}
				break;
			}
			}
            
		}).catch(() =>{
			component.reloadAjaxRequest(1);
		});

	}

	toggleViewAll(){
		var state = this.state;
		state.preview.state = state.preview.state == false ? true :false;
		this.setState(state);
	}

	setToggleViewAll(){
		var state = this.state;

		if(state.preview.count > 0 && state.comments.data.length > state.preview.count){
			var text = state.preview.state ? "View more ..." : "Collapse";
			return (<div className="commentSection__vMore f_normal" onClick={() => { this.toggleViewAll(); }}>{text}</div>);
		}
		else {
			return (<div></div>);
		}
        
	}

	render() {
		return (
			<div className="commentSection">
				<ErrorPopup parent={this}/>
				<div className="commentSection__title f_h1">{this.state.comments.data.length + " comments"}</div>
				{this.setCommentInput()}
				{this.setComments()}
				{this.setToggleViewAll()}
			</div>
		);
	}
}

export default CommentingSystem;
