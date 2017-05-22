import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectCreators from '../actions/projects';
import * as searchCreators from '../actions/search';
import * as breadcrumbCreators from '../actions/breadcrumb';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import NewButton from './NewButton';
import FilterButton from './FilterButton';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';
import Breadcrumb from './Breadcrumb';

function mapStateToProps(state) {
    return {
        data: state.projects,
        loaded: state.projects.loaded,
        isFetching: state.projects.isFetching,
        message_text: state.projects.message_text,
        breadcrumb: state.breadcrumb.breadcrumb_data,
        active_company: state.companies.active_company
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, projectCreators, searchCreators, breadcrumbCreators), dispatch);
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
        let filter = "";
        let companyId = null;
        if(this.props.params.companyId) {
            companyId = this.props.params.companyId;
            filter = "&filter=[('partner_id','='," + this.props.params.companyId + ")]";
        }
        this.props.fetchProjects(TOKEN, filter, companyId, initial);
    }

    handleClick(element){
        const route = "/projects/" + element.id + "/tasks";
        this.props.setActiveProject(element.id);
        let newBreadcrumb = this.props.breadcrumb;
        newBreadcrumb.push(['Projectes', '/projects']);
        newBreadcrumb.push([element.title, route]);
        this.props.breadcrumbAdd(newBreadcrumb);
        browserHistory.push(route);
    }

    render() {
        const companyId = this.props.params.companyId;
        let projects = this.props.data.data;
        let newBreadcrumb = this.props.breadcrumb;
        const cols = {
            "Avatar": 'avatar',
            "Títol": 'title',
            "Responsable": 'partner',
            "Estat": 'status'
        };
        if(this.props.loaded && this.props.active_company && newBreadcrumb.length == 0){
            const route = "/companies/" + this.props.active_company.id + "/projects";
            newBreadcrumb.push(['Empreses', '/companies']);
            newBreadcrumb.push([this.props.active_company.name, route]);
        }
        return(
            <div>
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
                                filter_id={companyId}
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