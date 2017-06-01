import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import {grey700} from 'material-ui/styles/colors';

export default class Filter extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="chip">
                <TextField
                    hintText={this.props.field}
                    floatingLabelText={this.props.field}
                />
                <FontIcon onClick={() => this.props.removeFilter()} color={grey700} className="material-icons chipButton">cancel</FontIcon>
            </div>
        )
    }
}