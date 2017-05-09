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
    let taskWorks = null;
    if(state.taskWorks.data){
        taskWorks = state.taskWorks.data.taskWorks
    }
    return {
        taskWorks: taskWorks,
        tasks: state.tasks.data,
        active_task: state.tasks.active_task,
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

    componentDidMount() {
        this.fetchData(true);
    }

    fetchData(initial = true) {
        if(!this.props.active_task){
            let task_id = this.props.params.taskId;
            this.props.fetchTaskWorks(TOKEN, task_id, true, false);
        }
        else{
            this.props.fetchTaskWorks(TOKEN, this.props.active_task.id, false, false);
        }
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
        if(this.props.active_task && this.props.taskWorks) {
            project = this.props.active_task.project;
            title = this.props.active_task.description;
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
                            defaultValue={this.props.active_task.estimated_hours}
                            floatingLabelText="Hores estimades"
                        />
                        <TextField style={{paddingLeft: 10}}
                                   disabled={true}
                                   defaultValue={this.props.active_task.delay_hours}
                                   floatingLabelText="Retràs hores"
                        />
                    </div>
                    <div>
                        <TextField
                                   disabled={true}
                                   defaultValue={this.props.active_task.remaining_hours}
                                   floatingLabelText="Hores restants"
                        />
                        <TextField style={{paddingLeft: 10}}
                            disabled={true}
                            defaultValue={this.props.active_task.dedicated_hours}
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
                refresh={() => this.fetchData(false)}
                filters="disabled"
                table={<List columns={cols} tableBody={tableContents}/>}
            />
        )
    }
}