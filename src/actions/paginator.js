import { SET_ACTUAL_PAGE } from '../constants'

export function setActualPage(actual_page) {
    return {
        type: SET_ACTUAL_PAGE,
        payload: {
            actual_page
        }
    }
}