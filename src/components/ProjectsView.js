import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import Project from './Project'
import MainPaper from './MainPaper'
import MainMenu from './MainMenu'
import ProjectList from './ProjectList'

function mapStateToProps(state) {
    return {
        data: state.projects,
        token: null,
        loaded: state.projects.loaded,
        isFetching: state.projects.isFetching,
        message_text: state.projects.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


const style = {
    paperStyle: {
        marginLeft: 180,
        marginRight: 0,
        width: '85%'
    },
    viewStyle: {
        height: '85%'
    },
    tableStyle: {
        height: '85%'
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectsView extends Component {
    constructor(props){
        super(props);
        this.state = {
            message_text: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(initial = true) {
        const token = "FOO"
        // must replace by real token
        this.props.fetchProjects(token, initial);
    }

    render() {
        return(
            <div style={style.viewStyle}>
                <div>
                    <MainMenu/>
                </div>
                <div style={style.paperStyle}>
                    <MainPaper>
                        {
                            this.props.loaded ?
                            <ProjectList projects={this.props.data.data} />
                        :
                            <div>
                                No hi ha projectes per mostrar.
                            </div>
                        }
                    </MainPaper>
                </div>
            </div>
        )
    }
}