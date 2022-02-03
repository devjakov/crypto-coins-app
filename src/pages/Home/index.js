import React from "react";
import axios from "axios";
import CoinTable from "../../components/CoinTable";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import { ChartWrapper } from "../../styles/ChartWrapper.styled";


export default class Home extends React.Component {
  state = {
    coins: null,
    bitcoinMarketChartData: null,
  }

  getBitcoinMarketChart = async (currency, days) => {
    try {
      const request = axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}`);
      const response = await request;
      const bitcoinMarketChartData = response.data;
      console.log(bitcoinMarketChartData)

      this.setState({ bitcoinMarketChartData: bitcoinMarketChartData });
    }
    catch (error) {
      console.log(error)
    }
  }

  handleChartDays = (days) => {
    const { currency } = this.props
    this.getBitcoinMarketChart(currency, days);
  }

  getCoins = async (currency) => {
    try {
      const request = axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`);
      const response = await request;
      const coins = response.data;
      const sparklines = response.data.sparkline_in_7d;
      console.log(coins)

      this.setState({ coins: coins });

    }
    catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    const { currency } = this.props
    if (!this.state.coins) {
      this.getCoins(currency);
      this.getBitcoinMarketChart(currency, 1, '');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currency } = this.props
    if (prevProps.currency !== this.props.currency) {
      this.getCoins(currency);
      this.getBitcoinMarketChart(currency, 1, '')
    }
  }

  render() {
    const { coins, bitcoinMarketChartData } = this.state;
    const { currency } = this.props
    const { handleChartDays } = this

    return (
      <>
        <ChartWrapper>
          <LineChart handleClick={handleChartDays} currency={currency} data={bitcoinMarketChartData} />
          <BarChart handleClick={handleChartDays} currency={currency} data={bitcoinMarketChartData} />
        </ChartWrapper>
        <CoinTable currency={currency} coins={coins} />
      </>
    )
  }
}