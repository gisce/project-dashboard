import { SET_ITEMS_PER_PAGE } from '../constants'

export function setItemsPerPage(items_per_page) {
    return {
        type: SET_ITEMS_PER_PAGE,
        payload: {
            items_per_page
        }
    }
}