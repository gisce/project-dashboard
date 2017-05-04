import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/users';
import User from './User'
import List from './List'
import MainView from './MainView'

function mapStateToProps(state) {
    return {
        data: state.users,
        token: null,
        loaded: state.users.loaded,
        isFetching: state.users.isFetching,
        message_text: state.users.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class UsersView extends Component {
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
        this.props.fetchUsers(TOKEN, null, false, initial);
    }

    render() {
        let tableContents = "No hi ha usuaris per mostrar.";
        let cols = [
            "Avatar",
            "Nom",
            "Usuari",
            "Ultima connexió"
        ];
        if(this.props.loaded){
            let users = this.props.data.data.users;
            tableContents = users.map(user =>
                <User
                    key={user.id}
                    user={user}
                />)
        }
        return(
            <MainView
                original_ids={[]}
                model="users"
                title="Usuaris"
                fetching={this.props.isFetching}
                refresh={() => this.fetchData(false)}
                filters="disabled"
                newButton="disabled"
                table={<List columns={cols} tableBody={tableContents}/>}
            />
        )
    }
}