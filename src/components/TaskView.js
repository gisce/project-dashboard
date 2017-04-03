import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import MainPaper from './MainPaper'
import TaskWorkList from './TaskWorkList'

function mapStateToProps(state) {
    let task = null;
    if(state.tasks.data) {
        let tasks = state.tasks.data.tasks;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == state.tasks.active_task_id) {
                task = tasks[i]
            }
        }
    }
    return {
        taskWorks: state.taskWorks,
        task: task,
        token: null,
        loaded: state.taskWorks.loaded,
        isFetching: state.taskWorks.isFetching,
        message_text: state.taskWorks.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const estils = {
    container: {
        paddingLeft: "15%",
        paddingRight: "15%",
        paddingTop: 120
    },
    titol: {
        paddingTop: 20,
        paddingLeft: 20,
        fontSize: 26,
        width: '70%'
    },
    subtitol: {
        paddingLeft: 20,
        paddingTop: 20,
        fontSize: 14
    },
    mainTable: {
        width: "100%",
        marginBottom: '20px'
    },
    botoNou: {
        float: 'right',
        position: 'relative',
        right: 5
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class TasksView extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_text: null
        };
    }

    render() {
        return(
            <div style={estils.container}>
                <MainPaper>
                    <table style={estils.mainTable}>
                        <tbody>
                        <tr>
                            <td style={estils.titol}>
                                {
                                    this.props.task ?
                                        <div>{this.props.task.description}</div>
                                        :
                                        <div>Tasca</div>
                                }
                            </td>
                            <td>
                                <div style={estils.botoNou}>
                                    <FlatButton
                                        label="Nou workdone"
                                        primary={true}
                                        icon={<FontIcon className="material-icons">note_add</FontIcon>}
                                        onTouchTap={this.newTaskWork}
                                    />
                                </div>
                            </td>
                        </tr>
                        {
                            this.props.task ?
                                <div>
                                    <tr>
                                        <td colSpan="2" style={estils.subtitol}>
                                            <div>Projecte: {this.props.task.project}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" style={estils.subtitol}>
                                            <TextField
                                                disabled={true}
                                                defaultValue={this.props.task.estimated_hours}
                                                floatingLabelText="Hores estimades"
                                            />
                                        </td>
                                        <td colSpan="2" style={estils.subtitol}>
                                            <TextField
                                                disabled={true}
                                                defaultValue={this.props.task.dedicated_hours}
                                                floatingLabelText="Hores dedicades"
                                            />
                                        </td>
                                    </tr>
                                </div>
                                :
                                <div></div>
                        }
                        </tbody>
                    </table>
                    {
                        !this.props.task ?
                            <div style={{padding: 30}}>
                                No s'ha seleccionat cap tasca.
                            </div>
                            :
                            <TaskWorkList taskWorks={this.props.taskWorks.data.taskWorks} />
                    }
                </MainPaper>
            </div>
        )
    }

    newTaskWork() {
        console.log("New workdone called");
    }
}