import React from "react"
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { ChartContainer } from "../../styles/Chart.styled"
import formatDate from "../../utilities/formatDate"
import nFormatter from "../../utilities/nformatter"
import formatNumber from "../../utilities/formatNumber"

const BarChart = ({ data, currency }) => {

    const dates = data && data.total_volumes.map((el) => formatDate(el[0]))
    const days = data && dates.map((date) => new Date(date).getDate())
    const volume = data && data.total_volumes.map((el) => el[1].toFixed(2))
    console.log(volume)


    return (
        <ChartContainer>
            <Bar
                data={{
                    labels: days,
                    datasets: [{
                        label: 'Volume 24h',
                        data: volume,
                        backgroundColor: [
                            '#2172E5',
                        ],
                        borderColor: [
                            '#2172E5',
                        ],
                        borderWidth: 0
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
                    plugins: {
                        legend: {
                            display: false
                        }
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