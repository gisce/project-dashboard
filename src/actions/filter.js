import { SET_FILTERS, ADD_FILTER } from '../constants'

export function setFilters(filters, search_function) {
    return {
        type: SET_FILTERS,
        payload: {
            filters,
            search_function
        }
    }
}

export function addFilter(filter) {
    return {
        type: ADD_FILTER,
        payload: {
            filter
        }
    }
}
