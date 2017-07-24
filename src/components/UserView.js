import React, { Component } from 'react';
import MainPaper from './MainPaper';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tasksCreators from '../actions/tasks';
import * as userCreators from '../actions/users'
import * as paginatorCreators from '../actions/paginator';
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import LoadingIndicator from './LoadingIndicator';
import RefreshButton from './RefreshButton';
import SmartTable from './SmartTable';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        tasks: state.tasks.data,
        users: state.users.data,
        tasksLoaded: state.tasks.loaded,
        userLoaded: state.users.loaded,
        isFetchingTasks: state.tasks.isFetching,
        isFetchingUsers: state.users.isFetching,
        message_text: state.users.message_text,
        allTasks: state.users.allTasks,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, tasksCreators, userCreators, paginatorCreators), dispatch);
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
        this.handleAllTasksClick = this.handleAllTasksClick.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(initial = true) {
        this.props.setActualPage(1);
        this.props.setShowAllUserTasksFlag(false);
        this.props.fetchUsers(this.props.token, this.props.params.userId, true, initial);
    }

    handleClick(element){
        this.props.setActiveTask(element);
        browserHistory.push("/tasks/" + element.id);
    }

    handleAllTasksClick(flag){
        this.props.setShowAllUserTasksFlag(flag);
        if(flag) {
            let taskFilter = [
                ["user_id", "=", parseInt(this.props.params.userId, 10)]
            ];
            this.props.fetchTasks(this.props.token, taskFilter, false, false);
        }
        else{
            this.fetchData(false);
        }
    }

    render() {
        const allTasks = this.props.allTasks;
        const isFetching = this.props.isFetchingTasks || this.props.isFetchingUsers;
        const cols = {
            "Tasca": ["name", {width: "220px"}],
            "Projecte": ["project_id.name", {width: "220px"}],
            "Estat": ["state", {width: "90px"}],
            "Data inici": ["state", {width: "130px"}]
        };
        let userdata = [];
        let buttons = [];
        let tasks = {};
        const user_id = this.props.params.userId;
        let user = null;
        if(this.props.tasksLoaded && this.props.userLoaded && !isFetching){
            tasks = this.props.tasks.tasks;
            user = this.props.users[0];
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
            if(!this.props.allTasks) {
                buttons.push(
                    <FlatButton
                        key="-2"
                        label="Totes les tasques"
                        primary={true}
                        icon={<FontIcon className="material-icons">view_list</FontIcon>}
                        onTouchTap={() => this.handleAllTasksClick(true)}
                    />
                );
            }
            else{
                buttons.push(
                    <FlatButton
                        key="-2"
                        label="Tasques actives o pendents"
                        primary={true}
                        icon={<FontIcon className="material-icons">view_list</FontIcon>}
                        onTouchTap={() => this.handleAllTasksClick(false)}
                    />
                );
            }
        }
        return(
            <div className="mainPaperContainer">
                <MainPaper>
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
                            !isFetching && (

                                (
                                    allTasks ?
                                        <div>Tasques de l'usuari:</div>
                                    :
                                        <div>Tasques actives o pendents on l'usuari treballa actualment:</div>
                                )

                            )
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
                </MainPaper>
            </div>
        )
    }
}