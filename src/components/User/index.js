import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar'
import * as userCreators from '../../actions/users';
import {redirectToRoute} from '../../utils/http_functions'


function mapStateToProps(state) {
    return {
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
    }

    render(){
        const {
            user,
            fetchUsersRequest, fetchUsers, receiveUsers, setOriginalUserTasks,
            ...otherProps} = this.props;
        return(
            <TableRow {...otherProps} onCellClick={redirectToRoute("/user/"+user.id)}>
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
}