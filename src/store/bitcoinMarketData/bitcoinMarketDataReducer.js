const initialState = {
    bitcoinMarketData: null,
    isLoading: false,
    error: false
}

export const FETCH_BTCDATA_SUCCESS = 'FETCH_BTCDATA_SUCCESS'
export const FETCH_BTCDATA_PENDING = 'FETCH_BTCDATA_PENDING'
export const FETCH_BTCDATA_ERROR = 'FETCH_BTCDATA_ERROR'

export default function bitcoinMarketDataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_BTCDATA_PENDING:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_BTCDATA_SUCCESS:
            console.log(action, "i'm here")
            return {
                ...state,
                bitcoinMarketData: action.payload,
                isLoading: true,
                error: false,
            }
        case FETCH_BTCDATA_ERROR:
            return {
                ...state,
                isLoading: true,
                error: true,
            }
        default:
            return state
    }
}