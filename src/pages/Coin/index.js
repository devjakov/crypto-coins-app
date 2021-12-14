import React from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser"
import formatDate from "../../utilities/formatDate";
import roundNumber from "../../utilities/roundNumber";
import formatNumber from "../../utilities/formatNumber";

export default class Coin extends React.Component {
  state = {
    coin: null,
    error: false
  }

  getCoin = async (coinName) => {
    console.log(coinName)
    try {
      const request = axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}?community_data=true`);
      const response = await request;
      console.log(response.data)
      const coin = response.data
      this.setState({ coin: coin });
      this.setState({ error: false });
    }
    catch (error) {
      console.log(error)
      this.setState({ error: true });
    }
  }

  componentDidMount({ id } = this.props.match.params) {
    if (!this.state.coin) {
      this.getCoin(id);
    }
  }

  render() {
    const { coin, error } = this.state
    const { currency } = this.props

    const checkStatus = !error && coin

    const athPrice = checkStatus && formatNumber(coin.market_data.ath[currency], 20, currency)
    const atlPrice = checkStatus && formatNumber(coin.market_data.atl[currency], 20, currency)
    const athDate = checkStatus && formatDate(coin.market_data.ath_date[currency])
    const atlDate = checkStatus && formatDate(coin.market_data.atl_date[currency])
    const totalVolume = checkStatus && formatNumber(coin.market_data.total_volume[currency], 20, currency)
    const homepage = checkStatus && coin.links.homepage[0]
    const coinName = checkStatus && (`${coin.name} (${coin.symbol.toUpperCase()})`)
    const coinSymbol = checkStatus && coin.symbol.toUpperCase()
    const currentPrice = checkStatus && formatNumber(coin.market_data.current_price[currency], 20, currency)
    const priceChangePercent24h = checkStatus && (coin.market_data.price_change_percentage_24h.toFixed(2))
    const marketCap = checkStatus && formatNumber(coin.market_data.market_cap[currency], 20, currency)
    const fullyDilutedValuation = checkStatus && (coin.market_data.fully_diluted_valuation[currency] ? formatNumber(coin.market_data.fully_diluted_valuation[currency], 20, currency) : "--")
    const circulatingSupply = checkStatus && roundNumber(coin.market_data.circulating_supply, 0)
    const totalSupply = checkStatus && (coin.market_data.total_supply ? roundNumber(coin.market_data.total_supply, 0) : "∞")
    const coinDescription = checkStatus && ReactHtmlParser(coin.description.en)
    const blockchainSites = checkStatus && coin.links.blockchain_site.filter((link) => link !== "")

    return (
      <div>
        {checkStatus &&
          <>
            <h1>Your summary</h1>
            <div className="coinDetailsContainer">
              <div className="coinImageWrapper">
                <img src={coin.image.small} alt={coinName} />
                <h1>{coinName}</h1>
              </div>
              <a href={homepage}>{homepage}</a>
              <div className="pricesInfo">
                <h1>{currentPrice} <span>{priceChangePercent24h}%</span></h1>
                <h3>All Time High: {athPrice}</h3>
                <h3>{athDate}</h3>
                <h3>All Time Low: {atlPrice}</h3>
                <h3>{atlDate}</h3>
              </div>
              <div className="coinMetrics">
                <h3>Market Cap: {marketCap}</h3>
                <h3>Fully Diluted Valuation: {fullyDilutedValuation}</h3>
                <h3>Volume 24h: {totalVolume}</h3>
                <br />
                <h3>Circulating Supply: {circulatingSupply} {coinSymbol}</h3>
                <h3>Total Supply: {totalSupply !== '∞' ? `${totalSupply} ${coinSymbol}` : totalSupply}</h3>
              </div>
              <h1>Description</h1>
              <div className="coinDescription">
                {coinDescription}
              </div>
              <div className="coinLinks">
                {blockchainSites.map((link) => <a href={link}>{link}</a>)}
              </div>
            </div>
          </>
        }
      </div>
    );
  }
}
