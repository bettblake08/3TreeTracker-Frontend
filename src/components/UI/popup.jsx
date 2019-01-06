import React, { Component } from "react";
import PropTypes from "prop-types";

class Popup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			toggleContent: false
		};

		this.setContent = this.setContent.bind(this);
		this.toggleContent = this.toggleContent.bind(this);
	}

	componentDidMount() {
		var state = this.props.parent.state;
		state.popups.push(this);
		this.props.parent.setState(state);
	}

	toggleContent() {
		this.setState({toggleContent: this.state.toggleContent ? false : true});
	}

	setContent() {
		if (this.state.toggleContent) {
			return this.props.component;
		}
	}

	render() {
		var style = this.props.style == undefined ? {} : this.props.style;
		var exit = this.props.exit != undefined ? this.props.exit : false;
        
		return (
			<div className={this.state.toggleContent == false ? "popUp--disabled" : "popUp--active"}>
				<div className="popUp__content SB" style={style}>
					<div className="popup__exit f_title"
						style={{ display: exit ? "block": "none" }}
						onClick={() => { this.toggleContent(); }}>&times;</div>
					{this.setContent()}
				</div>
			</div>
		);
	}
}

Popup.propTypes = {
	parent: PropTypes.object.isRequired,
	component: PropTypes.object.isRequired,
	exit: PropTypes.bool,
	style: PropTypes.object
};

export default Popup;