import React from "react"
import { Line } from 'react-chartjs-2'


export class Sparkline extends React.Component {

    render() {
        const { data, last7d } = this.props

        const prices = data && data.price.map((el) => el)
        const labels = [...Array(data.price.length).keys()];
        const borderColor = last7d && last7d >= 0 ? '#00FF5F' : '#FE1040';

        return (

            <Line
                id='line'
                data={{
                    labels: labels,
                    datasets: [{
                        fill: true,
                        pointRadius: 0,
                        pointBorderColor: '#191B1F',
                        lineTension: 0,
                        label: 'BTC',
                        data: prices,
                        backgroundColor: [
                            " #191B1F"
                        ],
                        borderColor: [
                            borderColor,
                        ],
                        borderWidth: 1
                    }]
                }}
                height={70}
                width={200}
                options={{
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },

                    hover: {
                        mode: 'index',
                        intersect: false,
                    },
                    responsive: false,
                    maintainAspectRatio: false,
                    aspectRatio: 2,
                    title: {
                        display: false
                    },
                    elements: {
                        point: {
                            radius: 0,
                            hoverRadius: 0,
                            rotation: 1,
                        }
                    },
                    plugins: {
                        tooltip: {
                            enabled: false
                        },
                        legend: {
                            display: false
                        },
                        crosshair: {
                            line: {
                                color: '#191B1F',  // crosshair line color
                                width: 0.01       // crosshair line width
                            },
                            sync: {
                                enabled: false,            // enable trace line syncing with other charts
                                group: 1,                 // chart group
                                suppressTooltips: false   // suppress tooltips when showing a synced tracer
                            },
                            zoom: {
                                enabled: false,                                      // enable zooming
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false,
                            },
                            ticks: {
                                display: false
                            },
                        },
                        y: {

                            grid: {
                                display: false,
                                drawBorder: false,
                            },
                            ticks: {
                                display: false
                            },
                        }
                    },
                }}
            />

        )
    }
}