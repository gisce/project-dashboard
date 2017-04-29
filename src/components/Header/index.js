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
        this.handleSwipe = this.handleSwipe.bind(this);
    }

    render(){
        return(
            <header>
                <Drawer
                    open={this.props.menu_open}
                    docked={false}
                    disableSwipeToOpen={false}
                    swipeAreaWidth={30}
                    onRequestChange={this.handleSwipe}
                >
                    <AppBar
                        title=""
                        onClick={this.handleSwipe}
                        iconElementLeft={<IconButton><LogoutIcon /></IconButton>}
                    />
                    <MenuItem primaryText="Timer" leftIcon={<FontIcon className="material-icons">watch_later</FontIcon>} />
                    <MenuItem primaryText="Dashboard" leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>} />
                    <MenuItem primaryText="Projectes" onTouchTap={redirectToRoute("/projects")} leftIcon={<FontIcon className="material-icons">folder</FontIcon>} />
                    <MenuItem primaryText="Tasques" onTouchTap={redirectToRoute("/tasks")} leftIcon={<FontIcon className="material-icons">view_list</FontIcon>} />
                    <MenuItem primaryText="Usuaris" onTouchTap={redirectToRoute("/users")} leftIcon={<FontIcon className="material-icons">account_circle</FontIcon>} />
                    <MenuItem primaryText="Empreses" leftIcon={<FontIcon className="material-icons">business_center</FontIcon>} />
                    <MenuItem primaryText="Configuració" leftIcon={<FontIcon className="material-icons">settings</FontIcon>}/>
                </Drawer>
                <AppBar onLeftIconButtonTouchTap={this.handleSwipe} style={style.appBar}
                    title="Project-Dashboard"
                />
            </header>
        )
    }

    handleSwipe() {
        if(this.props.menu_open){
            this.props.closeMenu();
        }
        else{
            this.props.openMenu();
        }
    }
}