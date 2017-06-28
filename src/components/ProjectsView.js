import React, { Component } from 'react';
import MainPaper from './MainPaper';
import {browserHistory} from 'react-router';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectCreators from '../actions/projects';
import * as searchCreators from '../actions/search';
import * as breadcrumbCreators from '../actions/breadcrumb';
import * as filterCreators from '../actions/filter';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import LinkButton from './LinkButton';
import FilterButton from './FilterButton';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';
import Breadcrumb from './Breadcrumb';
import {initializeFilters} from '../utils/misc';

function mapStateToProps(state) {
    return {
        data: state.projects,
        loaded: state.projects.loaded,
        isFetching: state.projects.isFetching,
        message_text: state.projects.message_text,
        breadcrumb: state.breadcrumb.breadcrumb_data,
        active_company: state.companies.active_company,
        filters: state.filter
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign(
        {},
        projectCreators,
        searchCreators,
        breadcrumbCreators,
        filterCreators
    ), dispatch);
}

const cols = {
    "Avatar": ['avatar', {width: "50px"}],
    "Títol": ['name', {width: "300px"}],
    "Responsable": ['manager.name', {width: "80px"}],
    "Estat": ['state', {width: "80px"}]
};

let activeFilters = [];

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectsView extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_text: null
        };
        this.handleClick = this.handleClick.bind(this);
        activeFilters = [];
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(initial = true) {
        let filter = [];
        let companyId = null;
        if(this.props.params.companyId) {
            companyId = this.props.params.companyId;
            filter.push(["partner_id", "=", parseInt(this.props.params.companyId, 10)]);
        }
        this.props.fetchProjects(TOKEN, filter, companyId, initial);
        this.props.setFilters(initializeFilters(cols), [this.props.searchProjects, companyId]);
    }

    handleClick(element){
        const route = "/projects/" + element.id + "/tasks";
        this.props.setActiveProject(element.id);
        let newBreadcrumb = this.props.breadcrumb;
        newBreadcrumb.push(['Projectes', '/projects']);
        newBreadcrumb.push([element.name, route]);
        this.props.breadcrumbAdd(newBreadcrumb);
        browserHistory.push(route);
    }

    render() {
        const companyId = this.props.params.companyId;
        let projects = this.props.data.data;
        let newBreadcrumb = this.props.breadcrumb;
        if(this.props.loaded && this.props.active_company && newBreadcrumb.length == 0){
            const route = "/companies/" + this.props.active_company.id + "/projects";
            newBreadcrumb.push(['Empreses', '/companies']);
            newBreadcrumb.push([this.props.active_company.name, route]);
        }
        return(
            <div className="mainPaperContainer">
                <MainPaper>
                    <div className="leftContainer">
                        {
                            !this.props.isFetching && (
                                <div>
                                    <div className="title">
                                        Projectes
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
                                        route="projects/new"
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
                                    searchFunction={this.props.searchProjects}
                                    filter_id={companyId}
                                    field="name"
                                />
                            }
                        </div>
                    </div>
                    <div className="filters">
                        {activeFilters}
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
                                handleUpdate={this.props.receiveProjects}
                            />
                        }
                    </div>
                </MainPaper>
            </div>
        )
    }
}