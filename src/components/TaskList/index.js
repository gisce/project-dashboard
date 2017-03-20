import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableFooter } from 'material-ui/Table'
import Task from '../Task'

export default class TaskList extends Component {
    render(){
        return(
            <Table>
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
                            task={task}
                        />
                    )}
                </TableBody>
                <TableFooter/>
            </Table>
        )
    }
}