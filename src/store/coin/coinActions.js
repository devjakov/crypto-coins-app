import axios from "axios";
import { base } from "../../utilities/coingeckoBaseAddress/coingeckoBaseAddress";
import { FETCH_COIN_PENDING, FETCH_COIN_SUCCESS, FETCH_COIN_ERROR } from "./coinReducer";

export const getCoin = (coinName) => async (dispatch) => {
    dispatch({
        type: FETCH_COIN_PENDING
    })
    try {
        const request = axios.get(`${base}/coins/${coinName}?community_data=true`);
        const response = await request;
        const coin = response.data
        dispatch({
            type: FETCH_COIN_SUCCESS,
            payload: coin
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_COIN_ERROR
        })
    }
}
