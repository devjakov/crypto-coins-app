import { useEffect } from "react";
import { connect, useSelector } from "react-redux"
import Home from "./pages/Home/index"
import Coin from "./pages/Coin/index"
import Portfolio from "./pages/Portfolio";
import NavBar from "./components/NavBar";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Wrapper } from "./styles/Wrapper.styled";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getCurrencies, setCurrency } from "./store/currencies/currencyActions";

function App({ getCurrencies, setCurrency }) {
  const { currencies, currency, isLoading } = useSelector(state => state.currencies)

  const handleCurrency = (currency) => {
    setCurrency(currency)
  }

  useEffect(() => {
    getCurrencies()
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  getCurrencies,
  setCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(App)