/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import {LADDER} from "../../../abstract/variables";
import PropTypes from "prop-types";
import Button from "../../UI/button";

class InfoView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			buttons: []
		};
	}

	render() {
		var parent = this.props.parent;

		return (
			<div className="infoView SB">
				<div className="infoView__content">
					<div className="infoView__1">
						<div className="infoView__1__title f_title f_text-center">Who are Longrich?</div>
						<div className="infoView__1__text f_h2 f_text-center">
                            Longrich Bioscience is a health and wellness company headquartered in China. The multi-level marketing company employs over 10,000 people and has thousands of distributors across its global body. The network marketing company is considered to be one of the largest and the most advanced centers for research and development of healthcare and cosmetics in China.
						</div>
					</div>


					<div className="infoView__2">
						<div className="infoBox">
							<div className="infoBox__icon">
								<svg className="icon">
									<use xlinkHref="#lock-2" />
								</svg>
							</div>
							<div className="infoBox__title f_h1 f_text-center">International</div>
							<div className="infoBox__text f_h2 f_text-center">Longrich holds a large market share and is a well-known brand in several countries, including the Philippines, United Arab Emirates, and regions in Africa and Indonesia.</div>
						</div>

						<div className="infoBox">
							<div className="infoBox__icon">
								<svg className="icon">
									<use xlinkHref="#business" />
								</svg>
							</div>
							<div className="infoBox__title f_h1 f_text-center">Accredited</div>
							<div className="infoBox__text f_h2 f_text-center">
								{"The company's skin care and health care products are distributed by well-known international companies such as Unilever, Glaxo Smith Kline, and Procter and Gamble."}
							</div>
						</div>

						<div className="infoBox">
							<div className="infoBox__icon">
								<svg className="icon">
									<use xlinkHref="#responsive-devices" />
								</svg>
							</div>
							<div className="infoBox__title f_h1 f_text-center">Variety</div>
							<div className="infoBox__text f_h2 f_text-center">Longrich Bioscience manufactures and distributes over 1000 products, including nutritional supplements, skin care products, cosmetics, and other household and personal care items.
							</div>
						</div>

					</div>



					<div className="infoView__3">
						<div className="infoView__3__title f_title f_text-center">
                            Register now to get started.</div>
						<div className="infoView__3__buttons">
							<div className="lview__button">
								<Button
									parent={this}
									status={0}
									config={{
										type: "btn_1",
										label: "Get Started",
										text: "",
										action: () => {
											parent.setView(4);
										}
									}}
								/>
							</div>
						</div>
					</div>



					<div className="infoView__1">
						<div className="infoView__1__title f_title f_text-center">
                            Membership Entry Levels
						</div>
						<div className="infoView__1__text f_h2 f_text-center">
                            Longrich pays advanced powerful compensation of 4 Bonuses and 3 Incentives to her distributors which offers great profitability; thereby eliminates the weaknesses and drawbacks of traditional network system and also propels Longrich distributors towards financial freedom.
						</div>
					</div>


					<div className="infoView__2">

						<div className="infoBox">
							<div className="infoBox__title f_h1 f_text-center">Platinum VIP</div>
							<div className="infoBox__list f_h2">
								<ul>
									<li>Qualify for 1280 PV</li>
									<li>12% performance bonus</li>
								</ul>
							</div>
							<div className="infoBox__text f_comment_1">
                                Note: Please note that the price may sligthly vary according to the products picked. Expect weekly bonus payments as well as no mandatory monthly payments. Below is the registration fee.
							</div>
							<div className="infoBox__price f_normal f_text-center">
                                Only <strong className="f_h1" >270000 KSH</strong>
							</div>
						</div>


						<div className="infoBox">
							<div className="infoBox__title f_h1 f_text-center">Platinum</div>
							<div className="infoBox__list f_h2">
								<ul>
									<li>Qualify for 720 PV</li>
									<li>12% performance bonus</li>
								</ul>
							</div>
							<div className="infoBox__text f_comment_1">
                                Note: Please note that the price may sligthly vary according to the products picked. Expect weekly bonus payments as well as no mandatory monthly payments. Below is the registration fee.
							</div>
							<div className="infoBox__price f_normal f_text-center">
                                Only <strong className="f_h1" >115000 KSH</strong>
							</div>
						</div>




						<div className="infoBox">
							<div className="infoBox__title f_h1 f_text-center">Gold</div>
							<div className="infoBox__list f_h2">
								<ul>
									<li>Qualify for 240 PV</li>
									<li>10% performance bonus</li>
								</ul>
							</div>
							<div className="infoBox__text f_comment_1">
                                Note: Please note that the price may sligthly vary according to the products picked. Expect weekly bonus payments as well as no mandatory monthly payments. Below is the registration fee.
							</div>
							<div className="infoBox__price f_normal f_text-center">
                                Only <strong className="f_h1" >35000 KSH</strong>
							</div>
						</div>

						<div className="infoBox">
							<div className="infoBox__title f_h1 f_text-center">Silver</div>
							<div className="infoBox__list f_h2">
								<ul>
									<li>Qualify for 120 PV</li>
									<li>8% performance bonus</li>
								</ul>
							</div>
							<div className="infoBox__text f_comment_1">
                                Note: Please note that the price may sligthly vary according to the products picked. Expect weekly bonus payments as well as no mandatory monthly payments. Below is the registration fee.
							</div>
							<div className="infoBox__price f_normal f_text-center">
                                Only <strong className="f_h1" >12000 KSH</strong>
							</div>
						</div>


						<div className="infoBox">
							<div className="infoBox__title f_h1 f_text-center">Q. Silver</div>
							<div className="infoBox__list f_h2">
								<ul>
									<li>Qualify for 60 PV</li>
									<li>8% performance bonus</li>
								</ul>
							</div>
							<div className="infoBox__text f_comment_1">
                                Note: Please note that the price may sligthly vary according to the products picked. Expect weekly bonus payments as well as no mandatory monthly payments. Below is the registration fee.
							</div>
							<div className="infoBox__price f_normal f_text-center">
                                Only <strong className="f_h1" >10000 KSH</strong>
							</div>
						</div>


					</div>


					<div className="infoView__1">
						<div className="infoView__1__title f_title f_text-center">
                            What to expect
						</div>
						<div className="infoView__1__text f_h2 f_text-center">
							<p>Maximum of 3 legs</p>
							<p>No time frame, No Pressure</p>
							<p>Grow at your own pace</p>
							<p>Leadership easily achievable</p>
							<p>Weekly bonus payment</p>
							<p>No mandatory monthly payments</p>
							<p>Unlimited accumulation of bonus points</p>
						</div>

						<div className="infoView__1__image">
							<img src={LADDER} alt="Membership Ladder" />
						</div>
					</div>


					<div className="infoView__3">
						<div className="infoView__3__title f_title f_text-center">
                            For more information.</div>
						<div className="infoView__3__buttons">
							<div className="lview__button">
								<a href="https://www.longrichkenya.org/about-us/" target="_blank" rel="noopener noreferrer">
									<button type="button" className={"btn_1--normal f_button_2"}>Link</button>
								</a>
							</div>
						</div>
					</div>

				</div>
			</div>
		);
	}
}

InfoView.propTypes = {
	parent: PropTypes.object.isRequired
};

export default InfoView;