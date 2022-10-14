const initialState = {
    coin: null,
    isLoading: false,
    error: false
}

export const FETCH_ADDASSETCOIN_SUCCESS = 'FETCH_ADDASSETCOIN_SUCCESS'
export const FETCH_ADDASSETCOIN_PENDING = 'FETCH_ADDASSETCOIN_PENDING'
export const FETCH_ADDASSETCOIN_ERROR = 'FETCH_ADDASSETCOIN_ERROR'

export default function coinReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ADDASSETCOIN_PENDING:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_ADDASSETCOIN_SUCCESS:
            return {
                ...state,
                coin: action.payload,
                isLoading: false,
                error: false,
            }
        case FETCH_ADDASSETCOIN_ERROR:
            return {
                ...state,
                isLoading: true,
                error: true,
            }
        default:
            return state
    }
}