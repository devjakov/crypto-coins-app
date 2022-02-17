import React from "react"
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { ChartContainer } from "../../styles/ChartContainer.styled"
import formatDate from "../../utilities/formatDate"
import nFormatter from "../../utilities/nformatter"
import formatNumber from "../../utilities/formatNumber"
import { ExternalTooltip } from "../../styles/ExternalTooltip.styled"

class BarChart extends React.Component {
    state = {
        tooltipItems: null,
        currency: null,
    }

    handleMouseLeave = (currentDate, currentPrice) => {
        this.setState({ tooltipItems: [currentDate, currentPrice] })
    }

    handleExternalTooltip = (e) => {
        const unixDate = e && parseInt(e?.tooltip.dataPoints[0]?.label)
        const hoveredPrice = e && e?.tooltip.dataPoints[0]?.raw

        if (this.state.tooltipItems[0] !== unixDate && this.state.tooltipItems[1] !== hoveredPrice)
            this.setState({ tooltipItems: [unixDate, hoveredPrice] })
    }

    componentDidUpdate(prevProps, prevState) {
        const { currency, data } = this.props
        const { tooltipItems } = this.state
        if (!tooltipItems || prevProps.currency !== this.state.currency || prevProps.data.prices[0] !== data.prices[0]) {
            console.log(prevProps.currency, this.state.currency)
            const dates = data && data.total_volumes.map((el) => el[0])
            const prices = data && data.total_volumes.map((el) => el[1].toFixed(2))

            const currentDate = data && dates.at(-1)
            const currentPrice = data && prices.at(-1)

            console.log("hello good sirs i am updating")
            console.log(currentDate, currentPrice)
            data && this.setState({ tooltipItems: [currentDate, currentPrice], currency: currency })
        }
    }

    render() {
        const { data, currency } = this.props
        const { handleMouseLeave, handleExternalTooltip } = this

        console.log(data)

        const dates = data && data.total_volumes.map((el) => el[0])

        const volume = data && data.total_volumes.map((el) => el[1].toFixed(2))

        const stateItems = data && this.state.tooltipItems

        return (
            <ChartContainer>
                <ExternalTooltip >
                    <h1>Volume</h1>
                    <p>{stateItems && `${formatNumber(null, 20, currency).replace(/[0-9]/g, '')}${nFormatter(stateItems[1], 2)}`}</p>
                    <p>{stateItems && new Date(stateItems[0]).toLocaleDateString(
                        "en-US", {
                        month: "short", day: "numeric", hourCycle: "h24", year: "2-digit", hour: "numeric", minute: "numeric"
                    })}</p>
                </ExternalTooltip>
                <Bar
                    data={{
                        labels: dates,
                        datasets: [{
                            normalized: true,
                            spanGaps: true, //for performance
                            fill: true,
                            pointRadius: 0,
                            pointBorderColor: '#00FF5F',
                            lineTension: 0,
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
                        spanGaps: true,
                        animation: false,
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
                            tooltip: {
                                enabled: false,
                                external: handleExternalTooltip,
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
                                            day: "numeric"
                                        })
                                    }
                                },
                            },
                            y: {
                                display: false,
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
}



export default BarChart