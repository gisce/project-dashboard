import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import MainPaper from './MainPaper'
import MainMenu from './MainMenu'
import TaskList from './TaskList'

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
        float: 'left'
    },
    paperSection: {
        width: '100%'
    },
    titol: {
        padding: 20,
        marginBottom: 50,
        fontSize: 26
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
                        <div>
                            <div style={style.titol}>
                                Tasques
                            </div>
                            {
                                this.props.loaded ?
                                    <TaskList projects={this.props.data.data} />
                                    :
                                    <div>
                                        No hi ha tasques per mostrar.
                                    </div>
                            }
                        </div>
                    </MainPaper>
                </div>
            </div>
        )
    }
}