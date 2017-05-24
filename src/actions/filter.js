import {SET_FILTERS} from '../constants'

export function setFilters(filters) {
    return {
        type: SET_FILTERS,
        payload: {
            filters
        }
    }
}
