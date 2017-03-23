import React, { Component } from 'react'
import {Table, TableBody, TableHeader, TableRow, TableHeaderColumn, TableFooter } from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TaskWork from '../TaskWork'
import * as taskWorkCreators from '../../actions/task_work';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps(state) {
    return {
        data: state.taskWorks,
        dialog_open: state.taskWorks.dialog_open
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(taskWorkCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TaskWorkList extends Component {
    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteTaskWork = this.deleteTaskWork.bind(this);
        this.editTaskWork = this.editTaskWork.bind(this);
    }

    render(){
        const actions = [
            <FlatButton
                label="Cancel·lar"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="D'acord"
                primary={true}
                onTouchTap={this.deleteTaskWork}
            />,
        ];
        const {
            taskWorks, dialog_open,
            openTaskWorkDialogRequest, closeTaskWorkDialogRequest, openTaskWorkDialog, closeTaskWorkDialog,
            ...otherProps} = this.props;
        return(
            <span>
                <Table style={{ tableLayout: 'auto' }} fixedHeader={false} {...otherProps}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Data</TableHeaderColumn>
                            <TableHeaderColumn>Realitzat per</TableHeaderColumn>
                            <TableHeaderColumn>Temps dedicat</TableHeaderColumn>
                            <TableHeaderColumn>Resum del treball</TableHeaderColumn>
                            <TableHeaderColumn>&nbsp;</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody showRowHover={true} displayRowCheckbox={false} stripedRows={true}>
                        {taskWorks.map(taskWork =>
                            <TaskWork
                                key={taskWork.id}
                                taskWork={taskWork}
                                handleOpen={this.handleOpen}
                                handleEdit={this.editTaskWork}
                            />
                        )}
                    </TableBody>
                    <TableFooter/>
                </Table>
                <Dialog
                    title="Atenció"
                    actions={actions}
                    modal={false}
                    open={dialog_open}
                    onRequestClose={this.handleClose}
                >
                    Segur que vols esborrar el workdone?
                </Dialog>
            </span>
        )
    }

    handleOpen() {
        this.props.openTaskWorkDialog();
    }

    handleClose() {
        this.props.closeTaskWorkDialog();
    }

    editTaskWork() {
        console.log("Edit workdone called");
    }

    deleteTaskWork() {
        console.log("Delete workdone called");
        this.handleClose();
    }
}
