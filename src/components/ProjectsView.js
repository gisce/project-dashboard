import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectCreators from '../actions/projects';
import * as searchCreators from '../actions/search'
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import NewButton from './NewButton';
import FilterButton from './FilterButton';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';

function mapStateToProps(state) {
    return {
        data: state.projects,
        loaded: state.projects.loaded,
        isFetching: state.projects.isFetching,
        message_text: state.projects.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, projectCreators, searchCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectsView extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_text: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(initial = true) {
        this.props.fetchProjects(TOKEN, initial);
    }

    handleClick(element){
        this.props.setActiveProject(element.id);
        browserHistory.push("/projects/" + element.id + "/tasks");
    }

    render() {
        let projects = this.props.data.data;
        let cols = {
            "Avatar": 'avatar',
            "Títol": 'title',
            "Responsable": 'partner',
            "Estat": 'status'
        };
        return(
            <div>
                <div className="leftContainer">
                    {
                        !this.props.isFetching && (
                            <div>
                                <div className="title">
                                    Projectes
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
                            <SearchBox
                                searchFunction={this.props.searchProjects}
                            />
                        }
                    </div>
                </div>
                <div className="filters">
                </div>
                <div className="tableContainer" style={{paddingTop: 30 }}>
                    {
                        this.props.isFetching || !this.props.loaded ?
                            <LoadingIndicator/>
                        :
                        <SmartTable
                            handleClick={this.handleClick}
                            columns={cols}
                            data={projects}
                        />
                    }
                </div>
            </div>
        )
    }
}