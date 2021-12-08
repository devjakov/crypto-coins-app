import React from "react";
import axios from "axios";
import CoinTable from "../../components/CoinTable";


export default class Home extends React.Component {
  state = {
    coins: null,
  }

  getCoins = async () => {
    try {
      const request = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d');
      const response = await request;
      console.log(response.data)
      const coins = [...response.data];
      this.setState({ coins: coins });
    }
    catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    if (!this.state.coins) {
      this.getCoins();
    }
  }

  render() {
    const { coins } = this.state;

    return (

      <CoinTable coins={coins} />

    )
  }
}