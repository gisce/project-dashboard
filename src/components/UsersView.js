import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as usersCreators from '../actions/users';
import * as searchCreators from '../actions/search';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';

function mapStateToProps(state) {
    return {
        users: state.users,
        loaded: state.users.loaded,
        isFetching: state.users.isFetching,
        message_text: state.users.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, usersCreators, searchCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UsersView extends Component {
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
        this.props.fetchUsers(TOKEN, null, false, initial);
    }

    handleClick(element){
        browserHistory.push("/user/"+element.id)
    }

    render() {
        let users = {};
        let cols = {
            "Avatar": "avatar",
            "Nom": "name",
            "Usuari": "login",
            "Ultima connexió": "name"
        };
        if(this.props.loaded){
            users = this.props.users.data;
        }
        return(
            <div>
                <div className="leftContainer">
                    {
                        !this.props.isFetching && (
                            <div>
                                <div className="title">
                                    Usuaris
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
                            <SearchBox
                                searchFunction={this.props.searchUsers}
                                field="name"
                            />
                        }
                    </div>
                </div>
                <div className="tableContainer" style={{paddingTop: 50 }}>
                    {
                        this.props.isFetching || !this.props.loaded ?
                            <LoadingIndicator/>
                        :
                        <SmartTable
                            handleClick={this.handleClick}
                            handleUpdate={this.props.receiveUsers}
                            columns={cols}
                            data={users}
                        />
                    }
                </div>
            </div>
        )
    }
}