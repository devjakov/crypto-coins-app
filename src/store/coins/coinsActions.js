import axios from "axios";
import { base } from "../../utilities/coingeckoBaseAddress/coingeckoBaseAddress";
import { FETCH_COINS_PENDING, FETCH_COINS_SUCCESS, FETCH_COINS_ERROR } from "./coinsReducer";

export const getCoins = (currency, perPage = 20) => async (dispatch) => {
    dispatch({
        type: FETCH_COINS_PENDING
    })
    try {
        const request = axios.get(`${base}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`);
        const response = await request;
        const coins = response.data;
        dispatch({
            type: FETCH_COINS_SUCCESS,
            payload: coins
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_COINS_ERROR
        })
    }
}
