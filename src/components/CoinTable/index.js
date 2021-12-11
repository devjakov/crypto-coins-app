import { Link } from "react-router-dom"

const CoinTable = ({ coins, currency }) => {
    const formatDollar = (number, maximumSignificantDigits, currency = "usd") =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumSignificantDigits }).format(number)

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>1h%</th>
                        <th>24h%</th>
                        <th>7d%</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {coins && coins.map((coin, index) =>
                        <tr key={coin.id}>
                            <td>{index + 1}</td>
                            <td>
                                <img style={{ height: 25, width: 25, marginRight: 10, marginLeft: 5 }} src={coin.image} alt={`Logo of ${coin.name}`} />
                                {/* // okay so im stuck here right now and have no idea why this link doesnt work but the other one does */}
                                <Link to={`/coin/${coin.id}`}>
                                    {coin.name} ({coin.symbol.toUpperCase()})
                                </Link>
                            </td>
                            <td>{formatDollar(coin.current_price, 20, currency)}</td>
                            <td>{coin.price_change_percentage_1h_in_currency.toFixed(2)}%</td>
                            <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
                            <td>{coin.price_change_percentage_7d_in_currency.toFixed(2)}%</td>
                            <td>{formatDollar(coin.market_cap, 20)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CoinTable;