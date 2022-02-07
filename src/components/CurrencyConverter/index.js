
import React from "react"
import { CurrencyConverterWrapper } from "../../styles/coin/CurrencyConverter.styled"
import formatNumber from "../../utilities/formatNumber";

class CurrencyConverter extends React.Component {
    state = {
        values: [],
    };

    handleValues = (value, converter, currentPrice) => {
        const { currency, coin } = this.props

        if (value === 0) {
            const clearInputs = ["", ""];
            this.setState({ values: clearInputs })
            return
        }

        if (converter) {
            const valueInCurrency = value * currentPrice
            const newValues = [`${formatNumber(valueInCurrency, 20, currency)}`, `${coin.symbol.toUpperCase()} ${value}`]
            this.setState({ values: newValues })
        } else {
            const valueInCrypto = value / currentPrice
            const newValues = [`${formatNumber(value, 20, currency)}`, `${coin.symbol.toUpperCase()} ${valueInCrypto}`]
            this.setState({ values: newValues })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { currency } = this.props
        if (prevProps.currency !== this.props.currency) {
            this.handleValues(0);
        }
    }

    render() {
        const { currency, coin } = this.props
        const { values } = this.state
        const { handleValues } = this

        const currentPrice = coin && coin.market_data.current_price[currency]
        return (
            <CurrencyConverterWrapper>
                <div>
                    <p>{currency.toUpperCase()}</p>
                    <input
                        type="text"
                        value={values[0]}
                        onChange={(e) => handleValues(Math.abs(e.target.value.replace(/\D/g, '')), 0, currentPrice)}
                        placeholder={`${formatNumber(currentPrice, 20, currency)}`}
                    />
                </div>
                <div >
                    <p>{coin.symbol.toUpperCase()}</p>
                    <input
                        type="text" P
                        value={values[1]}
                        onChange={(e) => handleValues(Math.abs(e.target.value.replace(/\D/g, '')), 1, currentPrice)}
                        placeholder={`${coin.symbol.toUpperCase()} 1`}
                    />
                </div>
            </CurrencyConverterWrapper>
        )
    }
}

export default CurrencyConverter