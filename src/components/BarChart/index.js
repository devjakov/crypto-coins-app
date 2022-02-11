import React from "react"
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { ChartContainer } from "../../styles/ChartContainer.styled"
import formatDate from "../../utilities/formatDate"
import nFormatter from "../../utilities/nformatter"
import formatNumber from "../../utilities/formatNumber"

const BarChart = ({ data, currency }) => {

    const dates = data && data.total_volumes.map((el) => formatDate(el[0]))
    const days = data && dates.map((date) => new Date(date).getDate())
    const volume = data && data.total_volumes.map((el) => el[1].toFixed(2))


    return (
        <ChartContainer>
            <Bar
                data={{
                    labels: days,
                    datasets: [{
                        fill: true,
                        pointRadius: 0,
                        pointBorderColor: '#00FF5F',
                        lineTension: 0.1,
                        label: 'Volume 24h',
                        data: volume,
                        backgroundColor: [
                            '#2172E5',
                        ],
                        borderColor: [
                            '#2172E5',
                        ],
                        borderWidth: 0,
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
                                color: 'blue',  // crosshair line color
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
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false,
                            },
                            ticks: {

                                maxTicksLimit: 9,
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
                        }
                    }
                }}
            />
        </ChartContainer>
    )
}

export default BarChart