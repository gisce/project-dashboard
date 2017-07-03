import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import {grey700} from 'material-ui/styles/colors';
import SearchBox from '../SearchBox';

export default class Filter extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="chip">
                <SearchBox
                    label={this.props.field}
                    searchFunction={this.props.searchFunction[0]}
                    filter_id={this.props.searchFunction[1]}
                    field={this.props.value[0]}
                />
                <FontIcon onClick={() => this.props.removeFilter()} color={grey700} className="material-icons chipButton">cancel</FontIcon>
            </div>
        )
    }
}