import React, { Component } from "react";
import{ WEB_URL, MAIN_LOGO, API_URL} from "../../abstract/variables";
import setSVGIcons from "../../abstract/icons";
import axios from "axios";
import Button from "../UI/button";

class AdminHeader extends Component {
	constructor(props){
		super(props);

		this.logout = this.logout.bind(this);

		this.state = {
			ajax:{
				retrieveData:{
					attempts:0,
					error:0
				}
			},
			seenCount:0,
			buttons:[]
		};
	}

	componentWillMount(){
		document.getElementById("svg_icons").innerHTML = setSVGIcons();
	}

	logout(){
		axios({
			url: `${API_URL}admin/logout`,
			method: "GET"
		}).then((response) => {
			if(response.status == 200){
				window.location.href = `${WEB_URL}admin/login`;
			}

		}).catch((response)=>{
			switch (response.status) {
			default: {
				setTimeout(() => {
					c.getProducts();
				}, 1000);
				break;
			}
			}
		});
	} 

	render() {
		var component = this;

		return (
			<div className="header--active " style={{ margin: 0, padding: 0 }}>
				<div className="header">
					<div className="header__left">
						<a href={`${WEB_URL}admin/home`}>
							<div className="header__logo">
								<img src={MAIN_LOGO} />
							</div>
						</a>
					</div>

					<div className="header__title f_banner_1 f_text-capitalize">Admin Platform</div>


					<div className="header__right">
						<div className="header__right__logOut">
							<Button
								parent={this}
								status={5}
								config={{
									text: "",
									label: "Log Out",
									type: "btn_1",
									action: this.logout
								}}
							/>
						</div>
					</div>

				</div>
			</div>
		);
	}
}


export default AdminHeader;