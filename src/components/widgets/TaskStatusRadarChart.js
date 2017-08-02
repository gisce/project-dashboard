import React, { Component } from 'react';
import { Radar } from 'react-chartjs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardCreators from '../../actions/dashboard';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        tasks_status: state.dashboard.tasks_status
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, dashboardCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class TaskStatusRadarChart extends Component {
    constructor() {
        super();
        this.getTasksData = this.getTasksData.bind(this);
    }

    getTasksData(){
        let res = [];
        res.push(this.props.tasks_status["open"]);
        res.push(this.props.tasks_status["draft"]);
        res.push(this.props.tasks_status["pending"]);
        res.push(this.props.tasks_status["cancelled"]);
        res.push(this.props.tasks_status["done"]);
        return res;
    }

    render() {
        if(Object.keys(this.props.tasks_status).length > 0){
            const data = this.getTasksData();
            this.state = {
                data: {
                    labels: ['En progrés', 'Esborrany', 'Pendent', 'Cancel·lat', 'Realitzat'],
                    datasets: [
                        {
                            label: 'Tasques',
                            fillColor: '#80CBC4',
                            strokeColor: '#00897B',
                            pointColor: '#004D40',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#ff',
                            pointHighlightStroke: 'rgba(220,220,220,1)',
                            data: data,
                        }
                    ],
                },
            };
        }
        return (
            Object.keys(this.props.tasks_status).length > 0 && (
                <div>
                    <Radar data={this.state.data} options={{responsive: true, animationSteps: 300}} height="200" width="300"/>
                </div>
            )
        );
    }
}

export default TaskStatusRadarChart;