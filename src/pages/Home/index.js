import { useEffect, useState } from "react";
import axios from "axios";
import { connect, useSelector } from "react-redux"
import { getBitcoinChart } from "../../store/bitcoinMarketData/bitcoinMarketDataActions"
import { getCoins } from "../../store/coins/coinsActions";
import CoinTable from "../../components/CoinTable";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import RadioButtons from "../../components/RadioButtons"
import { ChartWrapper } from "../../styles/ChartWrapper.styled";


export function Home({ currency, getBitcoinChart, getCoins }) {
  const { coins } = useSelector(state => state.coins)
  const bitcoinChartData = useSelector(state => state.btcData.bitcoinMarketData)
  const [selectedTimeframe, setTimeFrame] = useState(null)
  const radioButtons = [1, 7, 14, 30, 90, 180, "max"];

  const handleSelectedTimeframe = (days) => {
    setTimeFrame(days)
    getBitcoinChart(currency, days);
  }

  useEffect(() => {
    getCoins(currency);
    getBitcoinChart(currency, selectedTimeframe || 1);
  }, [])

  useEffect(() => {
    getCoins(currency);
    getBitcoinChart(currency, selectedTimeframe || 1)
  }, [currency])

  return (
    <>
      {RadioButtons(radioButtons, handleSelectedTimeframe)}
      <ChartWrapper>
        {bitcoinChartData && <LineChart currency={currency} data={bitcoinChartData} />}
        {bitcoinChartData && <BarChart currency={currency} data={bitcoinChartData} />}
      </ChartWrapper>
      <CoinTable currency={currency} coins={coins} />
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  getBitcoinChart,
  getCoins
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)