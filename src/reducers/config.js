import { SET_ITEMS_PER_PAGE } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    items_per_page: 10
};

export default createReducer(initialState, {
    [SET_ITEMS_PER_PAGE]: (state, payload) =>
        Object.assign({}, state, {
            items_per_page: payload.items_per_page
        }),
});
