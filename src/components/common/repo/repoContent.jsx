import React, { Component } from "react";
import RepoFolder from "./repoFolder";
import RepoFile from "./repoFile";

class RepoContent extends Component {
	render() {
		var repo = this.props.main;
		return (
			<div className="repo__content SB">
				{repo.state.folders.map((item, i) => {
					return <RepoFolder folder={item} key={i} index={item._id} main={repo} />;
				})}
				{repo.state.files.map((item, i) => {
					return <RepoFile file={item} key={i} index={item._id} main={repo} />;
				})}
			</div>
		);
	}
}

export default RepoContent;