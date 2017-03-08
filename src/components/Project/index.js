import React, { Component } from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar'

const style = {margin: 5};

export default class Project extends Component {

    render(){
        const {avatar, title, partner, state, ...otherProps} = this.props;
        return(
            <TableRow {...otherProps}>
                <TableRowColumn>
                    <Avatar
                        src={avatar}
                        size={30}
                        style={style}
                    />
                </TableRowColumn>
                <TableRowColumn>{title}</TableRowColumn>
                <TableRowColumn>{partner}</TableRowColumn>
                <TableRowColumn>{state}</TableRowColumn>
            </TableRow>
        )
    }
}