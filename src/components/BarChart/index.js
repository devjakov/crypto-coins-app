import React from "react"
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { ChartContainer } from "../../styles/Chart.styled"
import formatDate from "../../utilities/formatDate"
import nFormatter from "../../utilities/nformatter"

const BarChart = ({ data }) => {
    console.log(data)
    const dates = data && data.total_volumes.map((el) => formatDate(el[0]))
    const days = data && dates.map((date) => new Date(date).getDate())
    const volume = data && data.total_volumes.map((el) => parseInt(nFormatter(el[1])))
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
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderColor: [
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1
                    }]
                }}

                options={{
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
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }}
            />
        </ChartContainer>
    )
}

export default BarChart