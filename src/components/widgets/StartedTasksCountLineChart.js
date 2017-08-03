import React, { Component } from 'react';
import { Line } from 'react-chartjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardCreators from '../../actions/dashboard';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        started_tasks_count: state.dashboard.started_tasks_count
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, dashboardCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class StartedTasksCountLineChart extends Component {
    constructor() {
        super();
    }

    render() {
        if(Object.keys(this.props.started_tasks_count).length > 0){
            this.state = {
                data: {
                    labels: this.props.started_tasks_count.labels,
                    datasets: [
                        {
                            label: 'Tasques',
                            fillColor: '#80CBC4',
                            strokeColor: '#00897B',
                            pointColor: '#004D40',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#ff',
                            pointHighlightStroke: 'rgba(220,220,220,1)',
                            data: this.props.started_tasks_count.values,
                        },
                    ],
                },
            };
        }
        return (
            Object.keys(this.props.started_tasks_count).length > 0 && (
                <div>
                    <Line data={this.state.data} options={{responsive: true, animationSteps: 300}} height="250" width="800"/>
                </div>
            )
        );
    }
}

export default StartedTasksCountLineChart;