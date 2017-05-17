import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskWorkCreators from '../actions/task_work';
import * as tasksCreators from '../actions/tasks';
import List from './List'
import TaskWork from './TaskWork'
import LoadingIndicator from './LoadingIndicator';
import NewButton from './NewButton';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';

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
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(element){
        console.log("Workdone clicat");
    }

    render() {
        let project = '';
        let title = 'Tasca';
        let workdones = {};
        let continguts = [];
        let cols = {
            "Data": "date",
            "Realitzar per": "user",
            "Temps dedicat": "hours",
            "Resum del treball": "work_summary",
            "": "extras",
        };
        if(this.props.active_task && this.props.taskWorks) {
            project = this.props.active_task.project;
            title = this.props.active_task.description;
            workdones = this.props.taskWorks;
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
            <div>
                <div className="leftContainer">
                    {
                        !this.props.isFetching && (
                            <div>
                                <div className="title">
                                    {title}
                                </div>
                                <div className="breadcrumb">
                                    {project}
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="rightContainer">
                    {
                        !this.props.isFetching && (
                            <div className="upperButtons">
                                <NewButton/>
                                <RefreshButton
                                    refresh={() => this.fetchData(false)}
                                />
                            </div>
                        )
                    }
                </div>
                <div className="contents">
                    {
                        !this.props.isFetching &&
                        continguts
                    }
                </div>
                <div className="tableContainer" style={{paddingTop: 20 }}>
                    {
                        this.props.isFetching || !this.props.loaded ?
                            <LoadingIndicator/>
                        :
                        <SmartTable
                            handleClick={this.handleClick}
                            columns={cols}
                            data={workdones}
                        />
                    }
                </div>
            </div>
        )
    }
}