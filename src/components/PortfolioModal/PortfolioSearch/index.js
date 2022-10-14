import debounce from "lodash.debounce"
import React from "react";
import { connect, useSelector } from "react-redux";
import { useMemo, useEffect, useState } from "react";
import { Search } from "../../../styles/Search.styled";
import { SearchDropdown } from "../../../styles/SearchDropdown.styled";
import { SearchResult } from "../../../styles/SearchResult.styled";
import getPortfolioSearchResult from "../../../store/portfolioSearchResult/portfolioSearchResultActions";

const options = { type: "text", placeholder: "Search..." }

export const PortfolioSearch = ({ getPortfolioSearchResult, handleSelectedCoin }) => {
    const { portfolioSearchResult, isLoading } = useSelector(state => state.searchPortfolio)
    const [searchTerm, setSearchTerm] = useState("")
    const [focused, setFocused] = useState(false)
    const searchingAndFocused = portfolioSearchResult && focused && searchTerm !== ""


    const onFocus = () => setFocused(true)
    const onBlur = debounce(() => setFocused(false), 100)

    const handleSearch = (e) => {
        const inputValue = e.target.value
        setSearchTerm(inputValue)
        if (inputValue !== "") {
            getPortfolioSearchResult(inputValue)
        }
    };

    const debouncedResults = useMemo(() => {
        return debounce(handleSearch, 600);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    }, [searchTerm]);

    return (
        <>
            <Search onChange={debouncedResults} onFocus={onFocus} onBlur={onBlur} {...options} required />
            {searchTerm !== "" ?
                <SearchDropdown style={{ position: "absolute" }}>
                    {isLoading ? <p>Loading...</p>
                        :
                        searchingAndFocused && portfolioSearchResult.map(({ id, name, thumb, ...rest }) =>
                            <SearchResult key={id}>
                                <a onClick={() => handleSelectedCoin(id)} id={id}>
                                    <img src={thumb} />
                                    {name}
                                </a>
                            </SearchResult>)}
                </SearchDropdown>
                :
                null}
        </>
    )
}

const mapDispatchToProps = {
    getPortfolioSearchResult
}

export default connect(null, mapDispatchToProps)(PortfolioSearch)
