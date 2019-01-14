import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class RepoCategoryView extends Component {
	render() {
		let repoMainComponent = this.props.main;
		const inActive = {
			display: "none"
		};

		const active = {
			display: "block"
		};

		return (
			<div className="repo__categoryView">
				<div className="repo__categoryView__menu">
					<div className="repo__categoryView__head btn_1--normal f_button_1 f_text-uppercase">All</div>
				</div>

				<div className="repo__categoryView__menu"
					style={this.props.repo.settings.selectionType == 0 ? inActive : active}>
					<div className="repo__categoryView__head btn_1--success f_button_1 f_text-capitalize" onClick={() => { repoMainComponent.repoFileSelected(); }}>select</div>
					<div className="repo__categoryView__head btn_1--danger f_button_1 f_text-capitalize" onClick={() => { repoMainComponent.exitRepo(); }} >cancel</div>
				</div>

			</div>
		);
	}
}

RepoCategoryView.propTypes = {
	main: PropTypes.object.isRequired,
	repo: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
		repo: state.repoReducer.repo
	};
}

export default connect(mapStateToProps)(RepoCategoryView);