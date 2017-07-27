import { SET_DAZZLE_STATE } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    dazzle_state: {}
};

export default createReducer(initialState, {
    [SET_DAZZLE_STATE]: (state, payload) =>
        Object.assign({}, state, {
            dazzle_state: payload.dazzle_state,
        }),
});
