import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const style = {
    MainPaper: {
        height: '100%',
        width: '100%',
    },
    MainPaperContainer: {
        width: '100%'
    }
};

export default class MainPaper extends Component {
    render(){
        return (
            <div style={style.MainPaperContainer}>
                <Paper style={style.MainPaper} zDepth={2}>
                    {this.props.children}
                </Paper>
            </div>
        )
    }
}