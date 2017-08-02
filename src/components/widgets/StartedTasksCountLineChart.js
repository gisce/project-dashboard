import React, { Component } from 'react';
import { Line } from 'react-chartjs';
import { getRandomInt } from '../../utils/misc';

class LineChart extends Component {
    constructor() {
        super();

        this.state = {
            data: {
                labels: ['10s', '20', '30', '40', '50', '60', '70'],
                datasets: [
                    {
                        label: 'Singal',
                        fillColor: '#F1E7E5',
                        strokeColor: '#E8575A',
                        pointColor: '#E8575A',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#ff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: [10, 55, 69, 45, 87, 68, 74],
                    },
                    {
                        label: 'Disturbance',
                        fillColor: 'rgba(151,187,205,0.2)',
                        strokeColor: 'rgba(151,187,205,1)',
                        pointColor: 'rgba(151,187,205,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(151,187,205,1)',
                        data: [10, 55, 69, 45, 87, 68, 74],
                    },
                ],
            },
        };
    }

    render() {
        return (
            <div >
              <Line data={this.state.data} options={{responsive: true, animationSteps: 300 }} height="210" width="800"/>
            </div>
        );
    }
}

export default LineChart;