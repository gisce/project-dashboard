import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiCreators from '../../actions/ui';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

function mapStateToProps(state) {
    return {
        filter_menu_open: state.ui.filter_menu_open
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(uiCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class FilterButton extends Component {
    constructor(props) {
        super(props);
    }

    handleOpenMenu() {
        if(this.props.filter_menu_open){
            this.props.closeFilterButtonMenu();
        }
        else{
            this.props.openFilterButtonMenu();
        }
    }

    render(){
        const filterItems = this.props.filterItems;
        let items = [];
        for(var key in filterItems){
            if(String(key).toLowerCase() != 'avatar') {
                items.push(
                    <MenuItem
                        key={key}
                        primaryText={key}/>
                );
            }
        }
        return (
            <IconMenu
              iconButtonElement={
                  <FlatButton
                    label="Filtres"
                    primary={true}
                    icon={<FontIcon className="material-icons">filter_list</FontIcon>}
                    onTouchTap={() => this.handleOpenMenu()}
                />
              }
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              open={this.props.filter_menu_open}
              onRequestChange={() => this.handleOpenMenu()}
            >
                {items}
            </IconMenu>
        )
    }
}