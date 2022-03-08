const initialState = {
    searchResult: null,
    isLoading: false,
    error: false,
}

export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS'
export const FETCH_SEARCH_PENDING = 'FETCH_SEARCH_PENDING'
export const FETCH_SEARCH_ERROR = 'FETCH_SEARCH_ERROR'


export default function searchResultReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SEARCH_PENDING:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_SEARCH_SUCCESS:
            return {
                ...state,
                searchResult: action.payload,
                isLoading: false,
                error: false,
            }
        case FETCH_SEARCH_ERROR:
            return {
                ...state,
                isLoading: true,
                error: true,
            }
        default:
            return state
    }
}