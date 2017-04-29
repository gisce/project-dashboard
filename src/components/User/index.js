import React, { Component } from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar'
import * as userCreators from '../../actions/users';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        data: state.tasks
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(userCreators, dispatch);
}

const style = {margin: 5};

@connect(mapStateToProps, mapDispatchToProps)
export default class User extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render(){
        const {
            user,
            fetchUsersRequest, fetchUsers, receiveUsers,
            ...otherProps} = this.props;
        return(
            <TableRow {...otherProps} onCellClick={this.onClick}>
                <TableRowColumn>
                    <Avatar
                        src={user.avatar}
                        size={30}
                        style={style}
                    />
                </TableRowColumn>
                <TableRowColumn>{user.name}</TableRowColumn>
                <TableRowColumn>{user.login}</TableRowColumn>
                <TableRowColumn>01/01/2016</TableRowColumn>
            </TableRow>
        )
    }

    onClick() {
        console.log("User clicked");
    }
}