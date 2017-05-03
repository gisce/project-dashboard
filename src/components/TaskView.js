import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskWorkCreators from '../actions/task_work';
import * as tasksCreators from '../actions/tasks';
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
    let taskWorks = null;
    if(state.taskWorks.data){
        taskWorks = state.taskWorks.data.taskWorks
    }
    return {
        taskWorks: taskWorks,
        task: task,
        active_task_id: state.tasks.active_task_id,
        token: null,
        loaded: state.taskWorks.loaded,
        isFetching: state.taskWorks.isFetching,
        message_text: state.taskWorks.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, tasksCreators, taskWorkCreators), dispatch);
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
        if(this.props.task && this.props.taskWorks) {
            project = this.props.task.project;
            title = this.props.task.description;
            let workdones = this.props.taskWorks;
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
                    <div>
                        <TextField
                            disabled={true}
                            defaultValue={this.props.task.estimated_hours}
                            floatingLabelText="Hores estimades"
                        />
                        <TextField style={{paddingLeft: 10}}
                                   disabled={true}
                                   defaultValue={this.props.task.delay_hours}
                                   floatingLabelText="Retràs hores"
                        />
                    </div>
                    <div>
                        <TextField
                                   disabled={true}
                                   defaultValue={this.props.task.remaining_hours}
                                   floatingLabelText="Hores restants"
                        />
                        <TextField style={{paddingLeft: 10}}
                            disabled={true}
                            defaultValue={this.props.task.dedicated_hours}
                            floatingLabelText="Hores dedicades"
                        />
                    </div>
                </div>
            );
        }
        return(
            <MainView
                title={title}
                breadcrumb={project}
                contents={continguts}
                fetching={this.props.isFetching}
                refresh={() => {
                    let filter = "&filter=[('id','in'," + JSON.stringify(this.props.active_task_id).replace(/"/g, '') + ")]";
                    this.props.fetchTasks(TOKEN, this.props.active_task_id, filter, false);
                    this.props.fetchTaskWorks(TOKEN, this.props.active_task_id, false);
                    }
                }
                filters="disabled"
                table={<List columns={cols} tableBody={tableContents}/>}
            />
        )
    }
}