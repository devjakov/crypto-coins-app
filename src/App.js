import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {




  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>
                <Link to="/coin">Coin</Link>
              </li>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/coin">
              <Coin />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

class Home extends React.Component {
  state = {
    coins: null,
  }

  getCoins = async () => {
    const request = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false');
    const response = await request;
    console.log(response.data)
    const coins = [...response.data];
    this.setState({ coins: coins });
  }

  getCoinsNomics = async () => {
    const apiKey = "e20eaf074bd8bd6aac418016f85e73ace1ea5161"
    const request = axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false');
    const response = await request;
    console.log(response.data)
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
      <div>
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
              <tr>
                <td>{index + 1}</td>
                <td><img style={{ height: 25, width: 25, marginRight: 10, marginLeft: 5 }} src={coin.image} alt={`Logo of ${coin.name}`} />  {coin.name} {coin.symbol.toUpperCase()}</td>
                <td>{formatDollar(coin.current_price, 20)}</td>
                <td>{coin.market_cap_change_percentage_24h.toFixed(2)}%</td>
                <td>{formatDollar(coin.market_cap, 20)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

function Coin() {
  return <h2>Coin</h2>;
}

function Portfolio() {
  return <h2>Portfolio</h2>;
}
