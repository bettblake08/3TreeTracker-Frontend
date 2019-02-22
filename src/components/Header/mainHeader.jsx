import React, { Component } from "react";
import {Link} from "react-router-dom";
import { WEB_URL, MAIN_LOGO } from "../../abstract/variables";
import setSVGIcons from "../../abstract/icons";
import MenuType1 from "../UI/menuType1";

class MainHeader extends Component {
	constructor(props) {
		super(props);

		this.handleScroll = this.handleScroll.bind(this);
		this.togglePopupMenu = this.togglePopupMenu.bind(this);

		this.state = {
			toggleHeader: 0,
			togglePopupMenu: 0,
		};
	}

	componentDidMount() {
		document.getElementById("svg_icons").innerHTML = setSVGIcons();
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}

	handleScroll() {
		var offset = 2;
		var state = this.state;

		var scrollYpos = window.scrollY;

		if (scrollYpos > offset && state.toggleHeader == 0) {
			this.setState({ toggleHeader: 1 });
		}
		else if (scrollYpos < offset && state.toggleHeader == 1) {
			this.setState({ toggleHeader: 0 });
		}

	}

	togglePopupMenu(menu) {
		this.setState({ togglePopupMenu: this.state.togglePopupMenu === menu ? 0 : menu });
	}

	render() {
		var headerClass = `header header--${this.state.toggleHeader == 0 ? "normal" : "float"}`;
		var popupMenu = "popupMenu";

		var menuLinks = [
			[
				{
					url: WEB_URL + "login",
					text: "t-10"
				},
				{
					url: WEB_URL + "sign_up",
					text: "t-55"
				}
			]
		];

		return (
			<div className="main">
				<div className={headerClass}>
					<div className="row">
						<div className="header__left">
							<Link to="/">
								<div className="header__logo">
									<img src={MAIN_LOGO} />
								</div>
							</Link>
							<div className="header__title f_banner_1">Longrich</div>
						</div>

						<div className="header__right">
							<div className="header__right__menuBtn btn_icon--normal" onClick={() => { this.togglePopupMenu(1); }}>
								<svg className="icon">
									<use xlinkHref="#menu" />
								</svg>
							</div>

							<div className="header__right__text f_normal f_text-capitalize t-56"></div>


						</div>
					</div>

					<div className={this.state.togglePopupMenu == 1 ? popupMenu + "--active" : popupMenu + "--disabled"}>
						<div className="popupMenu__mainMenu">
							<MenuType1 menu={menuLinks} opposite={true} />
						</div>
					</div>

				</div>
			</div>
		);
	}
}

export default MainHeader;