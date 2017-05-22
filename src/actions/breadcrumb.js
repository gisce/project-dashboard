import {BREADCRUMB_ADD, BREADCRUMB_CLEAR} from '../constants'

export function breadcrumbClear() {
    return {
        type: BREADCRUMB_CLEAR
    }
}

export function breadcrumbAdd(data) {
    return {
        type: BREADCRUMB_ADD,
        payload: {
            data
        }
    }
}