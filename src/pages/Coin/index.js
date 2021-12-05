import React from "react";
import axios from "axios";

export default class Coin extends React.Component {
  state = {
    coin: null,
    error: false
  }

  getCoin = async (coinName) => {
    console.log(coinName)
    try {
      const request = axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}`);
      const response = await request;
      console.log(response.data)
      const coin = response.data
      this.setState({ coin: coin });
      this.setState({ error: false});
    }
    catch (error) {
      console.log(error)
      this.setState({ error: true});
    }
  }

  componentDidMount({ id } = this.props.match.params) {
    if (!this.state.coin) {
      this.getCoin(id);
    }
  }

  render() {
    const { coin, error } = this.state

    return (
      <div>
        {coin && !error && <h1>Hello, this is where the {coin.id} page will be</h1>}
      </div>
      );
  }
}
