import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import * as uiCreators from '../../actions/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
        return {
            toast_open: state.ui.toast_open,
            message: state.ui.toast_message
        };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(uiCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Toast extends Component {
    constructor(props){
        super(props);
        this.handleToast = this.handleToast.bind(this);
    }

    handleToast(){
        if(this.props.toast_open){
            this.props.closeToastRequest();
        }
        else{
            this.props.openToastRequest(this.props.message);
        }
    }

    render(){
        return (
            <Snackbar
              open={this.props.toast_open}
              message={this.props.message}
              autoHideDuration={4000}
              onRequestClose={this.handleToast}
            />
        )
    }
}