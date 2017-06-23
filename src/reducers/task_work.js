import { RECEIVE_TASK_WORK, FETCH_TASK_WORK_REQUEST, CREATE_TASK_WORK, PATCH_TASK_WORK } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false
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
    [CREATE_TASK_WORK]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
        }),
    [PATCH_TASK_WORK]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
        }),
});
