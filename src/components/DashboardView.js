import React, { Component } from 'react';
import Dashboard from 'react-dazzle';
import MainPaper from './MainPaper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardCreators from '../actions/dashboard';

// Widgets of the dashboard.
import LineChart from './widgets/LineChart';
import DoughnutChart from './widgets/DoughnutChart';
import RadarChart from './widgets/RadarChart';
// Default styles.
import 'react-dazzle/lib/style/style.css';

function mapStateToProps(state) {
    return {
        dazzle_state: state.dashboard.dazzle_state
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
                    type: LineChart,
                    title: 'Primer gràfic',
                },
                prova2: {
                    type: DoughnutChart,
                },
                prova3: {
                    type: RadarChart,
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
    }

    componentDidMount(){
        this.initDashboard();
    }

    render() {
        return(
            <div className="mainPaperContainer">
                <MainPaper>
                    <div className="contents">
                        <div className="dashboard">
                            {
                                Object.keys(this.props.dazzle_state).length > 0 &&
                                    <Dashboard  widgets={this.props.dazzle_state.widgets} layout={this.props.dazzle_state.layout}  />
                            }
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>
                </MainPaper>
            </div>
        )
    }
}