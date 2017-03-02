import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Menu from '../Menu'

export class Header extends Component {
    render(){
        return(
            <header>
                <AppBar
                    title="Project-Dashboard"
                />
                <div>
                    <Menu/>
                </div>
            </header>
        )
    }
}