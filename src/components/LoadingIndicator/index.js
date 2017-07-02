import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class LoadingIndicator extends Component {
    render(){
        return (
            <div className="loading">
                <CircularProgress size={this.props.size || 100} thickness={4}/>
            </div>
        )
    }
}