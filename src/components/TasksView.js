import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/tasks';
import MainView from './MainView'
import List from './List'
import Task from './Task'

function mapStateToProps(state) {
    return {
        data: state.tasks,
        projects: state.projects.data,
        active_project: state.projects.active_project,
        token: null,
        loaded: state.tasks.loaded,
        isFetching: state.tasks.isFetching,
        message_text: state.tasks.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TasksView extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_text: null
        };
    }

    componentDidMount() {
        if(!this.props.isFetching) {
            this.props.fetchTasks(TOKEN, null, true);
        }
    }

    render() {
        let tasks_ids = [];
        let project = "";
        if(this.props.data.data){
            tasks_ids = this.props.data.data.original_ids;
        }
        if(this.props.active_project){
            project = this.props.active_project;
        }
        let tableContents = "No hi ha tasques per mostrar.";
        let cols = [
            "Avatar",
            "Descripció",
            "Responsable",
            "Prioritat",
            "Estat",
            "Workdones"
        ];
        if(this.props.loaded){
            let tasks = this.props.data.data.tasks;
            tableContents = tasks.map(task =>
                <Task
                    key={task.id}
                    task={task}
                />)
        }
        return(
            <MainView
                original_ids={tasks_ids}
                model="tasks"
                title="Tasques"
                fetching={this.props.isFetching}
                refresh={() => this.props.fetchTasks(TOKEN, JSON.stringify(tasks_ids), false)}
                breadcrumb={project}
                table={<List columns={cols} tableBody={tableContents}/>}
            />
        )
    }
}