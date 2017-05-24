import { SET_FILTERS } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    filters: {}
};

export default createReducer(initialState, {
    [SET_FILTERS]: (state, payload) =>
        Object.assign({}, state, {
            filters: payload.filters,
        })
});
