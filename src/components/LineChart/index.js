import React from "react"
import { Line } from 'react-chartjs-2'
import formatDate from "../../utilities/formatDate"
import { ChartContainer } from "../../styles/Chart.styled";
import {
    Chart as ChartJS, Interaction
} from 'chart.js';
import { CrosshairPlugin, Interpolate } from 'chartjs-plugin-crosshair';

ChartJS.register(CrosshairPlugin);
Interaction.modes.interpolate = Interpolate

class LineChart extends React.Component {
    gradient = null

    componentDidMount() {
        const canvas = document.getElementById('line')
        const ctx = canvas.getContext('2d')
        var gradient = ctx.createLinearGradient(0, 0, 0, 800)
        gradient.addColorStop(0, 'rgba(255, 255, 255, .25)')
        gradient.addColorStop(.25, 'rgba(0, 255, 95, .25)')
        gradient.addColorStop(1, 'rgba(25, 27, 31, .21)')


        this.gradient = gradient
    }

    render() {
        const { data, handleClick, currency } = this.props

        const dates = data && data.prices.map((el) => formatDate(el[0]))

        const prices = data && data.prices.map((el) => el[1].toFixed(2))

        return (
            <ChartContainer>
                <Line
                    id='line'
                    data={{
                        labels: dates,
                        datasets: [{
                            fill: true,
                            pointRadius: 0,
                            pointBorderColor: '#00FF5F',
                            lineTension: 0.1,
                            label: 'BTC',
                            data: prices,
                            backgroundColor: [
                                this.gradient,
                            ],
                            borderColor: [
                                '#00FF5F',
                            ],
                            borderWidth: 1.5
                        }]
                    }}
                    options={{
                        interaction: {
                            mode: 'index',
                            intersect: false,
                        },

                        hover: {
                            mode: 'index',
                            intersect: false,
                        },
                        responsive: true,
                        maintainAspectRatio: true,
                        aspectRatio: (16 / 9),
                        title: {
                            display: false
                        },
                        elements: {
                            point: {
                                radius: 6,
                                hoverRadius: 6,
                                rotation: 1,
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            crosshair: {
                                line: {
                                    color: 'green',  // crosshair line color
                                    width: .25       // crosshair line width
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
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem, data) {
                                        console.log(tooltipItem, data)
                                        return `${currency.toUpperCase()} ${tooltipItem.formattedValue}`
                                    },
                                    title: function (e) {
                                        let date = new Date(e[0].label)
                                        return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: "numeric" })
                                    }
                                }
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                    drawBorder: false,
                                },
                                ticks: {

                                    maxTicksLimit: 8,
                                    maxRotation: 0,
                                    minRotation: 0,
                                    callback: function (e) {
                                        let date = new Date(dates[e])
                                        return date.toLocaleDateString(
                                            "en-US", {
                                            year: 'numeric', month: 'short', day: "numeric"
                                        })

                                    }
                                },
                            },

                            y: {

                                grid: {
                                    display: false,
                                    drawBorder: false,
                                }
                            },

                        },
                    }}
                />
            </ChartContainer>
        )
    }
}

export default LineChart