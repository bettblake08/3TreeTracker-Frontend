import React, { Component } from "react";

class RepoImageFile extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var file = this.props.repoFile.props.file;
		var state = this.props.repoFile.state;
		var fileId = this.props.repoFile.props.index;


		const fileImage = {
			background: `url('${state.dir}${file.name}/thumb_150_150.jpg')`,
			backgroundSize: "cover",
			backgroundPosition: "center"
		};

		const inActive = {
			display: "none"
		};

		const active = {
			display: "block"
		};


		return (
			<div className={state.selected ? state.selectedClass.true : state.selectedClass.false}
				id={"fl-" + fileId}
				style={!state.display ? inActive : active}
			>

				<div className={state.toggle ? "repoFile__back" : "repoFile__front"}>
					<div className="repoFile__preview" style={fileImage} onClick={() => { this.props.repoFile.repoFileSelect(); }}>
					</div>
					<div className="repoFile__front__bottom">
						<div className="repoFile__name f_normal">{state.displayName}</div>
						<div className="repoFile__menuBtn" onClick={() => { this.props.repoFile.toggleFileView(); }}>
							<div className="iconBtn--white">
								<svg className="icon">
									<use xlinkHref="#back" />
								</svg>
							</div>
						</div>
					</div>

				</div>

				<div className={state.toggle ? "repoFile__front" : "repoFile__back"}>
					<div className="repoFile__menu">
						<div className="repoFile__menu__option">
							<a href={`${state.dir}${file.name}.${file.type}`} target="_blank">

								<div className="iconBtn">
									<svg className="icon">
										<use xlinkHref="#view" />
									</svg>
								</div>

							</a>
						</div>

						<div className="repoFile__menu__option--delete ">
							<div className="iconBtn--danger" onClick={() => { this.props.repoFile.deleteFileFromRepo(false); }}>
								<svg className="icon">
									<use xlinkHref="#trash" />
								</svg>
							</div>

						</div>

					</div>
					<div className="repoFile__back__bottom" >
						<div className="repoFile__back__bottom__box" ></div>
						<div className="repoFile__menuBtn icon_return">
							<div className="iconBtn--normal" onClick={() => { this.props.repoFile.toggleFileView(); }}>
								<svg className="icon">
									<use xlinkHref="#back" />
								</svg>
							</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default RepoImageFile;