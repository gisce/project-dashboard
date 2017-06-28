import React, { Component } from 'react';
import MainPaper from './MainPaper';
import { TOKEN } from '../constants/index';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskWorkCreators from '../actions/task_work';
import * as tasksCreators from '../actions/tasks';
import * as uiCreators from '../actions/ui';
import * as searchCreators from '../actions/search';
import LoadingIndicator from './LoadingIndicator';
import LinkButton from './LinkButton';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';
import Breadcrumb from './Breadcrumb';
import Many2One from './Many2One';
import {sleep} from '../utils/misc';

function mapStateToProps(state) {
    let taskWorks = null;
    if(state.taskWorks.data){
        taskWorks = state.taskWorks.data.taskWorks
    }
    return {
        taskWorks: taskWorks,
        tasks: state.tasks.data,
        users: state.users,
        active_task: state.tasks.active_task,
        editing_tasks: state.ui.editing,
        loaded: state.taskWorks.loaded,
        isFetching: state.taskWorks.isFetching,
        message_text: state.taskWorks.message_text,
        breadcrumb: state.breadcrumb.breadcrumb_data
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, tasksCreators, taskWorkCreators, uiCreators, searchCreators), dispatch);
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
        fields = {};
    }

    componentDidMount() {
        this.fetchData(true);
    }

    fetchData(initial = true) {
        // if(!this.props.active_task){
            let task_id = this.props.params.taskId;
            this.props.fetchTaskWorks(TOKEN, task_id, true, false);
        // }
        // else{
        //     this.props.fetchTaskWorks(TOKEN, this.props.active_task.id, false, false);
        // }
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
        this.props.patchTaskWork(TOKEN, id, body);
        sleep(1000);
        //Fetch data again to make changes visible
        this.fetchData(false);
    }

    handleDelete(id){
        this.props.deleteTaskWork(TOKEN, id);
        sleep(1000);
        //Fetch data again to make changes visible
        this.fetchData(false);
        this.props.openToastRequest("Workdone eliminat");
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
            "Data": ["date", {width: "130px"}],
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
                                    <LinkButton
                                        icon="note_add"
                                        label="Nou"
                                        route={uri}
                                    />
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