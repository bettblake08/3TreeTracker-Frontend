import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SideBar extends Component {
	render() {
		let subMenuStyle = "navMenu__subMenu__hd f_tab_h1";
		return (
			<div id="adminSideBarMenu">
            
				<div className="navMenu">
					<div className="navMenu__subMenu">
						<NavLink to={"/admin/products"} className={subMenuStyle} activeClassName="active" id="hd1">Products</NavLink>
					</div>
                    
					<div className="navMenu__subMenu">
						<NavLink to={"/admin/accounts"} className={subMenuStyle} activeClassName="active" id="hd1">Accounts</NavLink>
					</div>

					<div className="navMenu__subMenu">
						<NavLink to={"/admin/repo"} className={subMenuStyle} activeClassName="active" id="hd1">Repository</NavLink>
					</div>


				</div>
			</div>
		);
	}
}

export default SideBar;