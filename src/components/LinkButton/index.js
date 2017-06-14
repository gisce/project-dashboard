import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export default class LinkButton extends Component {
    render(){
        return (
            <FlatButton
                label={this.props.label}
                primary={!this.props.primary}
                icon={<FontIcon className="material-icons">{this.props.icon}</FontIcon>}
                onTouchTap={() => {
                        if(this.props.clickFunction){
                            this.props.clickFunction();
                        }
                        if (this.props.route) {
                            browserHistory.push(this.props.route)
                        }
                    }
                }
            />
        )
    }
}