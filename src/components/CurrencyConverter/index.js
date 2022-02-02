
import React from "react"
import { CurrencyConverterWrapper } from "../../styles/coin/CurrencyConverter.styled"

const CurrencyConverter = () => {



    return (
        <CurrencyConverterWrapper>
            <div>
                <p>USD</p>
                <input onChange={(e) => console.log(e.target.value)} />
            </div>
            <div >
                <p>BTC</p>
                <input onChange={(e) => console.log(e.target.value)} />
            </div>
        </CurrencyConverterWrapper>
    )
}

export default CurrencyConverter