import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

const style = {
    appBar: {
        display: 'flex'

    }

};

export class Header extends Component {
    render(){
        return(
            <header>
                <AppBar style={style.appBar}
                    title="Project-Dashboard"
                />
            </header>
        )
    }
}