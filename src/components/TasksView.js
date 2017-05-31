import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tasksCreators from '../actions/tasks';
import * as searchCreators from '../actions/search';
import * as breadcrumbCreators from '../actions/breadcrumb';
import * as filterCreators from '../actions/filter';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import NewButton from './NewButton';
import FilterButton from './FilterButton';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';
import Breadcrumb from './Breadcrumb';
import Filter from './Filter';
import {initializeFilters} from '../utils/misc';

function mapStateToProps(state) {
    return {
        data: state.tasks,
        active_project: state.projects.active_project,
        projects: state.projects.data,
        loaded: state.tasks.loaded,
        isFetching: state.tasks.isFetching,
        message_text: state.tasks.message_text,
        breadcrumb: state.breadcrumb.breadcrumb_data,
        filters: state.filter.filters
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign(
        {},
        tasksCreators,
        searchCreators,
        breadcrumbCreators,
        filterCreators
    ), dispatch);
}

const cols = {
    "Avatar": "avatar",
    "Descripció": "description",
    "Responsable": "partner",
    "Prioritat": "priority",
    "Estat": "status"
};

let activeFilters = [];

@connect(mapStateToProps, mapDispatchToProps)
export default class TasksView extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_text: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.addFilter = this.addFilter.bind(this);
    }

    componentDidMount() {
        this.fetchData(true);
    }

    fetchData(initial = true) {
        let filter = [];
        let projectId = false;
        if(this.props.params.projectId) {
            projectId = this.props.params.projectId;
            filter.push(["project_id", "=", parseInt(projectId, 10)]);
        }
        this.props.fetchTasks(TOKEN, filter, projectId, initial);
        this.props.setFilters(initializeFilters(cols));
    }

    handleClick(element){
        this.props.setActiveTask(element);
        browserHistory.push("/tasks/" + element.id);
    }

    addFilter(key, value){
        let filters = this.props.filters;
        activeFilters.push(
            <Filter
                key={key}
                field={key}
                value={value[0]}
            />
        );
        delete filters[key];
        this.props.setFilters(initializeFilters(filters));
    }

    render() {
        let tasks = {};
        let newBreadcrumb = this.props.breadcrumb;
        if(this.props.loaded){
            tasks = this.props.data.data.tasks;
            if(this.props.active_project && newBreadcrumb.length == 0){
                const route = "/projects/" + this.props.active_project.id + "/tasks";
                newBreadcrumb.push(['Projectes', '/projects']);
                newBreadcrumb.push([this.props.active_project.title, route]);
            }
        }
        let active_project_id = null;
        if(this.props.active_project) {
            active_project_id = this.props.active_project.id;
        }
        return(
            <div>
                <div className="leftContainer">
                    {
                        !this.props.isFetching && (
                            <div>
                                <div className="title">
                                    Tasques
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
                                <FilterButton
                                    addFilter={this.addFilter}
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
                            />
                        }
                    </div>
                </div>
                <div className="filters">
                    {activeFilters}
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
            </div>
        )
    }
}