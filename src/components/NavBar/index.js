import React from "react";
import { Link } from "react-router-dom"

export default class NavBar extends React.Component {

    render() {
        const { currencies, handleCurrency } = this.props

        const defaultCurrency = currencies && currencies.find((currency) => currency === "usd").toUpperCase()
        const otherCurrencies = currencies && currencies.filter((currency) => currency !== "usd")

        return (

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
        )
    }
}