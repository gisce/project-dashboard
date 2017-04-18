import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/task_work';
import MainView from './MainView'
import List from './List'
import TaskWork from './TaskWork'

function mapStateToProps(state) {
    let task = null;
    if(state.tasks.data) {
        let tasks = state.tasks.data.tasks;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == state.tasks.active_task_id) {
                task = tasks[i]
            }
        }
    }
    return {
        taskWorks: state.taskWorks,
        task: task,
        token: null,
        loaded: state.taskWorks.loaded,
        isFetching: state.taskWorks.isFetching,
        message_text: state.taskWorks.message_text,
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
    render() {
        let project = '';
        let title = 'Tasca';
        let continguts = [];
        let cols = [
            "Data",
            "Realitzar per",
            "Temps dedicat",
            "Resum del treball",
            ""
        ];
        let tableContents = "No s'ha seleccionat cap tasca.";
        if(this.props.task) {
            project = this.props.task.project;
            title = this.props.task.description;
            let workdones = this.props.taskWorks.data.taskWorks;
            tableContents = workdones.map(task =>
                <TaskWork
                    key={task.id}
                    taskWork={task}
                    handleOpen={this.handleOpen}
                    handleEdit={this.editTaskWork}
                />
            );
            continguts.push(
                <div>
                    <TextField
                        disabled={true}
                        defaultValue={this.props.task.estimated_hours}
                        floatingLabelText="Hores estimades"
                    />
                    <TextField style={{paddingLeft: 10}}
                        disabled={true}
                        defaultValue={this.props.task.dedicated_hours}
                        floatingLabelText="Hores dedicades"
                    />
                </div>
            );
        }
        return(
            <MainView
                title={title}
                breadcrumb={project}
                contents={continguts}
                table={<List columns={cols} tableBody={tableContents}/>}
            />
        )
    }
}