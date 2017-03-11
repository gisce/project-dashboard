import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const style = {
    MainPaper: {
        width: '78%',
        float: 'left',
        marginLeft: 30,
        marginTop: 30
    },
};

export default class MainPaper extends Component {
    render(){
        return (
            <Paper style={style.MainPaper} zDepth={1}>
                {this.props.children}
            </Paper>
        )
    }
}