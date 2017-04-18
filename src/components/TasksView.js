import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import MainView from './MainView'
import List from './List'
import Task from './Task'

function mapStateToProps(state) {
    return {
        data: state.tasks,
        token: null,
        loaded: state.tasks.loaded,
        isFetching: state.tasks.isFetching,
        message_text: state.tasks.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

let project = "";

@connect(mapStateToProps, mapDispatchToProps)
export default class TasksView extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_text: null
        };
    }

    render() {
        let tasks_ids = [];
        if(this.props.data.data){
            tasks_ids = this.props.data.data.original_ids;
            if(this.props.data.data.tasks.length > 0){
                project = this.props.data.data.tasks[0].project;
            }
        }
        let tableContents = "No hi ha tasques per mostrar.";
        let cols = [
            "Avatar",
            "Descripció",
            "Responsable",
            "Prioritat",
            "Estat"
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
                breadcrumb={project}
                table={<List columns={cols} tableBody={tableContents}/>}
            />
        )
    }
}