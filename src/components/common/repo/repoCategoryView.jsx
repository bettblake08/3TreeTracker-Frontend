import React, { Component } from "react";

class RepoCategoryView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var repo = this.props.main;
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

				<div className="repo__categoryView__menu" style={repo.state.selection_type == 0 ? inActive : active}>
					<div className="repo__categoryView__head btn_1--success f_button_1 f_text-capitalize" onClick={() => { repo.repoFileSelected(); }}>select</div>
					<div className="repo__categoryView__head btn_1--danger f_button_1 f_text-capitalize" onClick={() => { repo.exitRepo(); }} >cancel</div>
				</div>

			</div>
		);
	}
}

export default RepoCategoryView;