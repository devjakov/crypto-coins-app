import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux"
import { getBitcoinChart } from "../../store/bitcoinMarketData/bitcoinMarketDataActions"
import { getCoins } from "../../store/coins/coinsActions";
import CoinTable from "../../components/CoinTable";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import RadioButtons from "../../components/RadioButtons"
import { ChartWrapper } from "../../styles/ChartWrapper.styled";
import InfiniteScroll from 'react-infinite-scroll-component';

export function Home({ currency, getBitcoinChart, getCoins }) {
  const { coins } = useSelector(state => state.coins)
  const bitcoinChartData = useSelector(state => state.btcData.bitcoinMarketData)
  const [selectedTimeframe, setTimeFrame] = useState(null)
  const radioButtons = [1, 7, 14, 30, 90, 180, "max"];

  const handleSelectedTimeframe = (days) => {
    setTimeFrame(days)
    getBitcoinChart(currency, days);
  }

  useEffect(() => {
    getCoins(currency);
    getBitcoinChart(currency, selectedTimeframe || 1)
  }, [currency])

  return (
    <>
      <RadioButtons radioButtons={radioButtons} handleSelectedTimeframe={handleSelectedTimeframe} />
      <ChartWrapper>
        {bitcoinChartData && <LineChart currency={currency} data={bitcoinChartData} />}
        {bitcoinChartData && <BarChart currency={currency} data={bitcoinChartData} />}
      </ChartWrapper>
      <InfiniteScroll
        dataLength={coins && coins.length}
        next={() => getCoins(currency, coins.length + 40)}
        hasMore={coins && coins.length >= 100 ? false : true}
        loader={<h4>Loading...</h4>}
      >
        <CoinTable currency={currency} coins={coins} />
      </InfiniteScroll>

    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  getBitcoinChart,
  getCoins
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)