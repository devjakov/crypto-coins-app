import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CoinTable from "../../components/CoinTable";


export default class Home extends React.Component {
  state = {
    coins: null,
  }

  getCoins = async () => {
    try {
      const request = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false');
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
    const formatDollar = (number, maximumSignificantDigits) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd', maximumSignificantDigits }).format(number)
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h%</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins && coins.map((coin, index) =>
            <tr key={coin.id}>
              <td>{index + 1}</td>
              <td>
                <img style={{ height: 25, width: 25, marginRight: 10, marginLeft: 5 }} src={coin.image} alt={`Logo of ${coin.name}`} />
                <Link to={`/coin/${coin.id}`}>
                  {coin.name} ({coin.symbol.toUpperCase()})
                </Link>
              </td>
              <td>{formatDollar(coin.current_price, 20)}</td>
              <td>{coin.market_cap_change_percentage_24h.toFixed(2)}%</td>
              <td>{formatDollar(coin.market_cap, 20)}</td>
            </tr>
          )}
        </tbody>
      </table>


      // <>
      //   <CoinTable coins={coins} />
      // </>
    )
  }
}