import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/tasks';
import List from './List';
import Task from './Task';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import NewButton from './NewButton';
import FilterButton from './FilterButton';
import RefreshButton from './RefreshButton';

function mapStateToProps(state) {
    return {
        data: state.tasks,
        active_project: state.projects.active_project,
        projects: state.projects.data,
        loaded: state.tasks.loaded,
        isFetching: state.tasks.isFetching,
        message_text: state.tasks.message_text,
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

    componentDidMount() {
        this.fetchData(true);
    }

    fetchData(initial = true) {
        let filter = null;
        let projectId = true;
        if(this.props.params.projectId) {
            filter = "&filter=[('project_id','='," + this.props.params.projectId + ")]";
            projectId = this.props.params.projectId;
        }
        this.props.fetchTasks(TOKEN, filter, projectId, initial);
    }

    render() {
        let project = "";
        let tableContents = "No hi ha tasques per mostrar.";
        let cols = [
            "Avatar",
            "Descripció",
            "Responsable",
            "Prioritat",
            "Estat",
            "Workdones"
        ];
        if(this.props.loaded){
            let tasks = this.props.data.data.tasks;
            tableContents = tasks.map(task =>
                <Task
                    key={task.id}
                    task={task}
                />)
        }
        let filter = null;
        let active_project_id = null;
        if(this.props.active_project) {
            active_project_id = this.props.active_project.id;
            project = this.props.active_project.title;
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
                                <FilterButton/>
                                <RefreshButton
                                    refresh={() => this.fetchData(false)}
                                />
                            </div>
                        )
                    }
                    <div className="searchBox">
                        {
                            !this.props.isFetching &&
                            <SearchBox filter_id={active_project_id} model={"tasks"}/>
                        }
                    </div>
                </div>
                <div className="filters">
                </div>
                <div className="tableContainer" style={{paddingTop: 50 }}>
                    {
                        this.props.isFetching ?
                            <LoadingIndicator/>
                        :
                        <List columns={cols} tableBody={tableContents}/>
                    }
                </div>
            </div>
        )
    }
}