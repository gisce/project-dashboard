import React, { Component } from 'react';
import { TOKEN } from '../constants/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/projects';
import Project from './Project';
import List from './List';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';
import NewButton from './NewButton';
import FilterButton from './FilterButton';
import RefreshButton from './RefreshButton';

function mapStateToProps(state) {
    return {
        data: state.projects,
        loaded: state.projects.loaded,
        isFetching: state.projects.isFetching,
        message_text: state.projects.message_text,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

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
        this.props.fetchProjects(TOKEN, initial);
    }

    render() {
        let projects = this.props.data.data;
        let tableContents = "No hi ha projectes per mostrar.";
        let cols = [
            "Avatar",
            "Títol",
            "Responsable",
            "Estat"
        ];
        if(this.props.loaded){
            tableContents = projects.map(project =>
                <Project
                    key={project.id}
                    project={project}
                />)
        }
        return(
            <div>
                <div className="leftContainer">
                    {
                        !this.props.isFetching && (
                            <div>
                                <div className="title">
                                    Projectes
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="rightContainer">
                    {
                        !this.props.isFetching && (
                            <div className="upperButtons">
                                <NewButton/>
                                <FilterButton/>
                                <RefreshButton
                                    refresh={() => this.fetchData(false)}
                                />
                            </div>
                        )
                    }
                    <div className="searchBox">
                        {
                            !this.props.isFetching &&
                            <SearchBox filter_id={null} model={"projects"}/>
                        }
                    </div>
                </div>
                <div className="filters">
                </div>
                <div className="tableContainer" style={{paddingTop: 50 }}>
                    {
                        this.props.isFetching ?
                            <LoadingIndicator/>
                        :
                        <List columns={cols} tableBody={tableContents}/>
                    }
                </div>
            </div>
        )
    }
}