import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as RepoActions from "../../../actions/repoActions";
import * as HelperActions from "../../../actions/helpers";

class DeleteFileConfirmationPopUp extends React.Component {
  componentDidUpdate(){
	if(this.props.popups.deleteFileConfirmationPopup){
		this.props.popupComponent.toggleContent();
		this.props.actions.helper.togglePopup("deleteFileConfirmationPopup");
	}
  }

  render() {
	  const { repo, actions } = this.props;

	  return (
		  <div className="deletePP">
			  <div className="deletePP__content">
				  <div className="deletePP__text f_text-center f_h1">
					  This file is currently being used. Are you sure you wish to delete the file?
				</div>
			  </div>

			  <div className="deletePP__buttons">
				  <div className="deletePP__buttons__button">
					  <div className="btn_1--danger f_button_2 f_text-capitalize"
						  onClick={this.props.popupComponent.toggleContent}>Cancel</div>
				  </div>

				  <div className="deletePP__buttons__button">
					  <div className="btn_1--success f_button_2 f_text-capitalize"
						  onClick={() => {
							  actions.repo.deleteFileInRepo(
								  repo.fileInFocus.id,
								  true,
								  () => {
									this.props.popupComponent.toggleContent();
								  }
							  );
						  }}>Confirm</div>
				  </div>
			  </div>
		  </div>
	  );
  }
}


DeleteFileConfirmationPopUp.propTypes = {
	actions: PropTypes.object.isRequired,
	repo: PropTypes.object.isRequired,
	popups: PropTypes.object.isRequired,
	popupComponent: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
		repo: state.repoReducer,
		popups: state.popupReducer
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:{
			repo: bindActionCreators(RepoActions, dispatch),
			helper: bindActionCreators(HelperActions, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFileConfirmationPopUp);
