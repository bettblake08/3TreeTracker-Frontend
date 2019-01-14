import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SideBar extends Component {
	render() {
		let subMenuStyle = "navMenu__subMenu__hd f_tab_h1";

		return (
			<div id="adminSideBarMenu" className="admin">

				<div className="navMenu">
					<div className="navMenu__subMenu">
						<NavLink to={"/admin/products"} activeClassName="active">
							<div className={subMenuStyle}>Products</div>
						</NavLink>
					</div>
                    
					<div className="navMenu__subMenu">
						<NavLink to={"/admin/accounts"} activeClassName="active">
							<div className={subMenuStyle}>Accounts</div>
						</NavLink>
					</div>

					<div className="navMenu__subMenu">
						<NavLink to={"/admin/repo"} activeClassName="active">
							<div className={subMenuStyle}>Repository</div>
						</NavLink>
					</div>

				</div>
			</div>
		);
	}
}

export default SideBar;