/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";

import HomePage from "./main/homePage";
import NotFoundPage from "./notFoundPage";
import MainHeader from "./Header/mainHeader";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
	render() {
		return (
			<div>
				<div>
					<MainHeader />
				</div>
				<Switch>
					<Route path="/" component={HomePage} />
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