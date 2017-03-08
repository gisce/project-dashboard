import React, { Component } from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar'

const style = {margin: 5};

export default class Project extends Component {
    render(){
        return(
            <TableRow key={this.props.key}>
                <TableRowColumn>
                    <Avatar
                        src={this.props.avatar}
                        size={30}
                        style={style}
                    />
                </TableRowColumn>
                <TableRowColumn>{this.props.title}</TableRowColumn>
                <TableRowColumn>{this.props.partner}</TableRowColumn>
                <TableRowColumn>{this.props.state}</TableRowColumn>
            </TableRow>
        )
    }
}