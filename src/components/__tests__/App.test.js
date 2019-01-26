/* eslint-disable no-undef */
import React from "react";
import App from "../App";
import { shallow } from "enzyme";

describe("App: ",()=>{
	it("Renders without crashing", ()=>{
		shallow(<App />);
	});
});
