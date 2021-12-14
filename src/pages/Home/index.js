import React from "react";
import axios from "axios";
import CoinTable from "../../components/CoinTable";


export default class Home extends React.Component {
  state = {
    coins: null,
  }

  getCoins = async (currency) => {
    try {
      const request = axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`);
      const response = await request;
      const coins = [...response.data];
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
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currency !== this.props.currency) {
      this.getCoins(this.props.currency);
    }
  }

  render() {
    const { coins } = this.state;
    const { currency } = this.props

    return (

      <CoinTable currency={currency} coins={coins} />

    )
  }
}