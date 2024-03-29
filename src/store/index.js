import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import reduxThunk from "redux-thunk"
import currencies from "./currencies/currencyReducer"
import globalInfo from "./globalInfo/globalInfoReducer"
import btcData from "./bitcoinMarketData/bitcoinMarketDataReducer"
import coinData from "./coinMarketData/coinMarketDataReducer"
import coins from "./coins/coinsReducer"
import coin from "./coin/coinReducer"
import portfolioSelectedCoin from "./portfolioSelectedCoin/portfolioSelectedCoinReducer"
import searchNavBar from "./searchResult/searchResultReducer"
import searchPortfolio from "./portfolioSearchResult/portfolioSearchResultReducer"

const reducers = combineReducers({
    currencies, globalInfo, btcData, coinData, coins, coin, searchNavBar, searchPortfolio, portfolioSelectedCoin
})

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        })
        : compose;

const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk)
);

export default createStore(
    reducers,
    enhancer
);