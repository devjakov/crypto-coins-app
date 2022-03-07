const initialState = {
    currencies: null,
    currency: "usd",
    isLoading: false,
    error: false,
}

export const APP_FETCH_CURRENCIES_SUCCESS = 'APP_FETCH_CURRENCIES_SUCCESS'
export const APP_FETCH_CURRENCIES_PENDING = 'APP_FETCH_CURRENCIES_PENDING'
export const APP_FETCH_CURRENCIES_ERROR = 'APP_FETCH_CURRENCIES_ERROR'
export const SET_CURRENCY = "SET_CURRENCY"

export default function currencyReducer(state = initialState, action) {
    switch (action.type) {
        case APP_FETCH_CURRENCIES_PENDING:
            return {
                ...state,
                isLoading: true,
            }
        case APP_FETCH_CURRENCIES_SUCCESS:
            return {
                ...state,
                currencies: action.payload,
                isLoading: true,
                error: false,
            }
        case APP_FETCH_CURRENCIES_ERROR:
            return {
                ...state,
                isLoading: true,
                error: true,
            }
        case SET_CURRENCY:
            return {
                ...state,
                currency: action.payload
            }
        default:
            return state
    }
}