import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import LogoutIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiCreators from '../../actions/ui';
import * as projectCreators from '../../actions/projects';
import * as taskCreators from '../../actions/tasks';
import * as companyCreators from '../../actions/companies';
import * as breadcrumbCreators from '../../actions/breadcrumb';
import * as pagingCreators from '../../actions/paginator';

function mapStateToProps(state) {
    return {
        menu_open: state.ui.menu_open
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign(
        {}, uiCreators, projectCreators, taskCreators, companyCreators, breadcrumbCreators, pagingCreators
    ), dispatch);
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
        this.redirect = this.redirect.bind(this);
    }

    redirect(route){
        return () => {
            this.props.setActiveTask(null);
            this.props.setActiveProject(null);
            this.props.setActiveCompany(null);
            this.props.breadcrumbClear();
            this.props.setActualPage(1);
            browserHistory.push(route);
            this.handleSwipe();
        }
    }

    handleSwipe() {
        if(this.props.menu_open){
            this.props.closeMenu();
        }
        else{
            this.props.openMenu();
        }
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
                    <MenuItem primaryText="Projectes" onTouchTap={this.redirect("/projects")} leftIcon={<FontIcon className="material-icons">folder</FontIcon>} />
                    <MenuItem primaryText="Tasques" onTouchTap={this.redirect("/tasks")} leftIcon={<FontIcon className="material-icons">view_list</FontIcon>} />
                    <MenuItem primaryText="Usuaris" onTouchTap={this.redirect("/users")} leftIcon={<FontIcon className="material-icons">account_circle</FontIcon>} />
                    <MenuItem primaryText="Empreses" onTouchTap={this.redirect("/companies")} leftIcon={<FontIcon className="material-icons">business_center</FontIcon>} />
                    <MenuItem primaryText="Configuració" leftIcon={<FontIcon className="material-icons">settings</FontIcon>}/>
                </Drawer>
                <AppBar onLeftIconButtonTouchTap={this.handleSwipe} style={style.appBar}
                    title="Project-Dashboard"
                />
            </header>
        )
    }
}