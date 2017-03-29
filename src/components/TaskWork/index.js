import React, { Component } from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import * as taskWorkCreators from '../../actions/task_work';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {prova} from '../../utils/http_functions'

function mapStateToProps(state) {
    return {
        data: state.taskWorks
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(taskWorkCreators, dispatch);
}

const style = {margin: 5};

@connect(mapStateToProps, mapDispatchToProps)
export default class TaskWork extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.deleteTaskWork = this.deleteTaskWork.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    render(){
        const {
            taskWork,
            fetchTaskWorkRequest, receiveTaskWork, fetchTaskWorks, dispatch, handleOpen, handleEdit,
            openTaskWorkDialogRequest, closeTaskWorkDialogRequest, openTaskWorkDialog, closeTaskWorkDialog,
            ...otherProps} = this.props;
        return(
            <TableRow {...otherProps} onCellClick={this.onClick}>
                <TableRowColumn>{taskWork.date}</TableRowColumn>
                <TableRowColumn>{taskWork.user_id}</TableRowColumn>
                <TableRowColumn>{taskWork.hours}</TableRowColumn>
                <TableRowColumn style={{width: '80%'}}>{taskWork.work_summary}</TableRowColumn>
                <TableRowColumn>
                    <div style={{float: 'right'}} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}>
                        <IconButton>
                            <FontIcon onTouchTap={this.handleEdit} className="material-icons">mode_edit</FontIcon>
                        </IconButton>
                        <IconButton>
                            <FontIcon onTouchTap={this.deleteTaskWork} className="material-icons">delete</FontIcon>
                        </IconButton>
                    </div>
                </TableRowColumn>
            </TableRow>
        )
    }

    onClick() {
        console.log("Prova: ", prova());
    }

    deleteTaskWork() {
        this.props.handleOpen();
    }

    handleEdit() {
        this.props.handleEdit();
    }
}