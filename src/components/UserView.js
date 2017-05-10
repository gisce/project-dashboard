import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tasksCreators from '../actions/tasks';
import * as userCreators from '../actions/users'
import Task from './Task'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import List from './List';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import RefreshButton from './RefreshButton';

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
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData(initial = true) {
        let taskFilter = "&filter=[('user_id','='," + this.props.params.userId + "),('state','in',['open','pending'])]";
        this.props.fetchTasks(TOKEN, taskFilter, false, false);
        this.props.fetchUsers(TOKEN, this.props.params.userId, true, initial);
    }

    render() {
        let isFetching = this.props.isFetchingTasks || this.props.isFetchingUsers;
        let tableContents = "No existeix cap usuari amb ID " + this.props.params.userId + ".";
        let cols = [
            "Tasca",
            "Projecte",
            "Estat",
            "Data inici"
        ];
        let userdata = [];
        let buttons = [];
        let user_id = this.props.params.userId;
        let user = null;
        if(this.props.tasksLoaded && this.props.userLoaded && !isFetching){
            let tasks = this.props.tasks.tasks;
            tableContents = tasks.map(task =>
                <Task
                    key={task.id}
                    task={task}
                    userMode={true}
                />);
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
                        isFetching ?
                            <LoadingIndicator/>
                        :
                        <List columns={cols} tableBody={tableContents}/>
                    }
                </div>
            </div>
        )
    }
}