const initialState = {
    coinMarketData: null,
    isLoading: false,
    error: false
}

export const FETCH_COINDATA_SUCCESS = 'FETCH_COINDATA_SUCCESS'
export const FETCH_COINDATA_PENDING = 'FETCH_COINDATA_PENDING'
export const FETCH_COINDATA_ERROR = 'FETCH_COINDATA_ERROR'

export default function coinMarketDataReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COINDATA_PENDING:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_COINDATA_SUCCESS:
            return {
                ...state,
                coinMarketData: action.payload,
                isLoading: true,
                error: false,
            }
        case FETCH_COINDATA_ERROR:
            return {
                ...state,
                isLoading: true,
                error: true,
            }
        default:
            return state
    }
}