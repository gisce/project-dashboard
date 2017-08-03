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
        isFetching: (
            state.dashboard.tasksStatusFetching &&
            state.dashboard.userTasksFetching &&
            state.dashboard.startedTasksCountFetching
        )
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
                StartedTasksCountLineChart: {
                    type: StartedTasksCountLineChart,
                    title: 'Tasques iniciades el darrer any',
                },
                UserTasksDoughnutChart: {
                    type: UserTasksDoughnutChart,
                    title: "Tasques per usuari"
                },
                TaskStatusRadarChart: {
                    type: TaskStatusRadarChart,
                    title: "Estat de les tasques"
                },
            },
            // Layout of the dashboard
            layout: {
                rows: [{
                    columns: [{
                        className: 'startedTasksLineChartStyle',
                        widgets: [{key: 'StartedTasksCountLineChart'}],
                    },{
                        className: 'tasksStatusRadarChartStyle',
                        widgets: [{key: 'UserTasksDoughnutChart'}],
                    },
                        {
                            className: 'userTasksDoughnutChartStyle',
                            widgets: [{key: 'TaskStatusRadarChart'}],
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
            <div className="mainPaperDashboardContainer">
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