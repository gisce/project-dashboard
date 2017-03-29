import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/ui';

function mapStateToProps(state) {
    return {
        menu_open: state.ui.menu_open
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const style = {
    appBar: {
        display: 'flex',
        width: "100%"
    }

};

@connect(mapStateToProps, mapDispatchToProps)
export class Header extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render(){
        return(
            <header>
                <AppBar onLeftIconButtonTouchTap={this.onClick} style={style.appBar}
                    title="Project-Dashboard"
                />
            </header>
        )
    }

    onClick() {
        if(this.props.menu_open){
            this.props.closeMenu();
        }
        else{
            this.props.openMenu();
        }
    }
}