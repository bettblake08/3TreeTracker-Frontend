import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from "prop-types";

import * as TagActions from "../../../redux/actions/tagActions"

class Tag extends Component {
    render() {
        const { actions, tag } = this.props;
        return (
            <div className="tag">
                <div className="tag__cancel">
                    <div className="iconBtn--white" onClick={() => { 
                        actions.tag.toggleSelectTag(tag);
                    }}>
                        <svg className="icon">
                            <use xlinkHref="#close" />
                        </svg>
                    </div>
                </div>
                <div className="tag__name f_normal">{tag.name}</div>
            </div>
        );
    }
}

Tag.propTypes = {
    actions: PropTypes.object.isRequired,
    tag: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    actions: {
        tag: bindActionCreators(TagActions, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(Tag)
