import React, { Component } from 'react';
import { redirectToRoute } from '../../utils/http_functions'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import LogoutIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/ui';

function mapStateToProps(state) {
    return {
    };
}

export class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>Breadcrumb</div>
        )
    }
}