import React, { Component } from 'react';
import MainPaper from './MainPaper';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskWorkCreators from '../actions/task_work';
import * as tasksCreators from '../actions/tasks';
import * as uiCreators from '../actions/ui';
import * as searchCreators from '../actions/search';
import * as breadcrumbCreators from '../actions/breadcrumb';
import * as pagingCreators from '../actions/paginator';
import LoadingIndicator from './LoadingIndicator';
import LinkButton from './LinkButton';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';
import Breadcrumb from './Breadcrumb';
import Many2One from './Many2One';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

function mapStateToProps(state) {
    let taskWorks = null;
    if(state.taskWorks.data){
        taskWorks = state.taskWorks.data.taskWorks
    }
    return {
        token: state.auth.token,
        taskWorks: taskWorks,
        tasks: state.tasks.data,
        users: state.users,
        active_task: state.tasks.active_task,
        editing_tasks: state.ui.editing,
        loaded: state.taskWorks.loaded,
        isFetching: state.taskWorks.isFetching,
        message_text: state.taskWorks.message_text,
        breadcrumb: state.breadcrumb.breadcrumb_data,
        editing: state.tasks.editing
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        Object.assign(
            {}, tasksCreators, taskWorkCreators, uiCreators, searchCreators, breadcrumbCreators, pagingCreators
        ), dispatch);
}

let fields = {};

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
        this.handlePatch = this.handlePatch.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.editTaskName = this.editTaskName.bind(this);
        this.updateData = this.updateData.bind(this);
        this.handleOpenTask = this.handleOpenTask.bind(this);
        fields = {};
    }

    componentDidMount() {
        this.fetchData(true);
    }

    fetchData(initial = true) {
        let task_id = this.props.params.taskId;
        this.props.setActualPage(1);
        this.props.fetchTaskWorks(this.props.token, task_id, true, initial);
    }

    handleClick(element){
        //Nothing
    }

    handleEdit(element){
        let editing = this.props.editing_tasks;
        if(editing.indexOf(element.id) == -1){
            editing.push(element.id);
        }
        this.props.editItems(editing);
    }

    handlePatch(id, body){
        let editing = this.props.editing_tasks;
        const index = editing.indexOf(id);
        if (index > -1) {
            editing.splice(index, 1);
        }
        body["user_id"] = fields["user_id"];
        this.props.editItems(editing);
        this.props.patchTaskWork(this.props.token, id, body, this.fetchData);
    }

    handleDelete(id){
        this.props.deleteTaskWork(this.props.token, id, this.fetchData);
        this.props.openToastRequest("Workdone eliminat");
    }

    updateData(){
        this.props.breadcrumbClear();
        this.fetchData(false);
    }

    handleOpenTask(){
        this.props.openTask(this.props.token, this.props.params.taskId, this.fetchData);
        this.props.openToastRequest("La tasca s'ha obert correctament");
    }

    editTaskName(){
        if(!this.props.editing){
             this.props.editTask(true);
        }
        else{
            this.props.editTask(false);
            const body = {
                "name": fields["name"]
            };
            this.props.patchTask(this.props.token, this.props.active_task.id, body, this.updateData);
        }
    }

    updateFields(field, value){
        fields[field] = value;
    }

    render() {
        let title = 'Tasca';
        let many2ones = {};
        let workdones = {};
        let newBreadcrumb = this.props.breadcrumb;
        let continguts = [];
        let uri = "";
        const cols = {
            "Data": ["date", {width: "140px"}],
            "Realitzar per": ["user_id.name", {width: "100px"}],
            "Temps dedicat": ["hours", {width: "90px"}],
            "Resum del treball": ["name", {width: "200px"}],
            "": ["extras", {width: "100px", textAlign: "right"}],
        };
        many2ones["user_id.name"] = (
            <Many2One
                source={this.props.users.data}
                label={false}
                fieldName="user_id"
                updateFields={this.updateFields}
                searchFunction={this.props.searchUsers}
            />
        );
        if(this.props.params.taskId){
            uri = "/tasks/" + this.props.params.taskId + "/new";
        }
        if(this.props.active_task && this.props.taskWorks) {
            if(newBreadcrumb.length == 0){
                const route = "/projects/" + this.props.active_task['project_id.id'] + "/tasks";
                newBreadcrumb.push(['Projectes', '/projects']);
                newBreadcrumb.push([this.props.active_task['project_id.name'], route]);
            }
            title = this.props.active_task.name;
            workdones = this.props.taskWorks;
            continguts.push(
                <div key="1">
                    <div>
                        <TextField
                            disabled={true}
                            defaultValue={this.props.active_task.planned_hours}
                            floatingLabelText="Hores estimades"
                        />
                        <TextField
                            style={{paddingLeft: 10}}
                            disabled={true}
                            defaultValue={this.props.active_task.delay_hours}
                            floatingLabelText="Retard hores"
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
                            defaultValue={this.props.active_task.effective_hours}
                            floatingLabelText="Hores dedicades"
                        />
                    </div>
                </div>
            );
        }
        return(
            <div className="mainPaperContainer">
                <MainPaper>
                    <div className="leftContainer">
                        {
                            !this.props.isFetching && (
                                <div>
                                    <div className="title">
                                        {this.props.editing ?
                                            <TextField
                                                id={this.props.params.taskId}
                                                defaultValue={title}
                                                onChange={e => fields["name"] = e.target.value}
                                            />
                                            :
                                            title}
                                        {
                                            this.props.active_task && (
                                                <IconButton
                                                    style={{top: 3, left: 3}}
                                                    onTouchTap={this.editTaskName}
                                                >
                                                    <FontIcon
                                                      className="material-icons">
                                                        {
                                                            !this.props.editing ?
                                                                "mode_edit"
                                                                :
                                                                "save"
                                                        }
                                                    </FontIcon>
                                                </IconButton>
                                            )
                                        }
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
                                    {
                                        this.props.active_task && String(this.props.active_task.state).localeCompare("En progrés") === 0 ?
                                            <LinkButton
                                                icon="note_add"
                                                label="Nou"
                                                route={uri}
                                            />
                                        :
                                           <LinkButton
                                                icon="lock_open"
                                                label="Obrir tasca"
                                                clickFunction={this.handleOpenTask}
                                            />
                                    }
                                    <RefreshButton
                                        refresh={() => this.fetchData(false)}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className="contents">
                        {
                            (!this.props.isFetching) &&(
                                <div>
                                    <span>Estat de la tasca: </span>
                                    {
                                        this.props.active_task && (
                                            this.props.active_task.state
                                        )
                                    }
                                    {continguts}
                                </div>
                            )
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
                                handleUpdate={this.props.receiveTaskWork}
                                handlePatch={this.handlePatch}
                                columns={cols}
                                many2ones={many2ones}
                                data={workdones}
                            />
                        }
                    </div>
                </MainPaper>
            </div>
        )
    }
}