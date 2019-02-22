import React, { Component } from "react";
import PropTypes from "prop-types";

class RepoImageFile extends Component {
	render() {
		const { repoFile } = this.props;
		const { toggle, selected, selectedClass } = repoFile.state;

		var file = repoFile.props.file;
		var state = repoFile.state;

		const fileImage = {
			background: `url('${state.dir}${file.name}/thumb_150_150.jpg')`,
			backgroundSize: "cover",
			backgroundPosition: "center"
		};

		return (
			<div className={selected ? selectedClass.true : selectedClass.false}
				id={`fl-${file.id}`}>

				<div className={`repoFile__${toggle ? "back" : "front" }`}>
					<div className="repoFile__preview"
						style={fileImage}
						onClick={() => {
							repoFile.repoFileSelect();
						}}>
					</div>
					<div className="repoFile__front__bottom">
						<div className="repoFile__name f_normal">{state.displayName}</div>
						<div className="repoFile__menuBtn"
							onClick={repoFile.toggleFileView}>
							<div className="iconBtn--white">
								<svg className="icon">
									<use xlinkHref="#back" />
								</svg>
							</div>
						</div>
					</div>

				</div>

				<div className={`repoFile__${toggle ? "front" : "back"}`}>
					<div className="repoFile__menu">
						<div className="repoFile__menu__option">
							<a href={`${state.dir}${file.name}.${file.type}`}
								target="_blank"
								rel="noopener noreferrer"
							>

								<div className="iconBtn">
									<svg className="icon">
										<use xlinkHref="#view" />
									</svg>
								</div>

							</a>
						</div>

						<div className="repoFile__menu__option--delete ">
							<div className="iconBtn--danger"
								onClick={() => {
									repoFile.deleteFileFromRepo(false);
								}}>
								<svg className="icon">
									<use xlinkHref="#trash" />
								</svg>
							</div>

						</div>

					</div>
					<div className="repoFile__back__bottom" >
						<div className="repoFile__back__bottom__box" />
						<div className="repoFile__menuBtn icon_return">
							<div className="iconBtn--normal"
								onClick={repoFile.toggleFileView}>
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


RepoImageFile.propTypes = {
	repoFile: PropTypes.object.isRequired
};

export default RepoImageFile;