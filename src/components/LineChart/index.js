import React, { useState, useEffect } from "react"
import { getElementAtEvent, Line } from 'react-chartjs-2'
import formatDate from "../../utilities/formatDate"
import {
    Chart as ChartJS, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, Interaction, Ticks
} from 'chart.js';
import { CrosshairPlugin, Interpolate } from 'chartjs-plugin-crosshair';

ChartJS.register(CrosshairPlugin);
Interaction.modes.interpolate = Interpolate

class LineChart extends React.Component {
    gradient = null

    componentDidMount() {
        const canvas = document.getElementById('line')
        const ctx = canvas.getContext('2d')
        var gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, 'rgba(229, 239, 255, 1)')
        gradient.addColorStop(1, '#FFFFFF')
        this.gradient = gradient

    }

    render() {
        const { data, handleClick, currency } = this.props

        const dates = data && data.prices.map((el) => formatDate(el[0]))
        console.log(dates)
        const days = data && dates.map((date) => new Date(date).getDate())
        const prices = data && data.prices.map((el) => el[1].toFixed(2))
        console.log(prices)

        return (
            <div className="lineChart">
                <button onClick={() => handleClick(1)}>24h</button>
                <button onClick={() => handleClick(7)}>7d</button>
                <button onClick={() => handleClick(14)}>14d</button>
                <button onClick={() => handleClick(30)}>30d</button>
                <button onClick={() => handleClick(90)}>90d</button>
                <button onClick={() => handleClick(180)}>180d</button>
                <Line
                    id='line'
                    data={{
                        labels: dates,
                        datasets: [{
                            fill: true,
                            pointRadius: 0,
                            pointBorderColor: 'rgb(200, 0, 0)',
                            lineTension: 0.2,
                            label: 'BTC',
                            data: prices,
                            backgroundColor: [
                                this.gradient,
                            ],
                            borderColor: [
                                'rgba(75, 192, 192, 1)',
                            ],
                            borderWidth: 1
                        }]
                    }}
                    height={300}
                    width={400}
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
                        maintainAspectRatio: false,
                        aspectRatio: 1,
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
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem, data) {
                                        //console.log(tooltipItem, data)
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
                                    display: false
                                },
                                ticks: {
                                    maxTicksLimit: 8,
                                    maxRotation: 0,
                                    minRotation: 0,
                                    callback: function (e) {
                                        let date = new Date(dates[e])
                                        return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: "numeric" })

                                    }
                                },
                            },
                            y: {

                                grid: {
                                    display: false
                                }
                            }
                        },
                    }}
                />
            </div>
        )
    }
}

export default LineChart