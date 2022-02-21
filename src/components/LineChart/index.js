import React from "react"
import { Line } from 'react-chartjs-2'
import formatDate from "../../utilities/formatDate"
import formatNumber from "../../utilities/formatNumber"
import { ChartContainer } from "../../styles/ChartContainer.styled"
import {
    Chart as ChartJS, Interaction
} from 'chart.js';
import { CrosshairPlugin, Interpolate } from 'chartjs-plugin-crosshair';
import debounce from "lodash.debounce"
import { functionsIn } from "lodash";
import { ExternalTooltip } from "../../styles/ExternalTooltip.styled"

ChartJS.register(CrosshairPlugin);
Interaction.modes.interpolate = Interpolate

class LineChart extends React.Component {
    state = {
        tooltipItems: null,
        currency: null,
    }

    gradient = null

    componentDidMount() {
        const canvas = document?.getElementById('line')
        const ctx = canvas?.getContext('2d')
        var gradient = ctx?.createLinearGradient(0, 0, 0, 370)
        gradient?.addColorStop(0, 'rgba(0, 255, 95, .25)')
        gradient?.addColorStop(1, 'rgba(25, 27, 31, 1)')

        this.gradient = gradient
    }

    handleMouseLeave = debounce((currentDate, currentPrice) => {
        this.setState({ tooltipItems: [currentDate, currentPrice] })
    }, 100)

    handleExternalTooltip = (e) => {
        console.log(e)
        try {
            if (typeof (e) !== `undefined`) {
                const unixDate = e && parseInt(e?.tooltip.dataPoints[0]?.label)
                const hoveredPrice = e && e?.tooltip.dataPoints[0]?.raw

                if (this.state.tooltipItems[0] !== unixDate && this.state.tooltipItems[1] !== hoveredPrice) {
                    this.setState({ tooltipItems: [unixDate, hoveredPrice] })
                }
            }
        }
        catch (e) {
            console.log("nothing in tool tip", e)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { currency, data } = this.props
        const { tooltipItems } = this.state
        console.log(this.gradient)
        if (!tooltipItems || prevProps.currency !== this.state.currency || prevProps.data.prices[0] !== data.prices[0]) {
            console.log(prevProps.currency, this.state.currency)
            const dates = data && data.prices.map((el) => el[0])
            const prices = data && data.prices.map((el) => el[1].toFixed(2))

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

        const dates = data && data.prices.map((el) => el[0])
        const prices = data && data.prices.map((el) => el[1].toFixed(2))

        console.log(dates, prices)

        const currentDate = data && dates.at(-1)
        const currentPrice = data && prices.at(-1)

        const stateItems = data && this.state.tooltipItems

        return (
            <ChartContainer onMouseLeave={() => handleMouseLeave(currentDate, currentPrice)} >
                <ExternalTooltip >
                    <h1>BTC</h1>
                    <p>{stateItems && formatNumber(stateItems[1], 20, currency)}</p>
                    <p>{stateItems && new Date(stateItems[0]).toLocaleDateString(
                        "en-US", {
                        month: "short", day: "numeric", hourCycle: "h24", year: "2-digit", hour: "numeric", minute: "numeric"
                    })}</p>
                </ExternalTooltip>
                {currency && <Line
                    onMouseLeave={() => handleMouseLeave(currentDate, currentPrice)}
                    id='line'
                    data={{
                        labels: dates,
                        datasets: [{
                            normalized: true,
                            spanGaps: true, //for performance
                            fill: true,
                            pointRadius: 0,
                            pointBorderColor: '#00FF5F',
                            lineTension: 0,
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
                                enabled: false,
                                external: data && handleExternalTooltip,
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                    drawBorder: false,
                                },
                                ticks: {
                                    maxTicksLimit: 16,
                                    maxRotation: 0,
                                    minRotation: 0,
                                    callback: function (e) {
                                        let date = new Date(dates[e])
                                        return date.toLocaleDateString(
                                            "en-US", {
                                            day: "numeric",
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
                            },

                        },
                    }}
                />}
            </ChartContainer>
        )
    }
}

export default LineChart