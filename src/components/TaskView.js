import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskWorkCreators from '../actions/task_work';
import * as tasksCreators from '../actions/tasks';
import LoadingIndicator from './LoadingIndicator';
import NewButton from './NewButton';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';
import Breadcrumb from './Breadcrumb';

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
        breadcrumb: state.breadcrumb.breadcrumb_data
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
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
        //Nothing
    }

    handleEdit(element){
        console.log("Editant workdone amb ID ", element.id);
    }

    handleDelete(element){
        console.log("Petició per esborrar workdone amb ID ", element.id);
    }

    render() {
        let title = 'Tasca';
        let workdones = {};
        let newBreadcrumb = this.props.breadcrumb;
        let continguts = [];
        const cols = {
            "Data": "date",
            "Realitzar per": "user",
            "Temps dedicat": "hours",
            "Resum del treball": "work_summary",
            "": "extras",
        };
        if(this.props.active_task && this.props.taskWorks) {
            if(newBreadcrumb.length == 0){
                const route = "/projects/" + this.props.active_task.project_id + "/tasks";
                newBreadcrumb.push(['Projectes', '/projects']);
                newBreadcrumb.push([this.props.active_task.project, route]);
            }
            title = this.props.active_task.description;
            workdones = this.props.taskWorks;
            continguts.push(
                <div key="1">
                    <div>
                        <TextField
                            disabled={true}
                            defaultValue={this.props.active_task.estimated_hours}
                            floatingLabelText="Hores estimades"
                        />
                        <TextField
                                   style={{paddingLeft: 10}}
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
                        <TextField
                            style={{paddingLeft: 10}}
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
                                    <Breadcrumb
                                        data={newBreadcrumb}
                                    />
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
                        this.props.isFetching || !this.props.active_task || !this.props.taskWorks ?
                            <LoadingIndicator/>
                        :
                        <SmartTable
                            handleClick={this.handleClick}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            columns={cols}
                            data={workdones}
                        />
                    }
                </div>
            </div>
        )
    }
}