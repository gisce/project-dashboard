import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableFooter } from 'material-ui/Table'
import Task from '../Task'

export default class TaskList extends Component {
    render(){
        return(
            <Table>
                /*'id', 'description', 'project', 'user', 'estimated_hours', 'dedicated_hours', 'priority', 'state'*/
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Avatar</TableHeaderColumn>
                        <TableHeaderColumn>Descripció</TableHeaderColumn>
                        <TableHeaderColumn>Responsable</TableHeaderColumn>
                        <TableHeaderColumn>Prioritat</TableHeaderColumn>
                        <TableHeaderColumn>Estat</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody showRowHover={true} displayRowCheckbox={false} stripedRows={true}>
                    {this.props.tasks.map(task =>
                        <Task
                            key={task.id}
                            task_id={task.id}
                            description={task.description}
                            partner={task.partner}
                            status={task.status}
                            avatar={task.avatar}
                            priority = {task.priority}
                        />
                    )}
                </TableBody>
                <TableFooter/>
            </Table>
        )
    }
}