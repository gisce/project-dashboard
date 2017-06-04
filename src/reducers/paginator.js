import { SET_ACTUAL_PAGE } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    actual_page: 1
};

export default createReducer(initialState, {
    [SET_ACTUAL_PAGE]: (state, payload) =>
        Object.assign({}, state, {
            actual_page: payload.actual_page
        }),
});
