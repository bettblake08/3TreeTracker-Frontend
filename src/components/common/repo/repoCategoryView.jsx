import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class RepoCategoryView extends Component {
	render() {
		const { repo } = this.props;

		const inActive = {	display: "none" };
		const active = {  display: "block" };

		const buttonClass = "repo__categoryView__head f_button_1 f_text-capitalize";

		return (
			<div className="repo__categoryView">
				<div className="repo__categoryView__menu">
					<div className="repo__categoryView__head btn_1--normal f_button_1 f_text-uppercase">All</div>
				</div>

				<div className="repo__categoryView__menu"
					style={repo.settings.selectionType == 0 ? inActive : active}>
					<div
						className={`${buttonClass} btn_1--success`}
						onClick={repo.mainComponent.repoFileSelected}
					>select</div>

					<div
						className={`${buttonClass} btn_1--warning`}
						onClick={repo.mainComponent.exitRepo}
					>cancel</div>
				</div>

			</div>
		);
	}
}

RepoCategoryView.propTypes = {
	repo: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
		repo: state.repoReducer
	};
}

export default connect(mapStateToProps)(RepoCategoryView);