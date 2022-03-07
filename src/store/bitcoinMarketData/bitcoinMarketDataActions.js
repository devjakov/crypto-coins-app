import axios from "axios"
import { base } from "../../utilities/coingeckoBaseAddress/coingeckoBaseAddress";
import { FETCH_BTCDATA_PENDING, FETCH_BTCDATA_SUCCESS, FETCH_BTCDATA_ERROR } from "./bitcoinMarketDataReducer";

export const getBitcoinChart = (currency, days) => async (dispatch) => {
    dispatch({
        type: FETCH_BTCDATA_PENDING,
    })
    try {
        const request = axios.get(`${base}/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}`);
        const response = await request;
        const bitcoinChartData = response.data;
        dispatch({
            type: FETCH_BTCDATA_SUCCESS,
            payload: bitcoinChartData
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_BTCDATA_ERROR,
        })
    }
}