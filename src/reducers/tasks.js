import { RECEIVE_TASKS, FETCH_TASKS_REQUEST, SET_ACTIVE_TASK } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    active_task: null
};

export default createReducer(initialState, {
    [RECEIVE_TASKS]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
            loaded: true,
            message_text: payload.message,
        }),
    [FETCH_TASKS_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
        }),
    [SET_ACTIVE_TASK]: (state, payload) =>
        Object.assign({}, state, {
            active_task: payload.active_task
        })
});
