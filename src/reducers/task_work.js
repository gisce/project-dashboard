import { RECEIVE_TASK_WORK, FETCH_TASK_WORK_REQUEST, CREATE_TASK_WORK_REQUEST, CREATE_TASK_WORK_RESPONSE, PATCH_TASK_WORK_REQUEST, PATCH_TASK_WORK_RESPONSE, DELETE_TASK_WORK_REQUEST, DELETE_TASK_WORK_RESPONSE } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    message_text: null
};

export default createReducer(initialState, {
    [RECEIVE_TASK_WORK]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
            loaded: true,
            message_text: payload.message,
        }),
    [FETCH_TASK_WORK_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
        }),
    [CREATE_TASK_WORK_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
        }),
    [PATCH_TASK_WORK_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
        }),
    [PATCH_TASK_WORK_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
        }),
    [PATCH_TASK_WORK_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
        }),
    [DELETE_TASK_WORK_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
        }),
    [DELETE_TASK_WORK_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
        }),
});
