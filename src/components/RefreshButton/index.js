import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export default class RefreshButton extends Component {
    render(){
        return (
            <FlatButton
                label="Refrescar"
                primary={true}
                icon={<FontIcon className="material-icons">refresh</FontIcon>}
                onTouchTap={this.props.refresh}
            />
        )
    }
}