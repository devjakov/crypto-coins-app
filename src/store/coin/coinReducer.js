const initialState = {
    coin: null,
    isLoading: false,
    error: false
}

export const FETCH_COIN_SUCCESS = 'FETCH_COIN_SUCCESS'
export const FETCH_COIN_PENDING = 'FETCH_COIN_PENDING'
export const FETCH_COIN_ERROR = 'FETCH_COIN_ERROR'

export default function coinReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COIN_PENDING:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_COIN_SUCCESS:
            return {
                ...state,
                coin: action.payload,
                isLoading: false,
                error: false,
            }
        case FETCH_COIN_ERROR:
            return {
                ...state,
                isLoading: true,
                error: true,
            }
        default:
            return state
    }
}