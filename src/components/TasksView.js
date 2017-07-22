import React, { Component } from 'react';
import MainPaper from './MainPaper';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tasksCreators from '../actions/tasks';
import * as projectCreators from '../actions/projects';
import * as searchCreators from '../actions/search';
import * as breadcrumbCreators from '../actions/breadcrumb';
import * as filterCreators from '../actions/filter';
import * as pagingCreators from '../actions/paginator';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import LinkButton from './LinkButton';
import FilterButton from './FilterButton';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';
import Breadcrumb from './Breadcrumb';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {initializeFilters} from '../utils/misc';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        data: state.tasks,
        active_project: state.projects.active_project,
        projects: state.projects.data,
        loaded: state.tasks.loaded,
        isFetching: state.tasks.isFetching,
        message_text: state.tasks.message_text,
        breadcrumb: state.breadcrumb.breadcrumb_data,
        filters: state.filter,
        editing: state.projects.editing,
        translated_states: state.tasks.translated_states
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign(
        {},
        tasksCreators,
        searchCreators,
        breadcrumbCreators,
        filterCreators,
        projectCreators,
        pagingCreators
    ), dispatch);
}

const cols = {
    "Avatar": ["avatar", {width: "50px"}],
    "Descripció": ["name", {width: "300px"}],
    "Responsable": ["user_id.name", {width: "80px"}],
    "Prioritat": ["priority", {width: "50px"}],
    "Estat": ["state", {width: "50px"}]
};

let activeFilters = [];
let fields = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class TasksView extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_text: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.editProjectName = this.editProjectName.bind(this);
        this.updateBreadcrumb = this.updateBreadcrumb.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    componentDidMount() {
        this.fetchData(true);
    }

    fetchData(initial = true, projectId = false) {
        let filter = [];
        if(this.props.params.projectId) {
            projectId = this.props.params.projectId;
            filter.push(["project_id", "=", parseInt(projectId, 10)]);
        }
        if(Object.keys(this.props.translated_states).length === 0){
            this.props.getTaskState(this.props.token);
        }
        this.props.setActualPage(1);
        this.props.fetchTasks(this.props.token, filter, projectId, initial);
        this.props.setFilters(initializeFilters(cols), [this.props.searchTasks, projectId]);
    }

    handleClick(element){
        this.props.setActiveTask(element);
        browserHistory.push("/tasks/" + element.id);
    }

    updateData(){
        this.props.breadcrumbClear();
        this.fetchData(true, this.props.active_project.id);
    }

    editProjectName(){
        if(!this.props.editing){
             this.props.editProject(true);
        }
        else{
            this.props.editProject(false);
            const body = {
                "name": fields["name"]
            };
            this.props.patchProject(this.props.token, this.props.active_project.id, body, this.updateData);
        }
    }

    updateBreadcrumb(){
        let newBreadcrumb = [];
        const route = "/projects/" + this.props.active_project.id + "/tasks";
        newBreadcrumb.push(['Projectes', '/projects']);
        newBreadcrumb.push([this.props.active_project.name, route]);
        return newBreadcrumb;
    }

    render() {
        let tasks = {};
        let newBreadcrumb = this.props.breadcrumb;
        if(this.props.loaded){
            tasks = this.props.data.data.tasks;
            for(let i = 0; i < tasks.length; i++){
                tasks[i]["state"] = this.props.translated_states[tasks[i]["state"]];
            }
            if(this.props.active_project && newBreadcrumb.length == 0){
                newBreadcrumb = this.updateBreadcrumb()
            }
        }
        let active_project_id = null;
        let taskName = "Tasques";
        if(this.props.active_project) {
            active_project_id = this.props.active_project.id;
            taskName = this.props.active_project.name;
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
                                                id={this.props.params.projectId}
                                                defaultValue={taskName}
                                                onChange={e => fields["name"] = e.target.value}
                                            />
                                            :
                                            taskName}
                                        {
                                            this.props.active_project && (
                                                <IconButton
                                                    style={{top: 3, left: 3}}
                                                    onTouchTap={this.editProjectName}
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
                                    <LinkButton
                                        icon="note_add"
                                        label="Nou"
                                        route="/tasks/new"
                                    />
                                    <FilterButton
                                        filters={this.props.filters}
                                        setter={this.props.setFilters}
                                        adder={this.props.addFilter}
                                        activeFilters={activeFilters}
                                    />
                                    <RefreshButton
                                        refresh={() => this.fetchData(false)}
                                    />
                                </div>
                            )
                        }
                        <div className="searchBox">
                            {
                                !this.props.isFetching &&
                                <SearchBox
                                    searchFunction={this.props.searchTasks}
                                    filter_id={active_project_id}
                                    field="name"
                                />
                            }
                        </div>
                    </div>
                    <div className="filters">
                        {activeFilters}
                    </div>
                    <div className="contents">
                        {
                            (!this.props.isFetching && this.props.active_project) &&
                            ('Tasques del projecte "' + taskName + '":')
                        }
                    </div>
                    <div className="tableContainer" style={{paddingTop: 50 }}>
                        {
                            this.props.isFetching || !this.props.loaded ?
                                <LoadingIndicator/>
                            :
                            <SmartTable
                                handleClick={this.handleClick}
                                columns={cols}
                                data={tasks}
                                handleUpdate={this.props.receiveTasks}
                            />
                        }
                    </div>
                </MainPaper>
            </div>
        )
    }
}