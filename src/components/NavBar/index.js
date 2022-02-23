import { useState, useEffect } from "react";
import { StyledLink } from "../../styles/Link.styled";
import { Nav } from "../../styles/Nav.styled";
import { NavWrapper } from "../../styles/NavWrapper.styled";
import { UnorderedList } from "../../styles/list.styled";
import { Form } from "../../styles/Form.styled";
import { Search } from "../../styles/Search.styled";
import { Select } from "../../styles/Select.styled";
import { Li } from "../../styles/Li.styled";
import { MarketsInfo } from "../../styles/MarketsInfo.styled";
import { Container, Progress } from "../../styles/ProgressBar.styled";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Price } from "../../styles/table/price.styled";
import axios from "axios";
import nFormatter from "../../utilities/nformatter";
import formatNumber from "../../utilities/formatNumber";
import roundNumber from "../../utilities/roundNumber";
import { Wrapper } from "../../styles/Wrapper.styled";
import { Circle } from "../../styles/Circle.styled";
import BitcoinPNG from "../../assets/bitcoin.png"
import EthereumPNG from "../../assets/surface1.png"


export default function NavBar({ currencies, handleCurrency, currency }) {
    const [globalInfo, setGlobalInfo] = useState(null)
    const [navBarLinks, setNavBarLinks] = useState([
        { id: "coins", to: "/", selected: false, content: "Coins" },
        { id: "portfolio", to: "/portfolio", selected: false, content: "Portfolio" }
    ])

    const { defaultCurrency, otherCurrencies } = {
        defaultCurrency: currencies && currencies.find((currency) => currency === "usd").toUpperCase(),
        otherCurrencies: currencies && currencies.filter((currency) => currency !== "usd")
    }

    const marketCap24hChange = globalInfo && globalInfo.market_cap_change_percentage_24h_usd
    const activeCryptocurrencies = globalInfo && roundNumber(globalInfo.active_cryptocurrencies, 0)
    const exchanges = globalInfo && globalInfo.markets
    const marketCap = globalInfo && globalInfo.total_market_cap.usd
    const totalVolume = globalInfo && globalInfo.total_volume.usd
    const btcDominance = globalInfo && globalInfo.market_cap_percentage.btc.toFixed(2)
    const ethDominance = globalInfo && globalInfo.market_cap_percentage.eth.toFixed(2)

    const getGlobalInfo = async () => {
        try {
            const request = axios.get(`https://api.coingecko.com/api/v3/global`);
            const response = await request;
            const globalInfo = response.data.data;
            setGlobalInfo(globalInfo);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleNavBarLinkSelect = (e) => {
        const { id } = e.target
        const selectedLink = navBarLinks.map((link) => {
            if (link.id === id && link.selected === false || link.id !== id && link.selected === true) {
                return { id: link.id, to: link.to, selected: !link.selected, content: link.content }
            }
            return link
        })
        setNavBarLinks([...selectedLink])
    }

    useEffect(() => {
        getGlobalInfo();
    }, [])


    return (
        <>
            <Nav>
                <NavWrapper maxWidth={1800}>
                    <UnorderedList>
                        {navBarLinks && navBarLinks.map((link, index) =>
                            <Li><StyledLink onClick={(e) =>
                                handleNavBarLinkSelect(e)} selected={link.selected} id={link.id} to={link.to} >{link.content}
                            </StyledLink></Li>)
                        }
                    </UnorderedList>
                    <UnorderedList>

                        <Search type="text" placeholder="Search..." />


                        <Select onChange={(e) => handleCurrency(e.target.value)}>
                            <option key={defaultCurrency}>{defaultCurrency}</option>
                            {currencies && otherCurrencies.map((currency) =>
                                <option key={currency}>{currency.toUpperCase()}
                                </option>)}
                        </Select>
                    </UnorderedList>
                </NavWrapper>
            </Nav>

            <MarketsInfo>
                <p>Coins {activeCryptocurrencies}</p>
                <p>Exchange {exchanges}</p>

                <p><Circle />

                    <span>
                        {"$" + nFormatter(marketCap, 2)}
                        <Price price={marketCap24hChange}>
                            <FontAwesomeIcon size="xs" icon={marketCap24hChange > 0 ? faCaretUp : faCaretDown} />
                            {Math.abs(marketCap24hChange).toFixed(2)}%
                        </Price>
                    </span>
                    <Circle />

                </p>

                <p>{"$" + nFormatter(totalVolume, 2)}
                    <Container width={45}>
                        <Progress percent={(totalVolume / marketCap) * 100} />
                    </Container>
                </p>

                <p>
                    <img src={BitcoinPNG} />
                    {btcDominance + "%"}
                    <Container width={45}>
                        <Progress percent={btcDominance} />
                    </Container>
                </p>

                <p>
                    <img src={EthereumPNG} />
                    {ethDominance + "%"}
                    <Container width={45}>
                        <Progress percent={ethDominance} />
                    </Container>
                </p>

            </MarketsInfo>

        </>
    )
}
