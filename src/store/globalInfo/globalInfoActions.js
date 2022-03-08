import axios from "axios";
import { base } from "../../utilities/coingeckoBaseAddress/coingeckoBaseAddress";
import { FETCH_GLOBALINFO_ERROR, FETCH_GLOBALINFO_PENDING, FETCH_GLOBALINFO_SUCCESS } from "./globalInfoReducer";

export const getGlobalInfo = () => async (dispatch) => {
    dispatch({
        type: FETCH_GLOBALINFO_PENDING
    })
    try {
        const request = axios.get(`${base}/global`);
        const response = await request;
        const globalInfo = response.data.data;
        dispatch({
            type: FETCH_GLOBALINFO_SUCCESS,
            payload: globalInfo
        })
    }
    catch (error) {
        console.log(error)
        dispatch({
            type: FETCH_GLOBALINFO_ERROR,
        })
    }
}