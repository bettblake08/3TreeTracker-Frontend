import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import MainHeader from "../header/mainHeader";
import HomePage from "./homePage";

import "../../styles/scss/main.scss";

class MainPlatform extends Component {
	render() {
		return (
			<div>
				<div>
					<MainHeader />
				</div>
				<Switch>
					<Route exact path="/" component={HomePage} />
				</Switch>
			</div>
		);
	}
}

export default MainPlatform;
