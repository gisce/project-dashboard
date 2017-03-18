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
        const {
            task,
            ...otherProps} = this.props;
        return(
            <TableRow {...otherProps} onCellClick={this.onClick}>
                <TableRowColumn>
                    <Avatar
                        src={task.avatar}
                        size={30}
                        style={style}
                    />
                </TableRowColumn>
                <TableRowColumn>{task.description}</TableRowColumn>
                <TableRowColumn>{task.partner}</TableRowColumn>
                <TableRowColumn>{task.priority}</TableRowColumn>
                <TableRowColumn>{task.status}</TableRowColumn>
            </TableRow>
        )
    }

    onClick() {
        console.log(JSON.stringify(this.props.task));
    }
}