const initialState = {
    globalInfo: null,
    isLoading: false,
    error: false,
}

export const FETCH_GLOBALINFO_SUCCESS = 'FETCH_GLOBALINFO_SUCCESS'
export const FETCH_GLOBALINFO_PENDING = 'FETCH_GLOBALINFO_PENDING'
export const FETCH_GLOBALINFO_ERROR = 'FETCH_GLOBALINFO_ERROR'


export default function globalInfoReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GLOBALINFO_PENDING:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_GLOBALINFO_SUCCESS:
            return {
                ...state,
                globalInfo: action.payload,
                isLoading: false,
                error: false,
            }
        case FETCH_GLOBALINFO_ERROR:
            return {
                ...state,
                isLoading: true,
                error: true,
            }
        default:
            return state
    }
}