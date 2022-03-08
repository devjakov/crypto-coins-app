import axios from "axios"
import { APP_FETCH_CURRENCIES_SUCCESS, APP_FETCH_CURRENCIES_PENDING, APP_FETCH_CURRENCIES_ERROR, SET_CURRENCY } from "./currencyReducer";

export const getCurrencies = () => async (dispatch) => {
    dispatch({
        type: APP_FETCH_CURRENCIES_PENDING
    })
    try {
        const request = axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
        const response = await request
        const currencies = response.data.filter((i) => i !== "bits" && i !== "sats" && i !== "link")
        dispatch({
            type: APP_FETCH_CURRENCIES_SUCCESS,
            payload: currencies
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: APP_FETCH_CURRENCIES_ERROR
        })
    }

}

export const setCurrency = (currency) => {
    return {
        type: SET_CURRENCY,
        payload: currency.toLowerCase()
    }
}