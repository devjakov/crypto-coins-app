import axios from "axios";
import { base } from "../../utilities/coingeckoBaseAddress/coingeckoBaseAddress";
import { FETCH_ADDASSETCOIN_ERROR, FETCH_ADDASSETCOIN_PENDING, FETCH_ADDASSETCOIN_SUCCESS } from "./portfolioSelectedCoinReducer";

export const portfolioGetSelectedCoin = (coinName) => async (dispatch) => {
    dispatch({
        type: FETCH_ADDASSETCOIN_PENDING
    })
    try {
        const request = axios.get(`${base}/coins/${coinName}?community_data=true`);
        const response = await request;
        const coin = response.data
        dispatch({
            type: FETCH_ADDASSETCOIN_SUCCESS,
            payload: coin
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_ADDASSETCOIN_ERROR
        })
    }
}
