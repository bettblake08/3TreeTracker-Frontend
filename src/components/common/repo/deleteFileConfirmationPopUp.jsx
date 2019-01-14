import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as RepoActions from "../../../actions/repoActions";

class DeleteFileConfirmationPopUp extends Component {
	render() {
		return (
			<div className="deletePP">
				<div className="deletePP__content">
					<div className="deletePP__text f_text-center f_h1">This file is currently being used. Are you sure you wish to delete the file?</div>
				</div>

				<div className="deletePP__buttons">
					<div className="deletePP__buttons__button">
						<div className="btn_1--danger f_button_2 f_text-capitalize" 
							onClick={() => { 
								this.props.repo.mainComponent.toggleDeleteFileConfirmationPopUp(); 
							}}>Cancel</div>
					</div>

					<div className="deletePP__buttons__button">
						<div className="btn_1--success f_button_2 f_text-capitalize" onClick={()=>{
							this.props.repo.fileInFocus.deleteFileFromRepo(true);
							this.props.repo.mainComponent.toggleDeleteFileConfirmationPopUp();
						}}>Confirm</div>
					</div>

				</div>
			</div>
		);
	}
}

DeleteFileConfirmationPopUp.propTypes = {
	actions: PropTypes.object.isRequired,
	repo: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
		repo: state.repoReducer.repo
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:{
			repo: bindActionCreators(RepoActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFileConfirmationPopUp);
