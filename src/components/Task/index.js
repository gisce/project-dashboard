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
            task_id,
            avatar,
            description,
            project,
            partner,
            estimated_hours,
            dedicated_hours,
            priority,
            status,
            ...otherProps} = this.props;
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
                <TableRowColumn>{partner}</TableRowColumn>
                <TableRowColumn>{priority}</TableRowColumn>
                <TableRowColumn>{status}</TableRowColumn>
            </TableRow>
        )
    }

    onClick() {
        console.log(this.props.task_id);
    }
}