import React from 'react';
import { Doughnut } from 'react-chartjs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardCreators from '../../actions/dashboard';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        user_tasks_count: state.dashboard.user_tasks_count
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, dashboardCreators), dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class UserTasksDoughnutChart extends React.Component {
    constructor() {
        super();
        this.getUserTasksData = this.getUserTasksData.bind(this);
    }

    getUserTasksData(){
        let data = [];
        let keys = Object.keys(this.props.user_tasks_count);
        for(let i = 0; i < keys.length; i++){
            const key = keys[i];
            data.push({
                value: this.props.user_tasks_count[key],
                label: key
            });
        }
        return data;
    }

    render() {
        if(Object.keys(this.props.user_tasks_count).length > 0) {
            const data = this.getUserTasksData();
            this.state = {
                data: data
            };
        }
        return (
            Object.keys(this.props.user_tasks_count).length > 0 && (
                <div>
                    <Doughnut data={this.state.data} options={{ animationEasing: 'easeInSine', showTooltips: true }} height="300" width="350"/>
                </div>
            )
        );
    }
}

export default UserTasksDoughnutChart;