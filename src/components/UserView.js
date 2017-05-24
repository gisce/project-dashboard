import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tasksCreators from '../actions/tasks';
import * as userCreators from '../actions/users'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import LoadingIndicator from './LoadingIndicator';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';

function mapStateToProps(state) {
    return {
        tasks: state.tasks.data,
        users: state.users.data,
        tasksLoaded: state.tasks.loaded,
        userLoaded: state.users.loaded,
        isFetchingTasks: state.tasks.isFetching,
        isFetchingUsers: state.users.isFetching,
        message_text: state.users.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, tasksCreators, userCreators), dispatch);
}

const style = {
    userAvatar: {
        float: 'left'
    },
    userInfo: {
        float: 'right',
        marginLeft: '10px'
    },
    userName: {
        marginTop: '30px',
    },
    userLogin: {
        marginTop: '10px',
        fontStyle: 'italic',
        fontSize: '14pt'
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class UserView extends Component {
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
        let taskFilter = "&filter=[('user_id','='," + this.props.params.userId + "),('state','in',['open','pending'])]";
        this.props.fetchTasks(TOKEN, taskFilter, false, false);
        this.props.fetchUsers(TOKEN, this.props.params.userId, true, initial);
    }

    handleClick(element){
        this.props.setActiveTask(element);
        browserHistory.push("/tasks/" + element.id);
    }

    render() {
        let isFetching = this.props.isFetchingTasks || this.props.isFetchingUsers;
        let cols = {
            "Tasca": "description",
            "Projecte": "project",
            "Estat": "status",
            "Data inici:": "project"
        };
        let userdata = [];
        let buttons = [];
        let tasks = {};
        let user_id = this.props.params.userId;
        let user = null;
        if(this.props.tasksLoaded && this.props.userLoaded && !isFetching){
            tasks = this.props.tasks.tasks;
            user = this.props.users.users[0];
            userdata.push(
                <div key="-1">
                    <div style={style.userAvatar}>
                        <Avatar
                            src={user.avatar}
                            size={120}
                            style={style}
                        />
                    </div>
                    <div style={style.userInfo}>
                        <div style={style.userName}>
                            {user.name}
                        </div>
                        <div style={style.userLogin}>
                            {user.login}
                        </div>
                    </div>
                </div>
            );
            buttons.push(
                <FlatButton
                    key="-2"
                    label="Totes les tasques"
                    primary={true}
                    icon={<FontIcon className="material-icons">view_list</FontIcon>}
                    onTouchTap={console.log("")}
                />
            );
        }
        return(
            <div>
                <div className="leftContainer">
                    {
                        !isFetching && (
                            <div>
                                <div className="title">
                                    {userdata}
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="rightContainer">
                    {
                        !isFetching && (
                            <div className="upperButtons">
                                {buttons}
                                <RefreshButton
                                    refresh={() => this.fetchData(false)}
                                />
                            </div>
                        )
                    }
                </div>
                <div className="contents">
                    {
                        !isFetching &&
                        <div>Tasques actives o pendents on l'usuari treballa actualment:</div>
                    }
                </div>
                <div className="tableContainer" style={{paddingTop: 20 }}>
                    {
                        !this.props.tasksLoaded || !this.props.userLoaded || isFetching ?
                            <LoadingIndicator/>
                        :
                        <SmartTable
                            handleClick={this.handleClick}
                            handleUpdate={this.props.receiveTasks}
                            columns={cols}
                            data={tasks}
                        />
                    }
                </div>
            </div>
        )
    }
}