import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import * as uiCreators from '../../actions/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';

function mapStateToProps(state) {
    return {
        dialog_open: state.ui.dialog_open,
        dialog_title: state.ui.dialog_title,
        dialog_message: state.ui.dialog_message
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(uiCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Alert extends Component {
    constructor(props){
        super(props);
        this.handleDialog = this.handleDialog.bind(this);
    }

    handleDialog(){
        if(this.props.dialog_open){
            this.props.closeDialogRequest();
        }
        else{
            this.props.openDialogRequest();
        }
    }

    render(){
        const actions = [
            <FlatButton
                label="D'acord"
                primary={true}
                onTouchTap={this.handleDialog}
            />,
        ];
        return (
            <Dialog
              actions={actions}
              title={this.props.dialog_title}
              modal={false}
              open={this.props.dialog_open}
              onRequestClose={this.handleDialog}
            >
                {this.props.dialog_message}
            </Dialog>
        )
    }
}