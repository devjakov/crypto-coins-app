import React from "react";
import Home from "./pages/Home/index"
import Coin from "./pages/Coin/index"
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

export default class App extends React.Component {
  state = {
    currencies: null,
    currency: "usd",

  }

  getCurrencies = async () => {
    try {
      const request = axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
      const response = await request
      const currencies = response.data.filter((i) => i !== "bits" && i !== "sats" && i !== "link")
      this.setState({ currencies: currencies });
    }
    catch (error) {
      console.log(error)
    }
  }

  handleCurrency = (currency) => {
    this.setState({ currency: currency.toLowerCase() });
  }

  componentDidMount() {
    if (!this.state.currencies) {
      this.getCurrencies();
    }
  }

  render() {
    const { currencies, currency } = this.state
    return (
      <Router>
        <div>
          <NavBar handleCurrency={this.handleCurrency} currency={currency} currencies={currencies} />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/coin/:id" render={(props) => <Coin {...props} currency={currency} />} />
            <Route exact path="/" render={(props) => <Home {...props} currency={currency} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function Portfolio() {
  return <h2>This is where the portfolio will be!</h2>;
}
