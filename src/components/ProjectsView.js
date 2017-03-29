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
    subtitol: {
        paddingLeft: 20,
        fontSize: 14
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
        top: -3,
        left: -3
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
                                                Projectes
                                            </td>
                                            <td>
                                                <SearchBox original_ids={[]} model="projects"/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {
                                    this.props.loaded ?
                                        <ProjectList projects={this.props.data.data} />
                                        :
                                        <div style={{padding: 30}}>
                                            No hi ha projectes per mostrar.
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