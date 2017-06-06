import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export default class NewButton extends Component {
    render(){
        return (
            <FlatButton
                label="Nou"
                primary={true}
                icon={<FontIcon className="material-icons">note_add</FontIcon>}
                onTouchTap={() =>  browserHistory.push(this.props.route)}
            />
        )
    }
}