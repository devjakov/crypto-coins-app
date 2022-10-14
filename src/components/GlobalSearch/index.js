import debounce from "lodash.debounce"
import React from "react";
import { useSelector } from "react-redux";
import { useMemo, useEffect, useState } from "react";
import { Search } from "../../styles/Search.styled"
import { SearchDropdown } from "../../styles/SearchDropdown.styled";
import { CoinLink } from "../../styles/table/CoinLink.styled";
import { SearchResult } from "../../styles/SearchResult.styled";


export const GlobalSearch = ({ getSearchResult }) => {
    const { searchResult, isLoading } = useSelector(state => state.searchNavBar)
    const [searchTerm, setSearchTerm] = useState("")
    const [focused, setFocused] = useState(false)

    const searchingAndFocused = searchResult && focused && searchTerm !== ""
    const options = { type: "text", placeholder: "Search..." }

    const onFocus = () => setFocused(true)
    const onBlur = debounce(() => setFocused(false), 100)

    const handleSearch = (e) => {
        const inputValue = e.target.value
        setSearchTerm(inputValue)
        if (inputValue !== "") {
            getSearchResult(inputValue);
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
            <Search onChange={debouncedResults} onFocus={onFocus} onBlur={onBlur} {...options} />
            {searchTerm !== "" ?
                <SearchDropdown style={{ position: "absolute" }}>
                    {isLoading ? <p>Loading...</p>
                        :
                        searchingAndFocused && searchResult.map(({ id, name, thumb }) =>
                            <SearchResult key={id}>
                                <CoinLink to={`/coin/${id}`}>
                                    <img src={thumb} alt="coin logo" />
                                    {name}
                                </CoinLink>
                            </SearchResult>)}
                </SearchDropdown>
                :
                null}

        </>
    )
}