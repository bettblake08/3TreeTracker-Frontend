// Set up your application entry point here...
/* eslint-disable import/default */

import React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import configureStore, {history} from "./redux/store/configureStore";
import Root from "./components/root";
import initialStoreState from "./redux/store/initialState";

require("./assets/favicon/favicon.ico");

export const store = configureStore(initialStoreState);

render( 
	<AppContainer>
		<Root store={store} history={history}/>
	</AppContainer>,
	document.getElementById("app")
);

if (module.hot) {
	module.hot.accept("./components/root", () => {
		const NewRoot = require("./components/root").default;
		render( 
			<AppContainer>
				<NewRoot store={store} history={history}/> 
			</AppContainer>,
			document.getElementById("app")
		);
	});
}
