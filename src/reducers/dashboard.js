import {
    SET_DAZZLE_STATE,
    GET_TASKS_STATUS_REQUEST,
    GET_TASKS_STATUS_RESPONSE,
    GET_USER_TASKS_COUNT_REQUEST,
    GET_USER_TASKS_COUNT_RESPONSE,
    GET_STARTED_TASKS_COUNT_REQUEST,
    GET_STARTED_TASKS_COUNT_RESPONSE
} from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    dazzle_state: {},
    tasks_status: {},
    user_tasks_count: {},
    started_tasks_count: {},
    tasksStatusFetching: false,
    userTasksFetching: false,
    startedTasksCountFetching: false,
    message_text: ""
};

export default createReducer(initialState, {
    [SET_DAZZLE_STATE]: (state, payload) =>
        Object.assign({}, state, {
            dazzle_state: payload.dazzle_state,
        }),
    [GET_TASKS_STATUS_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
            tasksStatusFetching: true
        }),
    [GET_TASKS_STATUS_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
            tasks_status: payload.tasks_status,
            tasksStatusFetching: false
        }),
    [GET_USER_TASKS_COUNT_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
            userTasksFetching: true
        }),
    [GET_USER_TASKS_COUNT_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
            user_tasks_count: payload.user_tasks_count,
            userTasksFetching: false
        }),
    [GET_STARTED_TASKS_COUNT_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
            startedTasksCountFetching: true
        }),
    [GET_STARTED_TASKS_COUNT_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
            started_tasks_count: payload.started_tasks_count,
            startedTasksCountFetching: false
        }),
});
