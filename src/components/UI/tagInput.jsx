import React, { Component } from "react";
import {API_URL} from "../../abstract/variables";
import axios from "axios";

class TagInput extends Component {
	constructor(props){
		super(props);

		this.state = {
			name: "",
			activeInput:false,
			lastTyped: Date.now(),
			suggestions:[]
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.toggleInput = this.toggleInput.bind(this);
		this.addTag = this.addTag.bind(this);
		this.selectTag = this.selectTag.bind(this);
	}

	toggleInput(){
		var state = this.state;
		state.activeInput = state.activeInput == true ? false : true;
		state.suggestions =[];
		state.name = "";
		this.setState(state);
	}

	handleNameChange(e){
		var c = this;
		var state = c.state;
		state.name = e.target.value;
		state.lastTyped = Date.now();
		c.setState(state);

		setTimeout(()=>{
			var last = c.state.lastTyped;

			if ((Date.now() - last)>=1000) {
				c.getTagSuggestions();
			}
		},1000);
	}

	addTag(){
		if(this.state.name == ""){  return; }

		var component = this;
		var url = API_URL + "admin/tag/" + this.state.name;
		var errorPopup = component.props.main.state.errorPopup;

		axios({
			url:url,
			method:"GET"
		}).then((response)=>{
			var data = response.data;
            
			switch (response.status) {
			case 201: {
				component.selectTag(data.content);
				component.toggleInput();
				break;
			}
			}

		}).catch((response) => {

			switch(response.response.status){
			case 403:{
				errorPopup.displayError("Tag already exists. Please select it in the Tag Sugeestions.");
				break;
			}
			default:{
				errorPopup.displayError("Error accessing server. Please try again later.");
				break;
			}
			}
		});

	}

	selectTag(item){
		var state = this.props.parent.state;

		var index = state.tags.findIndex((elem)=>{   
			return elem.id == item.id;
		});

		if(index >= 0){     return;     }

		state.tags.push(item);
		this.props.parent.setState(state);

		state = this.state;
		index = state.suggestions.findIndex((elem)=>{    
			return elem.id == item.id;
		});

		if(index >=0 ){
			state.suggestions.splice(index,1);
			this.setState(state);
		}
	}

	getTagSuggestions(){
		if(this.state.name == ""){  return; }

		var component = this;
		var url = `${API_URL}admin/tags/${this.state.name}`;
		var state = component.state;

		axios({
			url:url,
			method:"GET"
		}).then((response)=>{
			var data = response.data;

			switch (response.status) {
			case 200: {
				state.suggestions = data.content;
				component.setState(state);
				break;
			}
			}

		}).catch((response)=>{

			switch(response.response.status){
			default:{
				component.props.main.state.errorPopup.displayError("Error accessing server. Please try again later.");
			}
			}
		});

	}

	render() {
		var tags = this.props.parent.state.tags;

		return (
			<div className="tagInput">
				{
					tags.map((item, i) => {
						return (<Tag tag={item} parent={this.props.parent} key={i} index={i}/>);
					})
				}

				<div className={this.state.activeInput == true ? "tagInput__input--active" : "tagInput__input--disabled"}>
					<div className="tagInput__input__name">
						<input type="text" className="text_input_2 f_input_1" value={this.state.name} onChange={this.handleNameChange} />
					</div>

					<div className="tagInput__input__buttons">

						<div className="tagInput__input__add">
							<div className="iconBtn--normal" onClick={() => { this.toggleInput(); }}>
								<svg className="icon">
									<use xlinkHref="#add" />
								</svg>
							</div>
						</div>
                        
                       
						<div className="tagInput__input__cancel">
							<div className="iconBtn--normal" onClick={() => { this.toggleInput(); }}>
								<svg className="icon">
									<use xlinkHref="#back" />
								</svg>
							</div>
						</div>

						<div className="tagInput__input__confirm">
							<div className="iconBtn--normal" onClick={() => { this.addTag(); }}>
								<svg className="icon">
									<use xlinkHref="#check" />
								</svg>
							</div>
						</div>

					</div>

				</div>

				<div className="tagInput__suggestions">
					{
						this.state.suggestions.map((item, i) => {
							return (<div className="tagS f_normal" key={i} onClick={()=>{this.selectTag(item);}}>{"#" + item.name}</div>);
						})
					}
				</div>
			</div>
		);
	}
}


class Tag extends Component {
	constructor(props){
		super(props);

		this.removeTag = this.removeTag.bind(this);
	}

	removeTag(){
		var state = this.props.parent.state;
		state.tags.splice(this.props.index,1);
		this.props.parent.setState(state);
	}

	render() {
		var tag = this.props.tag;
		return (
			<div className="tag">
				<div className="tag__cancel">
					<div className="iconBtn--white" onClick={() => { this.removeTag(); }}>
						<svg className="icon">
							<use xlinkHref="#close" />
						</svg>
					</div>
				</div>
				<div className="tag__name f_normal">{ tag.name}</div>
			</div>    
		);
	}
}

export default TagInput;