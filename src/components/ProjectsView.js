import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import MainPaper from './MainPaper'
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


const estils = {
    container: {
        width: "70%",
        paddingLeft: "15%",
        paddingRight: "15%",
        paddingTop: 120
    },
    titol: {
        position: "relative",
        float: "left",
        paddingTop: 20,
        paddingLeft: 20,
        fontSize: 26
    },
    search_box: {
        position: "relative",
        float: "right",
        fontSize: 26
    },
    continguts: {
        clear: "both",
        width: '100%',
        paddingTop: 30
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
            <div style={estils.container}>
                <MainPaper>
                    <div style={estils.titol}>
                        Projectes
                    </div>
                    <div style={estils.search_box}>
                        <SearchBox original_ids={[]} model="projects"/>
                    </div>
                    <div style={estils.continguts}>
                        {
                            this.props.loaded ?
                                <ProjectList projects={this.props.data.data} />
                                :
                                <div style={{padding: 30}}>
                                    No hi ha projectes per mostrar.
                                </div>
                        }
                    </div>
                </MainPaper>
            </div>
        )
    }
}