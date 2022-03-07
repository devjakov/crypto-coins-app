import { useState, useEffect } from "react"
import { CurrencyConverterWrapper } from "../../styles/coin/CurrencyConverter.styled"
import formatNumber from "../../utilities/formatNumber";

export default function CurrencyConverter({ currency, coin }) {
    const [values, setValues] = useState([])
    const currentPrice = coin && coin.market_data.current_price[currency]

    const handleValues = (value, converter, currentPrice) => {
        if (value === 0) {
            const clearInputs = ["", ""];
            setValues(clearInputs)
            return
        }
        if (converter) {
            const valueInCurrency = value * currentPrice
            const newValues = [`${formatNumber(valueInCurrency, 20, currency)}`, `${coin.symbol.toUpperCase()} ${value}`]
            setValues(newValues)
        } else {
            const valueInCrypto = value / currentPrice
            const newValues = [`${formatNumber(value, 20, currency)}`, `${coin.symbol.toUpperCase()} ${valueInCrypto}`]
            setValues(newValues)
        }
    }

    useEffect(() => {
        handleValues(0);
    }, [currency])

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