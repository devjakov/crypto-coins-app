import React from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import nFormatter from "../../utilities/nformatter";
import formatNumber from "../../utilities/formatNumber";
import roundNumber from "../../utilities/roundNumber";

export default class NavBar extends React.Component {
    state = {
        globalInfo: null,
    }

    getGlobalInfo = async () => {
        try {
            const request = axios.get(`https://api.coingecko.com/api/v3/global`);
            const response = await request;
            const globalInfo = response.data.data;
            console.log(globalInfo)
            this.setState({ globalInfo: globalInfo });
        }
        catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        if (!this.state.globalInfo) {
            this.getGlobalInfo();
        }
    }

    render() {
        const { currencies, handleCurrency, currency } = this.props
        const { globalInfo } = this.state

        //const defaultCurrency = currencies && currencies.find((currency) => currency === "usd").toUpperCase()
        //const otherCurrencies = currencies && currencies.filter((currency) => currency !== "usd")

        const { defaultCurrency, otherCurrencies } = {
            defaultCurrency: currencies && currencies.find((currency) => currency === "usd").toUpperCase(),
            otherCurrencies: currencies && currencies.filter((currency) => currency !== "usd")
        }

        const activeCryptocurrencies = globalInfo && roundNumber(globalInfo.active_cryptocurrencies, 0)
        const exchanges = globalInfo && globalInfo.markets
        const marketCap = globalInfo && "$" + nFormatter(globalInfo.total_market_cap.usd, 2)
        const totalVolume = globalInfo && "$" + nFormatter(globalInfo.total_volume.usd, 2)

        return (
            <>
                <nav>
                    <ul className="pageNavigationButtons">
                        <li>
                            <Link to="/">Coins</Link>
                        </li>
                        <li>
                            <Link to="/portfolio">Portfolio</Link>
                        </li>
                    </ul>
                    <form>
                        <input type="text" placeholder="Search.." />
                    </form>
                    <select onChange={(e) => handleCurrency(e.target.value)}>
                        <option key={defaultCurrency}>{defaultCurrency}</option>
                        {currencies && otherCurrencies.map((currency) => <option key={currency}>{currency.toUpperCase()}</option>)}
                    </select>
                </nav>
                <div className="infoUnderNavBar">
                    <p>Coins {activeCryptocurrencies}</p>
                    <p>Exchange {exchanges}</p>
                    <p>{marketCap}</p>
                    <p>{totalVolume}</p>
                </div>
            </>
        )
    }
}