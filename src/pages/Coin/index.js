import React from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser"
import formatDate from "../../utilities/formatDate";
import roundNumber from "../../utilities/roundNumber";
import formatNumber from "../../utilities/formatNumber";
import { Wrapper } from "../../styles/Wrapper.styled";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faLayerGroup, faLink, faCopy, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Circle } from "../../styles/Circle.styled";

import { CoinImageWrapper } from "../../styles/coin/coinImageWrapper.styled";
import { CoinLinkAndImage } from "../../styles/coin/CoinLinkAndImage.styled"
import { Homepage } from "../../styles/coin/Homepage.styled";
import { PriceMetrics } from "../../styles/coin/PriceMetrics.styled";
import { PriceChangePercentage } from "../../styles/coin/PriceChangePercentage.styled";
import { CoinMetrics } from "../../styles/coin/CoinMetrics.styled";
import { YourSummary } from "../../styles/coin/yourSummary.styled";
import { Description } from "../../styles/coin/Description.styled";
import { CoinLink } from "../../styles/coin/coinLink.styled";
import { CoinLinks } from "../../styles/coin/CoinLinks.styled";
import CoinLineChart from "../../components/CoinChart"
import { ChartWrapper } from "../../styles/ChartWrapper.styled";
import { RadioLabel } from "../../styles/coin/radioLabel.styled";
import { RadioWrapper } from "../../styles/coin/RadioWrapper.styled";
import RadioButtons from "../../components/RadioButtons";
import CurrencyConverter from "../../components/CurrencyConverter";

export default class Coin extends React.Component {
  state = {
    coin: null,
    error: false,
    chartData: null,
    selectedTimeframe: null
  }

