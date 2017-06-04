import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import * as pagingCreators from '../../actions/paginator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
        return {
            actual_page: state.paginator.actual_page
        };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(pagingCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class NextButton extends Component {
    render(){
        return (
            <FlatButton
                label="Seg"
                primary={true}
                icon={<FontIcon className="material-icons">navigate_next</FontIcon>}
                labelPosition="before"
                onTouchTap={() => this.props.setActualPage(this.props.actual_page + 1)}
            />
        )
    }
}