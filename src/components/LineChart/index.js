import { useEffect, useState } from "react"
import { Line } from 'react-chartjs-2'
import formatNumber from "../../utilities/formatNumber"
import { ChartContainer } from "../../styles/ChartContainer.styled"
import {
    Chart as ChartJS, Interaction
} from 'chart.js';
import { CrosshairPlugin, Interpolate } from 'chartjs-plugin-crosshair';
import debounce from "lodash.debounce"
import { ExternalTooltip } from "../../styles/ExternalTooltip.styled"

ChartJS.register(CrosshairPlugin);
Interaction.modes.interpolate = Interpolate

export default function LineChart({ currency, data }) {
    const [tooltipItems, setTooltipItems] = useState(null)
    const [gradient, setGradient] = useState(null)

    const dates = data && data.prices.map((el) => el[0])
    const prices = data && data.prices.map((el) => el[1].toFixed(2))

    const currentDate = data && dates.at(-1)
    const currentPrice = data && prices.at(-1)

    const dateFormatOptions = {
        month: "short",
        day: "numeric",
        hourCycle: "h24",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric"
    }

    const handleExternalTooltip = (e) => {
        try {
            if (typeof (e) !== `undefined`) {
                const unixDate = e && parseInt(e?.tooltip.dataPoints[0]?.label)
                const hoveredPrice = e && e?.tooltip.dataPoints[0]?.raw

                if (tooltipItems[0] !== unixDate && tooltipItems[1] !== hoveredPrice) {
                    setTooltipItems([unixDate, hoveredPrice])
                }
            }
        }
        catch (e) {
            console.log("nothing in tool tip", e)
        }
    }

    const handleMouseLeave = debounce((currentDate, currentPrice) => {
        setTooltipItems([currentDate, currentPrice])
    }, 100)

    useEffect(() => {
        const canvas = document?.getElementById('line')
        const ctx = canvas?.getContext('2d')
        var gradient = ctx?.createLinearGradient(0, 0, 0, 370)
        gradient?.addColorStop(0, 'rgba(0, 255, 95, .25)')
        gradient?.addColorStop(1, 'rgba(25, 27, 31, 1)')
        setGradient(gradient)
    }, [])

    useEffect(() => {
        const dates = data && data.prices.map((el) => el[0])
        const prices = data && data.prices.map((el) => el[1].toFixed(2))
        const currentDate = data && dates.at(-1)
        const currentPrice = data && prices.at(-1)
        setTooltipItems([currentDate, currentPrice])
    }, [data])

    return (
        <ChartContainer onMouseLeave={() => handleMouseLeave(currentDate, currentPrice)} >
            <ExternalTooltip >
                <h1>BTC</h1>
                <p>{tooltipItems && formatNumber(tooltipItems[1], 20, currency)}</p>
                <p>{tooltipItems && new Date(tooltipItems[0]).toLocaleDateString(
                    "en-US", dateFormatOptions)}</p>
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
                            gradient,
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