  getCoin = async (coinName) => {
    try {
      const request = axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}?community_data=true`);
      const response = await request;
      const coin = response.data
      this.setState({ coin: coin });
      this.setState({ error: false });
    }
    catch (error) {
      console.log(error)
      this.setState({ error: true });
    }
  }

  getCoinMarketChart = async (coin, currency, days) => {
    console.log("I'm getting info with these", coin, currency, days)

    try {
      const request = axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`);
      const response = await request;
      const chartData = response.data;
      this.setState({ chartData: chartData });

    }
    catch (error) {
      console.log(error)
    }
  }

  handleSelectedselectedTimeframe = (days) => {
    const { id } = this.props.match.params;
    const { currency } = this.props
    this.setState({ selectedTimeframe: days })
    this.getCoinMarketChart(id, currency, days);
  }

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.props.match.params;
    const { currency } = this.props
    const { selectedTimeframe } = this.state

    if (prevProps.currency !== this.props.currency) {
      this.getCoinMarketChart(id, currency, selectedTimeframe || 7)
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { currency } = this.props
    const { selectedTimeframe } = this.state

    if (!this.state.coin) {
      console.log("getting the coin!")
      this.getCoin(id);
      this.getCoinMarketChart(id, currency, selectedTimeframe || 7)
    }
  }

  render() {
    const { coin, error, chartData } = this.state
    const { currency } = this.props
    const { handleSelectedselectedTimeframe } = this

    const radioButtons = [1, 7, 14, 30, 90, 180, "max"];

    console.log(coin)

    const checkStatus = !error && coin && chartData

    const athPrice = checkStatus && formatNumber(coin.market_data.ath[currency], 20, currency)
    const atlPrice = checkStatus && formatNumber(coin.market_data.atl[currency], 20, currency)
    const athDate = checkStatus && formatDate(coin.market_data.ath_date[currency])
    const atlDate = checkStatus && formatDate(coin.market_data.atl_date[currency])
    const totalVolume = checkStatus && formatNumber(coin.market_data.total_volume[currency], 20, currency)
    const homepage = checkStatus && coin.links.homepage[0]
    const coinName = checkStatus && (`${coin.name} (${coin.symbol.toUpperCase()})`)
    const coinSymbol = checkStatus && coin.symbol.toUpperCase()
    const currentPrice = checkStatus && formatNumber(coin.market_data.current_price[currency], 20, currency)
    const priceChangePercent24h = checkStatus && coin.market_data.price_change_percentage_24h_in_currency[currency]
    const marketCap = checkStatus && formatNumber(coin.market_data.market_cap[currency], 20, currency)
    const fullyDilutedValuation = checkStatus && (coin.market_data.fully_diluted_valuation[currency] ? formatNumber(coin.market_data.fully_diluted_valuation[currency], 20, currency) : "--")
    const circulatingSupply = checkStatus && roundNumber(coin.market_data.circulating_supply, 0)
    const totalSupply = checkStatus && (coin.market_data.total_supply ? roundNumber(coin.market_data.total_supply, 0) : "∞")
    const coinDescription = checkStatus && ReactHtmlParser(coin.description.en)
    const blockchainSites = checkStatus && coin.links.blockchain_site.filter((link) => link !== "")

    return (
      <>
        {checkStatus && chartData &&
          <>
            <Wrapper maxWidth={1500}>
              <h1 style={{ color: "white", fontWeight: "300", fontSize: "1.5rem", margin: "3rem 0" }}>Your summary</h1>
              <YourSummary>
                <CoinLinkAndImage>
                  <CoinImageWrapper>
                    <img src={coin.image.small} alt={coinName} />
                    <h1>{coinName}</h1>
                  </CoinImageWrapper>
                  <Homepage href={homepage}>{homepage.replace(/(^\w+:|^)\/\//, '')}</Homepage>
                </CoinLinkAndImage>
                <PriceMetrics>
                  <h1>{currentPrice}
                    <PriceChangePercentage price={priceChangePercent24h}>
                      <FontAwesomeIcon icon={priceChangePercent24h >= 0 ? faCaretUp : faCaretDown} />
                      {Math.abs(priceChangePercent24h).toFixed(2)}%
                    </PriceChangePercentage>
                  </h1>
                  <h3>All Time High: <span>{athPrice}</span>
                    <span>{athDate}</span>
                    <FontAwesomeIcon icon={faCaretUp} />
                  </h3>
                  <h3>All Time Low: <span>{atlPrice}</span>
                    <span>{atlDate}</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </h3>
                </PriceMetrics>
                <CoinMetrics>
                  <h3><Circle borderColor={"#06D554"} />Market Cap: <span>{marketCap}</span></h3>
                  <h3><Circle borderColor={"#06D554"} />Fully Diluted Valuation: <span>{fullyDilutedValuation}</span></h3>
                  <h3><Circle borderColor={"#06D554"} />Volume 24h: <span>{totalVolume}</span></h3>
                  <br />
                  <h3><Circle borderColor={"#06D554"} />Circulating Supply: <span>{circulatingSupply} {coinSymbol}</span></h3>
                  <h3><Circle borderColor={"#06D554"} />Total Supply: <span>{totalSupply !== '∞' ? `${totalSupply} ${coinSymbol}` : totalSupply}</span></h3>
                </CoinMetrics>
              </YourSummary>
            </Wrapper>



            <Wrapper maxWidth={1500}>
              <h1 style={{ color: "white", fontWeight: "300", fontSize: "1.5rem", margin: "3rem 0" }}>Description</h1>
              <Description>
                <FontAwesomeIcon icon={faLayerGroup} />
                {coinDescription}
              </Description>
              <CoinLinks>
                {blockchainSites.map((link, index) =>
                  <CoinLink key={index} href={link}>
                    {link.replace(/(^\w+:|^)\/\//, '')}
                  </CoinLink>)}
              </CoinLinks>
            </Wrapper>

            {RadioButtons(radioButtons, handleSelectedselectedTimeframe)}
            <CurrencyConverter currency={currency} coin={coin} />

            <ChartWrapper color={"#1F2128"}>
              <CoinLineChart aspectRatio={"3"} handleClick={handleSelectedselectedTimeframe} currency={currency} data={chartData} />
            </ChartWrapper>


          </>
        }
      </>
    );
  }
}
