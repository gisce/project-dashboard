import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/companies';
import Company from './Company'
import List from './List'
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import RefreshButton from './RefreshButton';

function mapStateToProps(state) {
    return {
        data: state.companies,
        loaded: state.companies.loaded,
        isFetching: state.companies.isFetching,
        message_text: state.companies.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CompaniesView extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_text: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(initial = true) {
        this.props.fetchCompanies(TOKEN, null, false, initial);
    }

    render() {
        let tableContents = "No hi ha empreses per mostrar.";
        let cols = [
            "Nom",
            "Ciutat",
            "País"
        ];
        if(this.props.loaded){
            let companies = this.props.data.data.companies;
            tableContents = companies.map(company =>
                <Company
                    key={company.id}
                    company={company}
                />)
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
                                <RefreshButton
                                    refresh={() => this.fetchData(false)}
                                />
                            </div>
                        )
                    }
                    <div className="searchBox">
                        {
                            !this.props.isFetching &&
                            <SearchBox filter_id={null} model={"companies"}/>
                        }
                    </div>
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