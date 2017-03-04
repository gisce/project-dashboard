import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableFooter } from 'material-ui/Table'
import Project from './Project'
import MainPaper from './MainPaper'
import MainMenu from './MainMenu'
import PowERP from '../api/PowERP.js'

function GetProjects() {
    /**
     * This function fetches all projects from PowERP server
     * using PowERP api.
     * */
    var api = new PowERP();
    let projects = [];
    let project_ids = api.search("project.project", []);
    for(let i = 0; i < project_ids.length; i++){
        let project = api.read("project.project", project_ids[i], ['id', 'title', 'subtitle', 'avatar', 'description']);
        projects.push(project);
    }
    return {
        "projects": projects
    }
}

const style = {
    paperStyle: {
        marginLeft: 180,
        marginRight: 0,
        width: '85%'
    },
    viewStyle: {
        height: '85%'
    },
    tableStyle: {
        height: '85%'
    }
};


export default class ProjectsView extends Component {
    render() {
        let bundle = [];
        let pr = GetProjects();
        let projects = pr.projects;
        for (let i = 0; i < projects.length; i++){
            bundle.push(
                <Project
                    key={i}
                    title={projects[i].title}
                    subtitle="Subtítol"
                    avatar="https://avatars2.githubusercontent.com/u/13195695?v=3&s=460"
                    description="Descripció"
                />
            )
        }
        return(
            <div style={style.viewStyle}>
                <div>
                    <MainMenu/>
                </div>
                <div style={style.paperStyle}>
                    <MainPaper>
                        <Table height={'92%'}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Avatar</TableHeaderColumn>
                                    <TableHeaderColumn>Títol</TableHeaderColumn>
                                    <TableHeaderColumn>Subtítol</TableHeaderColumn>
                                    <TableHeaderColumn>Descripció</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody stripedRows={true} showRowHover={true}>
                                {bundle}
                                {bundle}
                                {bundle}
                                {bundle}
                                {bundle}
                                {bundle}
                                {bundle}
                                {bundle}
                                {bundle}
                                {bundle}
                                {bundle}
                                {bundle}
                            </TableBody>
                            <TableFooter/>
                        </Table>
                    </MainPaper>
                </div>
            </div>
        )
    }
}