import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export default class NewButton extends Component {
    render(){
        return (
            <FlatButton
                label="Nou"
                primary={true}
                icon={<FontIcon className="material-icons">note_add</FontIcon>}
                onTouchTap={this.props.newItem}
            />
        )
    }
}