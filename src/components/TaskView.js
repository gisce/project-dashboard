import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import MainPaper from './MainPaper'
import MainMenu from './MainMenu'
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

const style = {
    menuSection: {
        display: 'block',
        float: 'left',
        width: "14%"
    },
    paperSection: {
        display: 'block',
        width:  '75%',
        float: 'right',
        padding: 30
    },
    titol: {
        paddingTop: 20,
        paddingLeft: 20,
        fontSize: 26,
        width: '70%'
    },
    mainTable: {
        width: '100%',
        marginBottom: '20px'
    },
    subtitol: {
        paddingLeft: 20,
        paddingTop: 20,
        fontSize: 14
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
            <div>
                <div style={style.menuSection}>
                    <MainMenu/>
                </div>
                <div style={style.paperSection}>
                    <MainPaper>
                        <table style={style.mainTable}>
                            <tbody>
                            <tr>
                                <td style={style.titol}>
                                    {
                                        this.props.task ?
                                            <div>{this.props.task.description}</div>
                                            :
                                            <div>Tasca</div>
                                    }
                                </td>
                                <td>
                                    <div style={style.botoNou}>
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
                                            <td colSpan="2" style={style.subtitol}>
                                                <div>Projecte: {this.props.task.project}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" style={style.subtitol}>
                                                <TextField
                                                    disabled={true}
                                                    defaultValue={this.props.task.estimated_hours}
                                                    floatingLabelText="Hores estimades"
                                                />
                                            </td>
                                            <td colSpan="2" style={style.subtitol}>
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
            </div>
        )
    }

    newTaskWork() {
        console.log("New workdone called");
    }
}