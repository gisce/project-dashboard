import React, { Component } from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar'
import * as taskWorkCreators from '../../actions/task_work';
import * as tasksCreators from '../../actions/tasks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        data: state.tasks
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, tasksCreators, taskWorkCreators), dispatch);
}

const style = {margin: 5};

@connect(mapStateToProps, mapDispatchToProps)
export default class Task extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render(){
        const {
            task,
            fetchTaskWorkRequest, receiveTaskWork, fetchTaskWorks, dispatch,
            setActiveTask, fetchTasksRequest, receiveTasks, fetchTasks,
            ...otherProps} = this.props;
        return(
            <TableRow {...otherProps} onCellClick={this.onClick}>
                <TableRowColumn>
                    <Avatar
                        src={task.avatar}
                        size={30}
                        style={style}
                    />
                </TableRowColumn>
                <TableRowColumn>{task.description}</TableRowColumn>
                <TableRowColumn>{task.partner}</TableRowColumn>
                <TableRowColumn>{task.priority}</TableRowColumn>
                <TableRowColumn>{task.status}</TableRowColumn>
            </TableRow>
        )
    }

    onClick() {
        let token = "FOO";
        let task_work_ids = JSON.stringify(this.props.task.work_ids);
        this.props.setActiveTask(this.props.task.id);
        this.props.fetchTaskWorks(token, task_work_ids, false);
    }
}