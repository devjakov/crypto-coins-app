import { useState, useEffect } from "react"
import { Line } from 'react-chartjs-2'
import formatDate from "../../utilities/formatDate"
import { ChartContainer } from "../../styles/ChartContainer.styled";
import {
    Chart as ChartJS, Interaction
} from 'chart.js';
import { CrosshairPlugin, Interpolate } from 'chartjs-plugin-crosshair';

ChartJS.register(CrosshairPlugin);
Interaction.modes.interpolate = Interpolate

export default function CoinLineChart({ data, handleClick, currency, aspectRatio }) {
    const [gradient, setGradient] = useState(null)

    const dataFiltered = data && data.prices.filter((el) => el[1] !== null)

    const prices = dataFiltered && dataFiltered.map((el) => el[1] < 1 ? el[1].toFixed(8) : el[1].toFixed(2))

    const dates = dataFiltered && dataFiltered.map((el) => formatDate(el[0]))

    useEffect(() => {
        const canvas = document.getElementById('coinChart')
        console.log(canvas.offsetHeight)
        const ctx = canvas.getContext('2d')
        var gradient = ctx.createLinearGradient(0, 0, 0, canvas.offsetHeight)
        gradient.addColorStop(0, 'rgba(255, 255, 255, .35)')
        gradient.addColorStop(1, 'rgba(31, 33, 40, 1)')
        setGradient(gradient)
    }, [])

    return (
        <ChartContainer aspectRatio={aspectRatio}>
            {data && <Line
                id='coinChart'
                data={{
                    labels: dates,
                    datasets: [{
                        fill: true,
                        pointRadius: 0,
                        pointBorderColor: '#06D554',
                        lineTension: 0.1,
                        label: 'BTC',
                        data: prices,
                        backgroundColor: [
                            gradient,
                        ],
                        borderColor: [
                            'rgba(255, 255, 255, .25)',
                        ],
                        borderWidth: 0.5
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
                    aspectRatio: aspectRatio,
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
                                color: 'rgba(6, 213, 84, .25)',  // crosshair line color
                                width: 1       // crosshair line width
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
                            backgroundColor: [
                                'rgba(25, 27, 31, .5)'
                            ],
                            padding: 10,
                            caretPadding: 20,
                            borderColor: ["rgba(6, 213, 84, .25)"],
                            borderWidth: 1,
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    return `${currency.toUpperCase()} ${tooltipItem.raw}`
                                },
                                title: function (e) {
                                    let date = new Date(e[0].label)
                                    return `${date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: "numeric" })} ${date.toLocaleTimeString('en-US')}`
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
                                display: false,
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
                            ticks: {
                                display: false,
                            },

                            grid: {
                                display: false,
                                drawBorder: false,
                            }
                        },

                    },
                }}
            />}
        </ChartContainer>
    )
}
