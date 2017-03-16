import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import MainPaper from './MainPaper'
import MainMenu from './MainMenu'
import TaskList from './TaskList'
import SearchBox from './SearchBox';

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
        paddingLeft: 20,
        fontSize: 26,
        width: '100%'
    },
    subtitol: {
        paddingLeft: 20,
        fontSize: 14
    },
    mainTable: {
        width: '100%',
        marginBottom: '20px'
    }
};

let project = "";

@connect(mapStateToProps, mapDispatchToProps)
export default class TasksView extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_text: null
        };
    }

    render() {
        let tasks_ids = [];
        if(this.props.data.data){
            tasks_ids = this.props.data.data.original_ids;
            if(this.props.data.data.tasks.length > 0){
                project = this.props.data.data.tasks[0].project;
            }
        }
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
                                        Tasques
                                    </td>
                                    <td>
                                        <SearchBox original_ids={tasks_ids} model="tasks"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={style.subtitol}>
                                        {
                                            project != "" ?
                                                <div>Projecte: {project}</div>
                                            :
                                                <div></div>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {
                             this.props.loaded ?
                                <TaskList tasks={this.props.data.data.tasks} />
                                :
                                <div style={{padding: 30}}>
                                    No hi ha tasques per mostrar.
                                </div>
                        }
                    </MainPaper>
                </div>
            </div>
        )
    }
}