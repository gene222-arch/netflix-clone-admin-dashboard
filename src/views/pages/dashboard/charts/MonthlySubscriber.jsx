import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import ReactHighcharts from 'highcharts-react-official'
import { createStructuredSelector } from 'reselect';
import { selectDashboardData } from './../../../../redux/modules/dashboard/selector';
import { connect } from 'react-redux';
import Colors from './../../../../constants/Colors';

HighchartsExporting(Highcharts);

const isoStringData = (new Date()).toISOString();

const MonthlySubscriber = ({ DASHBOARD }) => 
{
    const [ chartKey, setChartKey ] = useState(isoStringData);

    const options = 
    {
        chart: {
            backgroundColor: 
            {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 1
                },
                stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                ]
            },
            borderRadius: 5,
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            shadow: {
                color: 'rgba(255, 255, 255, .5)',
                offsetX: 1,
                offsetY: 2,
                opacity: '0.5',
                width: 5
            },
            plotBorderColor: '#606063',
        },
        title: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase'
            }
        },
        title: {
            text: 'Monthly Subscribers',
            style: {
                color: 'white'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
            categories: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ],
        },
        yAxis: [
            {
                title: {
                    text: 'Subscribers'
                },
            }
        ],
        tooltip: {
            shared: true,
            pointFormat: '{series.name}: <b>{point.y}</b><br/>',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [
            {
                name: 'Subscribers',
                data: DASHBOARD.monthly_subscribers_per_year.map(val => parseInt(val)),
                color: Colors.warningMain
            }
        ]
    };

    useEffect(() => {
        window.addEventListener('resize', () => setChartKey(isoStringData));

        return () => {
            setChartKey(isoStringData);
        }
    }, []);

    return (
        <ReactHighcharts 
            key={ chartKey }
            highcharts={ Highcharts } 
            options={ options }
        />
    )
}


const mapStateToProps = createStructuredSelector({
    DASHBOARD: selectDashboardData
});

export default connect(mapStateToProps)(MonthlySubscriber)