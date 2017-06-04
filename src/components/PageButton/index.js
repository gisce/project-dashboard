import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import * as pagingCreators from '../../actions/paginator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
        return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(pagingCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PageButton extends Component {
    render(){
        return (
            <FlatButton
                label={this.props.number}
                primary={!this.props.selected}
                onTouchTap={() => this.props.setActualPage(this.props.number)}
            />
        )
    }
}