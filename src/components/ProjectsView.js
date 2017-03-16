import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import MainPaper from './MainPaper'
import MainMenu from './MainMenu'
import ProjectList from './ProjectList'
import SearchBox from './SearchBox';

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
        padding: 20,
        marginBottom: 50,
        fontSize: 26
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
        const token = "FOO";
        // must replace by real token
        this.props.fetchProjects(token, "", initial);
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
                                Projectes
                                <SearchBox original_ids={[]} model="projects" />
                            </div>
                            <div>
                            {
                                this.props.loaded ?
                                    <ProjectList projects={this.props.data.data} />
                                    :
                                    <div style={{padding: 30}}>
                                        No hi ha projectes per mostrar.
                                    </div>
                            }
                            </div>
                        </div>
                    </MainPaper>
                </div>
            </div>
        )
    }
}