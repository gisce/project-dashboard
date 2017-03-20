import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import MainPaper from './MainPaper'
import MainMenu from './MainMenu'

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
        taskWork: state.taskWork,
        task: task,
        token: null,
        loaded: state.taskWork.loaded,
        isFetching: state.taskWork.isFetching,
        message_text: state.taskWork.message_text,
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
        width: '100%'
    },
    mainTable: {
        width: '100%',
        marginBottom: '20px'
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
                            </tr>
                            </tbody>
                        </table>
                        {
                            !this.props.task ?
                                <div style={{padding: 30}}>
                                    No s'ha seleccionat cap tasca.
                                </div>
                                :
                                <div></div>
                        }
                    </MainPaper>
                </div>
            </div>
        )
    }
}