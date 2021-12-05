import { BrowserRouter as Router, Link } from "react-router-dom"

const CoinTable = ({ coins }) => {
    const formatDollar = (number, maximumSignificantDigits) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd', maximumSignificantDigits }).format(number)
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h%</th>
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
                            <td>{formatDollar(coin.current_price, 20)}</td>
                            <td>{coin.market_cap_change_percentage_24h.toFixed(2)}%</td>
                            <td>{formatDollar(coin.market_cap, 20)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CoinTable;