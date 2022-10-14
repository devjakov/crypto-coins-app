const initialState = {
    portfolioSearchResult: null,
    isLoading: false,
    error: false,
}

export const FETCH_PORTFOLIOSEARCH_SUCCESS = 'FETCH_PORTFOLIOSEARCH_SUCCESS'
export const FETCH_PORTFOLIOSEARCH_PENDING = 'FETCH_PORTFOLIOSEARCH_PENDING'
export const FETCH_PORTFOLIOSEARCH_ERROR = 'FETCH_PORTFOLIOSEARCH_ERROR'


export default function searchResultReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PORTFOLIOSEARCH_PENDING:
            return {
                ...state,
                isLoading: true,
            }
        case FETCH_PORTFOLIOSEARCH_SUCCESS:
            return {
                ...state,
                portfolioSearchResult: action.payload,
                isLoading: false,
                error: false,
            }
        case FETCH_PORTFOLIOSEARCH_ERROR:
            return {
                ...state,
                isLoading: true,
                error: true,
            }
        default:
            return state
    }
}