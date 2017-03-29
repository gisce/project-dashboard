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

const estils = {
    menuContainer: {
        padding: 0,
        margin: 0
    },
    paperContainer: {
        width: '100%',
        paddingLeft: 33,
        paddingRight: 30,
        paddingTop: 80,
        margin: 0
    },
    titol: {
        paddingLeft: 20,
        fontSize: 26,
        width: '100%'
    },
    mainTable: {
        marginBottom: '20px'
    },
    paperSectionStyle: {
        height: "100%"
    },
    containerTable: {
        height: "93.1%",
        width: "100%",
        position: "relative",
        top: "-3",
        left: "-3"
    },
    subtitol: {
        paddingLeft: 20,
        fontSize: 14
    },
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
            <table style={estils.containerTable}>
                <tr>
                    <td style={estils.menuContainer}>
                        <div style={{height: "100%", width: '100%', float: 'left'}}>
                            <MainMenu/>
                        </div>
                    </td>
                    <td className="paperSection" style={estils.paperContainer}>
                        <div style={estils.paperSectionStyle}>
                            <MainPaper>
                                <table style={estils.mainTable}>
                                    <tbody>
                                    <tr>
                                        <td style={estils.titol}>
                                            Tasques
                                        </td>
                                        <td>
                                            <SearchBox original_ids={tasks_ids} model="tasks"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={estils.subtitol}>
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
                    </td>
                </tr>
            </table>
        )
    }
}