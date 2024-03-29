import axios from "axios"
import { backendBase } from "../../utilities/backendBaseAddress/backendBaseAddress";
import { FETCH_SEARCH_PENDING, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR } from "./searchResultReducer";

export const getSearchResult = (searchTerm) => async (dispatch) => {
    dispatch({
        type: FETCH_SEARCH_PENDING
    })
    try {
        const request = axios.get(`${backendBase}/${searchTerm}`);
        const result = await request
        const searchResult = result.data
        dispatch({
            type: FETCH_SEARCH_SUCCESS,
            payload: searchResult
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_SEARCH_ERROR
        })
    }
}