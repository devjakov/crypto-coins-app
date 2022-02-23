import { useEffect, useState } from "react";
import axios from "axios";
import CoinTable from "../../components/CoinTable";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import { ChartWrapper } from "../../styles/ChartWrapper.styled";
import RadioButtons from "../../components/RadioButtons"


export default function Home({ currency }) {
  const [coins, setCoins] = useState(null)
  const [bitcoinChartData, setBitcoinChartData] = useState(null)
  const [selectedTimeframe, setTimeFrame] = useState(null)
  const radioButtons = [1, 7, 14, 30, 90, 180, "max"];

  const getBitcoinChart = async (currency, days) => {
    try {
      const request = axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}`);
      const response = await request;
      const bitcoinChartData = response.data;
      console.log(bitcoinChartData)

      setBitcoinChartData(bitcoinChartData);
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleSelectedTimeframe = (days) => {
    setTimeFrame(days)
    getBitcoinChart(currency, days);
  }

  const getCoins = async (currency) => {
    try {
      const request = axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`);
      const response = await request;
      const coins = response.data;

      setCoins(coins);

    }
    catch (error) {
      console.log(error)
    }
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
