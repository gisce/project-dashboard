import { SET_DAZZLE_STATE } from '../constants'

export function setDazzleState(newState) {
    return {
        type: SET_DAZZLE_STATE,
        payload: {
            dazzle_state: newState
        }
    }
}
