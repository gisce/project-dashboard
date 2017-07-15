import { RECEIVE_TASKS, FETCH_TASKS_REQUEST, SET_ACTIVE_TASK, CREATE_TASK_WORK_REQUEST, CREATE_TASK_WORK_RESPONSE, EDIT_TASK, PATCH_TASK_REQUEST, PATCH_TASK_RESPONSE } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    active_task: null,
    message_text: null,
    editing: false
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
        }),
    [CREATE_TASK_WORK_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message
        }),
    [CREATE_TASK_WORK_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message
        }),
    [EDIT_TASK]: (state, payload) =>
        Object.assign({}, state, {
            editing: payload.editing
        }),
    [PATCH_TASK_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message
        }),
    [PATCH_TASK_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message
        }),
});
