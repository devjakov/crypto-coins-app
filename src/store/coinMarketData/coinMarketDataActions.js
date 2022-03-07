import axios from "axios"
import { base } from "../../utilities/coingeckoBaseAddress/coingeckoBaseAddress";
import { FETCH_COINDATA_PENDING, FETCH_COINDATA_SUCCESS, FETCH_COINDATA_ERROR } from "./coinMarketDataReducer";

export const getCoinMarketData = (coin, currency, days) => async (dispatch) => {
    dispatch({
        type: FETCH_COINDATA_PENDING
    })
    try {
        const request = axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`);
        const response = await request;
        const marketData = response.data;
        dispatch({
            type: FETCH_COINDATA_SUCCESS,
            payload: marketData
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_COINDATA_ERROR
        })
    }
}