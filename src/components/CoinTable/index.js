import formatNumber from "../../utilities/formatNumber";
import nFormatter from "../../utilities/nformatter";
import FastAverageColor from 'fast-average-color';
import { Progress, Container } from "../../styles/ProgressBar.styled";
import { Th } from "../../styles/table/table.th.styled";
import { Td } from "../../styles/table/table.td.styled";
import { CoinTd } from "../../styles/table/CoinTd.styled";
import { Price } from "../../styles/table/price.styled";
import { CoinLogo } from "../../styles/table/CoinLogo.styled";
import { LogoContainer } from "../../styles/table/LogoContainer.styled";
import { Table } from "../../styles/table/table.styled";
import { CoinLink } from "../../styles/table/CoinLink.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Circle } from "../../styles/Circle.styled";
import { Sparkline } from "../Sparkline/sparkline.js"
import { SparklineWrapper } from "../../styles/SparklineWrapper.styled";

const CoinTable = ({ coins, currency }) => {
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <Th>#</Th>
                        <Th>Name</Th>
                        <Th>Price</Th>
                        <Th>1h%</Th>
                        <Th>24h%</Th>
                        <Th>7d%</Th>
                        <Th>24h Volume/Market Cap</Th>
                        <Th>Circulating/Total Supply</Th>
                        <Th>Last 7d</Th>
                    </tr>
                </thead>
                <tbody>
                    {coins && coins.map((coin, index) =>
                        <tr key={coin.id}>
                            <Td>{index + 1}</Td>
                            <CoinTd>
                                <LogoContainer>
                                    <CoinLogo src={coin.image} alt={`Logo of ${coin.name}`} />
                                </LogoContainer>
                                <CoinLink to={`/coin/${coin.id}`}>
                                    {coin.name} ({coin.symbol.toUpperCase()})
                                </CoinLink>
                            </CoinTd>
                            <Td>{formatNumber(coin.current_price, 20, currency)}</Td>

                            <Td>
                                <Price price={coin.price_change_percentage_1h_in_currency}>
                                    <FontAwesomeIcon size="xs" icon={coin.price_change_percentage_1h_in_currency >= 0 ? faCaretUp : faCaretDown} />
                                    {Math.abs(coin.price_change_percentage_1h_in_currency).toFixed(2)}%
                                </Price>
                            </Td>

                            <Td>
                                <Price price={coin.price_change_percentage_24h_in_currency}>
                                    <FontAwesomeIcon size="xs" icon={coin.price_change_percentage_24h_in_currency >= 0 ? faCaretUp : faCaretDown} />
                                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                </Price>
                            </Td>

                            <Td>
                                <Price price={coin.price_change_percentage_7d_in_currency}>
                                    <FontAwesomeIcon size="xs" icon={coin.price_change_percentage_7d_in_currency >= 0 ? faCaretUp : faCaretDown} />
                                    {Math.abs(coin.price_change_percentage_7d_in_currency).toFixed(2)}%
                                </Price>
                            </Td>

                            <Td>
                                <div>
                                    <p><Circle />{nFormatter(coin.total_volume, 2)}</p>
                                    <p><Circle />{nFormatter(coin.market_cap, 2)}</p>
                                </div>
                                <Container width={80}>
                                    <Progress percent={(coin.total_volume / coin.market_cap) * 100} />
                                </Container>
                            </Td>
                            <Td>
                                <div>
                                    <p><Circle />{nFormatter(coin.circulating_supply, 2)}</p>
                                    <p><Circle />{coin.total_supply ? nFormatter(coin.total_supply, 2) : '∞'}</p>
                                </div>
                                <Container width={80}>
                                    <Progress percent={(coin.circulating_supply / coin.total_supply) * 100} />
                                </Container>
                            </Td>
                            <Td>
                                <SparklineWrapper>
                                    <Sparkline data={coin.sparkline_in_7d} last7d={coin.price_change_percentage_7d_in_currency} />
                                </SparklineWrapper>
                            </Td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default CoinTable;