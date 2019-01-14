import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

import qq from "../../../../plugins/fineUploader/fine-uploader";
import {API_URL} from "../../../abstract/variables";
import * as RepoActions from "../../../actions/repoActions";

class RepoFileUpload extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pendingUploadFile: ""
		};

		this.setRepoFileUploadedName = this.setRepoFileUploadedName.bind(this);
		this.qqTemplate = this.qqTemplate.bind(this);
		this.toggleUploadFileDisplay = this.toggleUploadFileDisplay.bind(this);
	}

	componentDidMount() {
		const s = document.createElement("script");
		s.type = "text/template";
		s.id = "qq-template";
		s.async = false;
		s.innerHTML = ReactDOMServer.renderToString(this.qqTemplate());
		this.instance.appendChild(s);

		/*  console.log(s); */
	}

	componentDidUpdate() {
		document.getElementById("uploader").innerHTML = "";
		//$('#uploader').html("");

		var uploader = new qq.FineUploader({
			element: this.uploader,
			debug: true,
			chunking: {
				enabled: true,
				concurrent: {
					enabled: true
				},
				success: {
					endpoint: "uploadtoRepoCompleted"
				}
			},
			enableAuto: true,
			maxAutoAttempts: 10,
			autoUpload: false,
			request: {
				endpoint: `${API_URL}admin/uploadFiletoRepo/`,
				params: {
					folderId: this.props.repo.currentFolder.id
				}
			},
			validation: {
				allowedExtensions: ["jpg", "jpeg", "png", "doc", "docx", "xls", "pdf", "gif"],
				itemLimit: 10
			},
			enableTooltip: true,
			callbacks: {
				onComplete: function () {
					this.props.actions.repo.getRepoContent();
				}
			}
		});

		document.querySelector(".qq-trigger-upload").addEventListener("click", () => {
			uploader.uploadStoredFiles();
		});
		
	}

	setRepoFileUploadedName() {
		var fileName = document.querySelector("#repoUploadedFile").value;
		this.setState({ pendingUploadFile: fileName });
	}

	qqTemplate() {
		return (
			<div className="qq-uploader-selector qq-uploader qq-gallery" qq-drop-area-text="Drop files here">
				<div className="qq-total-progress-bar-container-selector qq-total-progress-bar-container">
					<div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" className="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>
				</div>

				<div className="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone="true">
					<span className="qq-upload-drop-area-f_text-selector"></span>
				</div>

				<div className="qq-upload-button-selector qq-upload-button ">
					<div className="btn_1 f_button_1">Select a file</div>
				</div>

				<div className="qq-trigger-upload">
					<div className="btn_1 f_button_1">Upload</div>
				</div>

				<span className="qq-drop-processing-selector qq-drop-processing">
					<span>Processing dropped files...</span>
					<span className="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>
				</span>

				<ul className="qq-upload-list-selector qq-upload-list" role="region" aria-live="polite" aria-relevant="additions removals">
					<li>
						<span role="status" className="qq-upload-status-f_text-selector qq-upload-status-text"></span>
						<div className="qq-progress-bar-container-selector qq-progress-bar-container">
							<div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" className="qq-progress-bar-selector qq-progress-bar"></div>
						</div>
						<span className="qq-upload-spinner-selector qq-upload-spinner"></span>
						<div className="qq-thumbnail-wrapper">
							<img className="qq-thumbnail-selector" qq-max-size="120" qq-server-scale="true" />
						</div>
						<button type="button" className="qq-upload-cancel-selector qq-upload-cancel">X</button>
						<button type="button" className="qq-upload-retry-selector qq-upload-retry">
							<span className="qq-btn qq-retry-icon" aria-label="Retry"></span>
                            Retry
						</button>

						<div className="qq-file-info">
							<div className="qq-file-name">
								<span className="qq-upload-file-selector qq-upload-file"></span>
								<span className="qq-edit-filename-icon-selector qq-btn qq-edit-filename-icon" aria-label="Edit filename"></span>
							</div>
							<input className="qq-edit-filename-selector qq-edit-filename" tabIndex="0" type="text" />
							<span className="qq-upload-size-selector qq-upload-size"></span>
							<button type="button" className="qq-btn qq-upload-delete-selector qq-upload-delete">
								<span className="qq-btn qq-delete-icon" aria-label="Delete"></span>
							</button>
							<button type="button" className="qq-btn qq-upload-pause-selector qq-upload-pause">
								<span className="qq-btn qq-pause-icon" aria-label="Pause"></span>
							</button>
							<button type="button" className="qq-btn qq-upload-continue-selector qq-upload-continue">
								<span className="qq-btn qq-continue-icon" aria-label="Continue"></span>
							</button>
						</div>
					</li>
				</ul>

				<dialog className="qq-alert-dialog-selector">
					<div className="qq-dialog-message-selector"></div>
					<div className="qq-dialog-buttons">
						<button type="button" className="qq-cancel-button-selector">Close</button>
					</div>
				</dialog>

				<dialog className="qq-confirm-dialog-selector">
					<div className="qq-dialog-message-selector"></div>
					<div className="qq-dialog-buttons">
						<button type="button" className="qq-cancel-button-selector">No</button>
						<button type="button" className="qq-ok-button-selector">Yes</button>
					</div>
				</dialog>

				<dialog className="qq-prompt-dialog-selector">
					<div className="qq-dialog-message-selector"></div>
					<input type="text" />
					<div className="qq-dialog-buttons">
						<button type="button" className="qq-cancel-button-selector">Cancel</button>
						<button type="button" className="qq-ok-button-selector">Ok</button>
					</div>
				</dialog>
			</div>
		);
	}

	toggleUploadFileDisplay() {
		var mainRepoComponent = this.props.main;
		mainRepoComponent.setState({uploadFileDisplay: !mainRepoComponent.state.uploadFileDisplay});
	}

	render() {

		return (
			<div className={`repoFileUpload--${this.props.repo.uploadFileDisplay ? "active" : "disabled"}`} ref={el => (this.instance = el)}>
				<div className="repoFileUpload__main">

					<div id="uploader" ref={(u) => { this.uploader = u; }}>
						<div></div>
					</div>

				</div>
			</div>

		);
	}
}

RepoFileUpload.propTypes = {
	actions: PropTypes.object.isRequired,
	repo: PropTypes.object.isRequired,
	main: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
		repo: state.repoReducer.repo
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions: {
			repo: bindActionCreators(RepoActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoFileUpload);
