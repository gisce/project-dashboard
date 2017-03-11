import React, { Component } from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar'

const style = {margin: 5};

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render(){
        const {avatar, description, project, partner, estimated_hours, dedicated_hours, priority, state, ...otherProps} = this.props;
        return(
            <TableRow {...otherProps} onCellClick={this.onClick}>
                <TableRowColumn>
                    <Avatar
                        src={avatar}
                        size={30}
                        style={style}
                    />
                </TableRowColumn>
                <TableRowColumn>{description}</TableRowColumn>
                <TableRowColumn>{project}</TableRowColumn>
                <TableRowColumn>{partner}</TableRowColumn>
                <TableRowColumn>{priority}</TableRowColumn>
                <TableRowColumn>{state}</TableRowColumn>
            </TableRow>
        )
    }

    onClick() {
        console.log("Tasca clicada");
    }
}