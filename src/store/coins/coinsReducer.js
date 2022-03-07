const initialState = {
    coins: null,
    isLoading: false,
    error: false
}

export const FETCH_COINS_SUCCESS = 'FETCH_COINS_SUCCESS'
export const FETCH_COINS_PENDING = 'FETCH_COINS_PENDING'
export const FETCH_COINS_ERROR = 'FETCH_COINS_ERROR'

export default function coinsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COINS_PENDING:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_COINS_SUCCESS:
            return {
                ...state,
                coins: action.payload,
                isLoading: true,
                error: false,
            }
        case FETCH_COINS_ERROR:
            return {
                ...state,
                isLoading: true,
                error: true,
            }
        default:
            return state
    }
}