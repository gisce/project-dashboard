import { SEARCH_PROJECTS_REQUEST, SEARCH_TASKS_REQUEST, SEARCH_USERS_REQUEST } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    searchText: ""
};

export default createReducer(initialState, {
    [SEARCH_PROJECTS_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
            searchText: payload.searchText
        }),
    [SEARCH_TASKS_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
            searchText: payload.searchText
        }),
    [SEARCH_USERS_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
            searchText: payload.searchText
        }),
});
