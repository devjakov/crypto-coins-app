import { useEffect, useState } from "react";
import Home from "./pages/Home/index"
import Coin from "./pages/Coin/index"
import NavBar from "./components/NavBar";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Wrapper } from "./styles/Wrapper.styled";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

export default function App() {
  const [currencies, setCurrencies] = useState(null)
  const [currency, setCurrency] = useState("usd")

  const getCurrencies = async () => {
    try {
      const request = axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
      const response = await request
      const currencies = response.data.filter((i) => i !== "bits" && i !== "sats" && i !== "link")
      setCurrencies(currencies);
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleCurrency = (currency) => {
    setCurrency(currency.toLowerCase());
  }

  useEffect(() => {
    getCurrencies();
  }, [])

  return (
    <Router>
      <GlobalStyle>
        <NavBar handleCurrency={handleCurrency} currency={currency} currencies={currencies} />
        <Wrapper maxWidth={1800}>
          <Switch>
            <Route path="/portfolio">
              <Portfolio />
            </Route>
            <Route path="/coin/:id" render={(props) => <Coin {...props} currency={currency} />} />
            <Route exact path="/" render={(props) => <Home {...props} currency={currency} />} />
          </Switch>
        </Wrapper>
      </GlobalStyle>
    </Router>
  );
}


function Portfolio() {
  return <h2>This is where the portfolio will be!</h2>;
}
