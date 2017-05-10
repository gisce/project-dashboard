import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export default class FilterButton extends Component {
    render(){
        return (
            <FlatButton
                label="Filtres"
                primary={true}
                icon={<FontIcon className="material-icons">filter_list</FontIcon>}
                onTouchTap={this.props.addFilter}
            />
        )
    }
}