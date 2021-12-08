import React from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser"

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
    const checkStatus = !error && coin
    const formatNumber = (number, maximumSignificantDigits, currency = 'usd') =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumSignificantDigits }).format(number)
    const formatDate = (date) =>
      new Date(date).toUTCString();
    const roundNumber = (number, decimalPlaces) => number.toLocaleString("en", {
      maximumFractionDigits: decimalPlaces,
    });

    const homepage = checkStatus && coin.links.homepage[0]
    const coinName = checkStatus && (`${coin.name} (${coin.symbol.toUpperCase()})`)
    const coinSymbol = checkStatus && coin.symbol.toUpperCase()
    const currentPrice = checkStatus && formatNumber(coin.market_data.current_price.usd, 20)
    const priceChangePercent24h = checkStatus && (coin.market_data.price_change_percentage_24h.toFixed(2) + "%")
    const athPrice = checkStatus && formatNumber(coin.market_data.ath.usd, 20)
    const atlPrice = checkStatus && formatNumber(coin.market_data.atl.usd, 20)
    const athDate = checkStatus && formatDate(coin.market_data.ath_date.usd)
    const atlDate = checkStatus && formatDate(coin.market_data.atl_date.usd)
    const marketCap = checkStatus && formatNumber(coin.market_data.market_cap.usd, 20)
    const fullyDilutedValuation = checkStatus && (coin.market_data.fully_diluted_valuation.usd ? formatNumber(coin.market_data.fully_diluted_valuation.usd, 20) : "--")
    const totalVolume = checkStatus && formatNumber(coin.market_data.total_volume.usd, 20)
    const circulatingSupply = checkStatus && roundNumber(coin.market_data.circulating_supply, 0) + ' ' + coinSymbol
    const totalSupply = checkStatus && (coin.market_data.total_supply ? roundNumber(coin.market_data.total_supply, 0) + ' ' + coinSymbol : "∞")
    const coinDescription = checkStatus && ReactHtmlParser(coin.description.en)
    const blockchainSites = checkStatus && coin.links.blockchain_site.filter((link) => link !== "")

    checkStatus && console.log(blockchainSites)

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
                <h1>{currentPrice} <span>{priceChangePercent24h}</span></h1>
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
                <h3>Circulating Supply: {circulatingSupply}</h3>
                <h3>Total Supply: {totalSupply}</h3>
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
