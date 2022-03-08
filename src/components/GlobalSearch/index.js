import debounce from "lodash.debounce"
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useMemo, useEffect, useState } from "react";
import { Search } from "../../styles/Search.styled"
import { SearchDropdown } from "../../styles/SearchDropdown.styled";
import { CoinLink } from "../../styles/table/CoinLink.styled";


export const GlobalSearch = ({ getSearchResult }) => {
    const { searchResult, isLoading } = useSelector(state => state.searchNavBar)
    const [searchTerm, setSearchTerm] = useState("")
    const [focused, setFocused] = useState(false)

    console.log("this is the search result", searchResult)

    const onFocus = () => setFocused(true)
    const onBlur = debounce(() => setFocused(false), 200)

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
            <Search onChange={debouncedResults} onFocus={onFocus} onBlur={onBlur} type="text" placeholder="Search..." />
            {searchTerm !== "" ?
                <SearchDropdown style={{ position: "absolute" }}>
                    {isLoading ? "Loading..."
                        :
                        searchResult && focused && searchResult.map((coin) =>
                            <div key={coin.id}>
                                <CoinLink to={`/coin/${coin.id}`}>
                                    {coin.name}
                                </CoinLink>
                            </div>
                        )}</SearchDropdown>
                :
                undefined}

        </>
    )
}