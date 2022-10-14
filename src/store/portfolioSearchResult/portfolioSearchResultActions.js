import axios from "axios"
import { backendBase } from "../../utilities/backendBaseAddress/backendBaseAddress";
import { FETCH_PORTFOLIOSEARCH_PENDING, FETCH_PORTFOLIOSEARCH_SUCCESS, FETCH_PORTFOLIOSEARCH_ERROR } from "./portfolioSearchResultReducer";

const getPortfolioSearchResult = (searchTerm) => async (dispatch) => {
    dispatch({
        type: FETCH_PORTFOLIOSEARCH_PENDING
    })
    try {
        const request = axios.get(`${backendBase}/${searchTerm}`);
        const result = await request
        const searchResult = result.data
        dispatch({
            type: FETCH_PORTFOLIOSEARCH_SUCCESS,
            payload: searchResult
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_PORTFOLIOSEARCH_ERROR
        })
    }
}

export default getPortfolioSearchResult