import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableFooter } from 'material-ui/Table'
import Project from '../Project'

export default class ProjectList extends Component {
    render(){
        return(
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Avatar</TableHeaderColumn>
                        <TableHeaderColumn>Títol</TableHeaderColumn>
                        <TableHeaderColumn>Responsable</TableHeaderColumn>
                        <TableHeaderColumn>Estat</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody showRowHover={true} displayRowCheckbox={false}>
                    {this.props.projects.map(project =>
                        <Project
                            key={project.id}
                            title={project.title}
                            partner={project.partner}
                            state={project.state}
                            avatar={project.avatar}
                            tasks={project.tasks}
                        />
                    )}
                </TableBody>
                <TableFooter/>
            </Table>
        )
    }
}