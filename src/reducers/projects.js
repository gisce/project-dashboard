import { RECEIVE_PROJECTS, FETCH_PROJECTS_REQUEST, SET_ACTIVE_PROJECT, CREATE_PROJECT } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    active_project: null,
    message_text: null
};

export default createReducer(initialState, {
    [RECEIVE_PROJECTS]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
            message_text: payload.message,
        }),
    [FETCH_PROJECTS_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
        }),
    [SET_ACTIVE_PROJECT]: (state, payload) =>
        Object.assign({}, state, {
            active_project: payload.active_project
        }),
    [CREATE_PROJECT]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message_text
        })
});
