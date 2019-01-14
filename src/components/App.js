/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

import MainPlatform from "./main/index";
import AdminPlatform from "./admin/index";
import NotFoundPage from "./notFoundPage";
import setSVGIcons from "../abstract/icons";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
	componentDidMount(){
		document.getElementById("svg_icons").innerHTML = setSVGIcons();
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={MainPlatform} />
					<Route path="/admin" component={AdminPlatform}/>
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.element
};

export default hot(module)(App);
