import React, { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import ReactHighcharts from 'highcharts-react-official'
import { createStructuredSelector } from 'reselect';
import { selectDashboardData } from './../../../../redux/modules/dashboard/selector';
import { connect } from 'react-redux';
import Colors from './../../../../constants/Colors';
import ROCKET from './../../../../assets/images/app/chart-stoinks.ico'

HighchartsExporting(Highcharts);

const MonthlySubscriptionRevenue = ({ DASHBOARD }) => 
{
    const [ monthlySubscriptionRevenue, setMonthlySubscriptionRevenue ] = useState([]);

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
            text: 'Monthly Subscription Revenue',
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
                    text: 'Revenues'
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
                name: 'Revenues',
                data: monthlySubscriptionRevenue,
                color: Colors.warningMain
            }
        ]
    };

    const onLoadMapMonthlySubscriptionRevenue = () => 
    {
        const sortedMonthlySubscriptionRevenue = DASHBOARD
            .monthly_subscription_revenue
            .map(val => parseInt(val))
            .sort((a, b) => b - a)
            .filter(val => val);

        const mostActiveCount = sortedMonthlySubscriptionRevenue[0];
        const leastActiveCount = sortedMonthlySubscriptionRevenue[sortedMonthlySubscriptionRevenue.length - 1];

        const activeMonthlySubscriptionRevenue = DASHBOARD
            .monthly_subscription_revenue
            .map(val => 
            {
                val = parseInt(val);

                if (val === parseInt(mostActiveCount)) 
                {
                    return { 
                        y: val,
                        marker: {
                            symbol: `url(${ ROCKET })`,
                            width: 30,
                            height: 30
                        }
                    }
                }

                if ((val === parseInt(leastActiveCount)) && (val && parseInt(leastActiveCount))) 
                {
                    return { 
                        y: val,
                        marker: {
                            symbol: 'triangle-down',
                            width: 30,
                            height: 30
                        }
                    }
                }

                return val;
            });

            setMonthlySubscriptionRevenue(activeMonthlySubscriptionRevenue);
    }

    useEffect(() => {
        onLoadMapMonthlySubscriptionRevenue();

        return () => {
            setMonthlySubscriptionRevenue([]);
        }
    }, [DASHBOARD]);

    return <ReactHighcharts highcharts={ Highcharts }  options={ options } />
}


const mapStateToProps = createStructuredSelector({
    DASHBOARD: selectDashboardData
});

export default connect(mapStateToProps)(MonthlySubscriptionRevenue)