import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as PlacementActions from "../actions/placementActions";

class Placement extends Component {
	render() {
		var placement = this.props.placement;
		var name = `${placement.name} ${placement.surname}`;

		return (
			<div className="tag">
				<div className="tag__cancel">
					<div 
						className="iconBtn--white"
						onClick={() => { 
							this.props.actions.placement.removeSelectedPlacement();
						}}>

						<svg className="icon">
							<use xlinkHref="#close" />
						</svg>
					</div>
				</div>
				<div className="tag__name f_normal">{name.toUpperCase()}</div>
			</div>
		);
	}
}


Placement.propTypes = {
	actions: PropTypes.object.isRequired,
	placement: PropTypes.object.isRequired
};

function mapStateToProps() {
	return {};
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
)(Placement);