import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import {Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableFooter } from 'material-ui/Table'
import Project from './Project'
import MainPaper from './MainPaper'
import MainMenu from './MainMenu'
import PowERP from '../api/PowERP.js'

// function GetProjects() {
//     /**
//      * This function fetches all projects from PowERP server
//      * using PowERP api.
//      * */
//     var api = new PowERP();
//     let projects = [];
//     let project_ids = api.search("project.project", []);
//     for(let i = 0; i < project_ids.length; i++){
//         let project = api.read("project.project", project_ids[i], ['id', 'title', 'subtitle', 'avatar', 'description']);
//         projects.push(project);
//     }
//     return {
//         "projects": projects
//     }
// }

function mapStateToProps(state) {
    return {
        data: state.projects,
        token: null,
        loaded: state.projects.loaded,
        isFetching: state.projects.isFetching,
        message_text: state.projects.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
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

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectsView extends Component {
    constructor(props){
        super(props)
        this.state = {
            message_text: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(initial = true) {
        const token = "FOO"
        // must replace by real token
        this.props.fetchProjects(token, initial);
    }

    render() {
        let bundle = [];
        // let pr = GetProjects();
        // let projects = pr.projects;
        if (this.props.loaded) {
            let projectes = JSON.parse(JSON.stringify(this.props.data.data));
            for (let i = 0; i < this.props.data.data.length; i++){
                bundle.push(
                    <Project
                        key={i}
                        title={projectes[i].title}
                        partner={projectes[i].partner}
                        avatar={projectes[i].avatar}
                        state={projectes[i].state}
                    />
                )
            }
        }
        return(
            <div style={style.viewStyle}>
                <div>
                    <MainMenu/>
                </div>
                <div style={style.paperStyle}>
                    <MainPaper>
                        {
                            this.props.loaded ?
                            <Table height={'92%'}>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Avatar</TableHeaderColumn>
                                        <TableHeaderColumn>Títol</TableHeaderColumn>
                                        <TableHeaderColumn>Responsable</TableHeaderColumn>
                                        <TableHeaderColumn>Estat</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody stripedRows={true} showRowHover={true}>
                                    {bundle}
                                </TableBody>
                                <TableFooter/>
                            </Table>
                        :
                                <div>
                                    No hi ha projectes per mostrar.
                                </div>
                        }
                    </MainPaper>
                </div>
            </div>
        )
    }
}