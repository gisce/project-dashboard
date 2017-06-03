import { SET_FILTERS, ADD_FILTER } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    filters: {},
    search_function: null
};

export default createReducer(initialState, {
    [SET_FILTERS]: (state, payload) =>
        Object.assign({}, state, {
            filters: payload.filters,
            search_function: payload.search_function
        }),
    [ADD_FILTER]: (state, payload) =>
    Object.assign({}, state, {
        filters: Object.assign({}, state.filters, payload.filter)
    })
});
