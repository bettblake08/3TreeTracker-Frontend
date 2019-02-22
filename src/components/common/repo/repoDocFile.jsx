import React, { Component } from "react";
import PropTypes from "prop-types";

class RepoDocFile extends Component {
	render() {
		const { repoFile } = this.props;
		const { selected, selectedClass } = repoFile.state;
		var file = repoFile.props.file;
		var icon = "";

		switch (file.type) {
		case "doc":
		case "docx": {
			icon = "doc";
			break;
		}
		case "pdf": {
			icon = "pdf";
			break;
		}
		case "xls": {
			icon = "xls";
			break;
		}
		default:
		}

		return (
			<div className={selected ? selectedClass.true : selectedClass.false}
				id={`fl-${file.id}`}>

				<div className="repoFile__front"
					onClick={repoFile.repoFileSelect}
				>
					<div className="repoFile__preview">
						<svg className="repoFile__icon icon">
							<use xlinkHref={`#${icon}`} />
						</svg>
					</div>

					<div className="repoFile__front__bottom">
						<div className="repoFile__name f_normal">{state.displayName}</div>
						<div className="repoFile__menuBtn" >
							<div className="iconBtn--white"
								onClick={repoFile.toggleFileView}
							>
								<svg className="icon">
									<use xlinkHref="#back" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div className="repoFile__back">
					<div className="repoFile__menu">

						<div className="repoFile__menu__option ">
							<a href={`${this.props.repoFile.state.dir}/${file.name}.${file.type}`}
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
								onClick={() => { this.props.repoFile.deleteFileFromRepo(false); }}>
								<svg className="icon">
									<use xlinkHref="#trash" />
								</svg>
							</div>

						</div>
					</div>

					<div className="repoFile__back__bottom" >
						<div className="repoFile__back__bottom__box" ></div>
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

RepoDocFile.propTypes = {
	repoFile: PropTypes.object.isRequired
};

export default RepoDocFile;