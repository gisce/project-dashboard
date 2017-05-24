import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as companiesCreators from '../actions/companies';
import * as searchCreators from '../actions/search';
import * as breadcrumbCreators from '../actions/breadcrumb';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import RefreshButton from './RefreshButton';
import NewButton from './NewButton';
import FilterButton from './FilterButton';
import SmartTable from './SmartTable';

function mapStateToProps(state) {
    return {
        data: state.companies,
        loaded: state.companies.loaded,
        isFetching: state.companies.isFetching,
        message_text: state.companies.message_text,
        breadcrumb: state.breadcrumb.breadcrumb_data
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, companiesCreators, searchCreators, breadcrumbCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CompaniesView extends Component {
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
        this.props.fetchCompanies(TOKEN, null, false, initial);
    }

    handleClick(element){
        this.props.setActiveCompany(element);
        const route = "/companies/" + element.id + "/projects";
        let newBreadcrumb = this.props.breadcrumb;
        newBreadcrumb.push(['Empreses', '/companies']);
        newBreadcrumb.push([element.name, route]);
        this.props.breadcrumbAdd(newBreadcrumb);
        browserHistory.push(route);
    }

    render() {
        let companies = {};
        let cols = {
            "Nom": "name",
            "Ciutat": "city",
            "País": "country"
        };
        if(this.props.loaded){
            companies = this.props.data.data.companies;
        }
        return(
            <div>
                <div className="leftContainer">
                    {
                        !this.props.isFetching && (
                            <div>
                                <div className="title">
                                    Empreses
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
                                    filterItems={cols}
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
                                searchFunction={this.props.searchCompanies}
                            />
                        }
                    </div>
                </div>
                <div className="tableContainer" style={{paddingTop: 50 }}>
                    {
                        !this.props.loaded || this.props.isFetching ?
                            <LoadingIndicator/>
                        :
                        <SmartTable
                            handleClick={this.handleClick}
                            handleUpdate={this.props.receiveCompanies}
                            columns={cols}
                            data={companies}
                        />
                    }
                </div>
            </div>
        )
    }
}