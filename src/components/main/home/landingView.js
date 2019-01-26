import React, { Component } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import {LANDING_PAGE_BACKGROUND} from "../../../abstract/variables";
import Button from "../../UI/button";

class LandingView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttons: []
		};
	}

	render() {
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			autoPlaySpeed: 3000,
			slidesToShow: 1,
			slidesToScroll: 1,/* 
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow /> */
		};

		var parent = this.props.parent;

		return (
			<Slider {...settings}>
				<div>
					<div className="lview--1 lview">
						<div className="lview__background">
							<img src={LANDING_PAGE_BACKGROUND} alt="Home" />
						</div>

						<div className="lview__content">
							<div className="lview__title f_title f_text-center">Easiest way to manage longrich account</div>
							<div className="lview__body f_subtitle_1 f_text-center">
                                Register and see how simple it is to manage all your longrich users
							</div>
							<div className="lview__buttons">
								<div className="lview__button">
									<Button
										parent={this}
										status={0}
										config={{
											type: "btn_1",
											action: () => {
												parent.setView(4);
											},
											label: "Get Started"
										}}
									></Button>
								</div>
							</div>
						</div>

					</div>
				</div>

			</Slider>
		);
	}
}

LandingView.propTypes = {
	parent: PropTypes.object.isRequired
};

export default LandingView;