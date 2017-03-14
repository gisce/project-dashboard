import {FETCH_PROJECT_REQUEST, RECEIVE_PROJECT} from '../constants'
import {parseJSON} from '../utils/misc'

export function receiveProject(data, initial) {
    const message = (initial)?null:"Refreshing project";
    return {
        type: RECEIVE_PROJECT,
        payload: {
            data
        }
    }
}