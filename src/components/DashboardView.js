import React, { Component } from 'react';
import Dashboard from 'react-dazzle';
import MainPaper from './MainPaper';
import LoadingIndicator from './LoadingIndicator';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardCreators from '../actions/dashboard';

// Widgets of the dashboard.
import StartedTasksCountLineChart from './widgets/StartedTasksCountLineChart';
import UserTasksDoughnutChart from './widgets/UserTasksDoughnutChart';
import TaskStatusRadarChart from './widgets/TaskStatusRadarChart';
// Default styles.
import 'react-dazzle/lib/style/style.css';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        dazzle_state: state.dashboard.dazzle_state,
        isFetching: state.dashboard.isFetching
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, dashboardCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class DashboardView extends Component {
    constructor(props){
        super(props);
    }

    initDashboard(){
        const dazzleState = {
            // Widgets that are available in the dashboard
            widgets: {
                prova1: {
                    type: StartedTasksCountLineChart,
                    title: 'Tasques iniciades el darrer any',
                },
                prova2: {
                    type: UserTasksDoughnutChart,
                    title: "Tasques per usuari"
                },
                prova3: {
                    type: TaskStatusRadarChart,
                    title: "Estat de les tasques"
                },
            },
            // Layout of the dashboard
            layout: {
                rows: [{
                    columns: [{
                        className: 'wdwdd',
                        widgets: [{key: 'prova1'}],
                    },{
                        className: 'widgets',
                        widgets: [{key: 'prova2'}],
                    },
                        {
                            className: 'widgets',
                            widgets: [{key: 'prova3'}],
                        }],
                }],
            },
            editable: false,
        };
        this.props.setDazzleState(dazzleState);
        this.props.getTasksStatus(this.props.token);
        this.props.getUserTasksCount(this.props.token);
        this.props.getStartedTasksCount(this.props.token);
    }

    componentDidMount(){
        this.initDashboard();
    }

    render() {
        return(
            <div className="mainPaperContainer">
                <MainPaper>
                    <div className="contents">
                        {
                            this.props.isFetching ?
                                <LoadingIndicator/>
                                :
                                <div>
                                    <div className="dashboard">
                                        {
                                            Object.keys(this.props.dazzle_state).length > 0 &&
                                            <Dashboard widgets={this.props.dazzle_state.widgets}
                                                       layout={this.props.dazzle_state.layout}/>
                                        }
                                    </div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                        }
                    </div>
                </MainPaper>
            </div>
        )
    }
}