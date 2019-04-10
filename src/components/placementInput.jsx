import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as PlacementActions from "../redux/actions/placementActions";
import Placement from "./placement";

class PlacementInput extends Component {
	constructor(props){
		super(props);

		this.state = {
			name: "",
			activeInput:false,
			lastTyped: Date.now(),
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.toggleInput = this.toggleInput.bind(this);
		this.setSelectedPlacement = this.setSelectedPlacement.bind(this);
		this.getPlacementSuggestions = this.getPlacementSuggestions.bind(this);
	}

	toggleInput(){
		this.setState({ name: "", activeInput: !this.state.activeInput});
		this.props.actions.placement.resetPlacementSuggestions();
	}

	handleNameChange(e){
		this.setState({
			name: e.target.value,
			lastTyped: Date.now()
		});

		var component = this;

		setTimeout(()=>{
			var last = component.state.lastTyped;
			if ((Date.now() - last)>=1000) {
				component.getPlacementSuggestions();
			}
		},1000);
	}

	getPlacementSuggestions(){
		if(this.state.name == "") return;
		this.props.actions.placement.getPlacements(this.state.name);
	}

	setSelectedPlacement(){
		let selectedPlacement = this.props.placements.selected;
		if(selectedPlacement.id !== undefined){
			return (<Placement placement={selectedPlacement} />);
		}
	}

	render() {
		return (
			<div className="tagInput">
				{this.setSelectedPlacement()}
				<div className={`tagInput__input--${this.state.activeInput ? "active": "disabled"}`}>
					<div className="tagInput__input__name">
						<input 
							type="text"
							className="text_input_2 f_input_1"
							value={this.state.name}
							onChange={this.handleNameChange}
						/>
					</div>

					<div className="tagInput__input__buttons">

						<div className={`tagInput__input__${this.state.activeInput ? "cancel": "add"}`}>
							<div className="iconBtn--normal" onClick={() => { this.toggleInput(); }}>
								<svg className="icon">
									<use xlinkHref={`#${this.state.activeInput ? "back": "add"}`} />
								</svg>
							</div>
						</div>

					</div>

				</div>

				<div className="tagInput__suggestions">
					{
						this.props.placements.suggestions.map((item, i) => {
							return (
								<div className="tagS f_normal f_text-capitalize"
									key={i}
									onClick={() => {
										this.props.actions.placement.selectPlacement(item);
									}}>
									{`${item.name} ${item.surname} ${item.code}`}
								</div>);
						})
					}
				</div>
			</div>
		);
	}
}

PlacementInput.propTypes = {
	actions: PropTypes.object.isRequired,
	placements: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		placements: state.placementReducer.placements
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			placement: bindActionCreators(PlacementActions, dispatch)
		}
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlacementInput);