import React, { Component } from "react";
import axios from "axios";
import ReactDOMServer from "react-dom/server";

import qq from "../../../plugins/fineUploader/fine-uploader";

class RepoFileUpload extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pending_upload_file: "",
			ajax: {
				uploadFiletoRepo: {
					attempts: 0,
					error: 0
				}
			}
		};

		this.setRepoFileUploadedName = this.setRepoFileUploadedName.bind(this);
		this.uploadFiletoRepo = this.uploadFiletoRepo.bind(this);
		this.qqTemplate = this.qqTemplate.bind(this);
		this.reloadAjaxRequest = this.reloadAjaxRequest.bind(this);
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
		var repo = this.props.values.repo;

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
				endpoint: repo.state.url.uploadFiletoRepo,
				params: {
					folderId: this.props.values.folderId
				}
			},
			validation: {
				allowedExtensions: ["jpg", "jpeg", "png", "doc", "docx", "xls", "pdf", "gif"],
				itemLimit: 10
			},
			enableTooltip: true,
			callbacks: {
				onComplete: function () {
					repo.retrieveRepoContent();
				}
			}
		});

		document.querySelector(".qq-trigger-upload").addEventListener("click", () => {
			uploader.uploadStoredFiles();
		});

		/* 
            $('.qq-trigger-upload').click(function (params) {
            uploader.uploadStoredFiles();
        }); */
	}

	setRepoFileUploadedName() {
		var fileName = document.querySelector("#repoUploadedFile").value;
		var state = this.state;
		state.pending_upload_file = fileName;
		this.setState(state);
	}

	reloadAjaxRequest(option) {
		var state = this.state;

		switch (option) {
		case 1: {

			if (state.ajax.uploadFiletoRepo.attempts < 10) {
				state.ajax.uploadFiletoRepo.attempts += 1;
				this.setState(state);
				this.uploadFiletoRepo();
			}
			else {
				state.ajax.uploadFiletoRepo.error = "Access to server failed. Try again Later! ";
				this.setState(state);
			}
			break;
		}
		}

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
		var state = this.props.values.repo;
		state.uploadFileDisplay = state.uploadFileDisplay ? false : true;
		this.props.values.repo.setState(state);
	}

	/* API */

	uploadFiletoRepo() {
		/* var formData = new FormData($('#repoFileUpload__form')[0]);
        var errorBox = $('.repoFileUpload__errorBox');
        var button = $('.repoFileUpload__button .btn_1'); */

		var formData = new FormData(document.getElementById("repoFileUpload__form")[0]);
		//var errorBox = document.querySelector('.repoFileUpload__errorBox');
		//var button = document.querySelector('.repoFileUpload__button .btn_1');

		var repo = this.props.values.repo;
		var component = this;
		var state = this.state;
		formData.append("folderId", this.props.values.folderId);

		axios({
			url: repo.state.url.uploadFileToRepo,
			method: "POST",
			data: formData
		}).then((response) => {
			var data = response.data;

			switch (data.error) {
			case 0: {
				component.toggleUploadFileDisplay();
				repo.retrieveRepoContent();
				break;
			}
			case 1: {
				break;
			}
			}

			state.ajax.uploadFiletoRepo.attempts = 0;
			component.setState(state);
		}).catch(() => {
			component.reloadAjaxRequest(1);
		});

	}

	/* API */


	render() {

		return (
			<div className={this.props.values.repo.state.uploadFileDisplay ? "repoFileUpload--active" : "repoFileUpload--disabled"} ref={el => (this.instance = el)}>
				<div className="repoFileUpload__main">

					<div id="uploader" ref={(u) => { this.uploader = u; }}>
						<div></div>
					</div>

				</div>
			</div>

		);
	}
}


export default RepoFileUpload;