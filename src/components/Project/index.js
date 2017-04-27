import React, { Component } from 'react'
import { TOKEN } from '../../constants'
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar'
import * as tasksCreators from '../../actions/tasks';
import * as projectCreators from '../../actions/projects'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        data: state.tasks,
        token: null,
        loaded: state.tasks.loaded,
        isFetching: state.tasks.isFetching,
        message_text: state.tasks.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, tasksCreators, projectCreators), dispatch);
}


const style = {margin: 5};

@connect(mapStateToProps, mapDispatchToProps)
export default class Project extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render(){
        const {project, token, loaded, isFetching,
            message_text, fetchTasksRequest,
            receiveTasks, fetchTasks, setActiveTask,
            fetchProjectsRequest, receiveProjects,
            setActiveProject, fetchProjects,
            ...otherProps} = this.props;
        return(
            <TableRow {...otherProps} onCellClick={this.onClick}>
                <TableRowColumn>
                    <Avatar
                        src={project.avatar}
                        size={30}
                        style={style}
                    />
                </TableRowColumn>
                <TableRowColumn>{project.title}</TableRowColumn>
                <TableRowColumn>{project.partner}</TableRowColumn>
                <TableRowColumn>{project.status}</TableRowColumn>
            </TableRow>
        )
    }

    onClick() {
        let tasks = JSON.stringify(this.props.project.tasks);
        this.props.setActiveProject(this.props.project.title);
        this.props.fetchTasks(TOKEN, tasks, true);
    }
}