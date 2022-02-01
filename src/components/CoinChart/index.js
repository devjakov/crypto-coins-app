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

class CoinLineChart extends React.Component {
    gradient = null

    componentDidMount() {
        const { aspectRatio } = this.props
        const canvas = document.getElementById('line')
        const ctx = canvas.getContext('2d')
        var gradient = ctx.createLinearGradient(0, 0, 0, (1800 / aspectRatio))
        gradient.addColorStop(0, 'rgba(255, 255, 255, .35)')
        gradient.addColorStop(1, 'rgba(200, 205, 205, .05)')

        this.gradient = gradient
    }

    render() {

        const { data, handleClick, currency, aspectRatio } = this.props

        const dataFiltered = data && data.prices.filter((el) => el[1] !== null)
        console.log("hello sirdsds", dataFiltered)

        const prices = dataFiltered && dataFiltered.map((el) => el[1] < 1 ? el[1].toFixed(6) : el[1].toFixed(2))

        const dates = dataFiltered && dataFiltered.map((el) => formatDate(el[0]))

        //okay rewrite this so it just splices from original data and GG
        //okay so basically i know how to filter null from prices but then i have to filter out the unnecessary dates from dates, cheers

        return (
            <ChartContainer aspectRatio={aspectRatio}>
                <label for="bla" style={{ display: "inline-flex" }}>
                    <input style={{ display: "none" }} id="bla" type="radio" onClick={() => handleClick(1)} />
                    <div style={{ width: "1rem", height: "1rem", border: "2px solid green", borderRadius: "50%" }}></div>
                    24h
                </label>

                {/* make component for buttons, make the radio button look cool, position them, 
                then later make tooltips callback update in state and format it properly */}

                <button onClick={() => handleClick(7)}>7d</button>
                <button onClick={() => handleClick(30)}>30d</button>
                <button onClick={() => handleClick(90)}>90d</button>
                <button onClick={() => handleClick(180)}>180d</button>
                <button onClick={() => handleClick("max")}>Max</button>
                {data && <Line
                    id='line'
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
                                this.gradient,
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
                                        //console.log(tooltipItem, data)
                                        return `${currency.toUpperCase()} ${tooltipItem.formattedValue}`
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
}

export default CoinLineChart