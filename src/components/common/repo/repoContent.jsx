import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import RepoFolder from "./repoFolder";
import RepoFile from "./repoFile";


function RepoContent(props) {
	return (
		<div className="repo__content SB">
			{
				props.repo.folders.map((item, i) => {
					return <RepoFolder folder={item} key={i} />;
				})
			}
			{
				props.repo.files.map((item, i) => {
					return <RepoFile file={item} key={i} />;
				})
			}
		</div>
	);
}

RepoContent.propTypes = {
	repo: PropTypes.object.isRequired
};

function mapStateToProps(state){
	return {
		repo: state.repoReducer.repo
	};
}

export default connect(mapStateToProps)(RepoContent);