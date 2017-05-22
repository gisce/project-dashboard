import { BREADCRUMB_CLEAR, BREADCRUMB_ADD } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    breadcrumb_data: []
};

export default createReducer(initialState, {
    [BREADCRUMB_CLEAR]: (state, payload) =>
        Object.assign({}, state, {
            breadcrumb_data: [],
        }),
    [BREADCRUMB_ADD]: (state, payload) =>
        Object.assign({}, state, {
            breadcrumb_data: payload.data,
        }),
});
