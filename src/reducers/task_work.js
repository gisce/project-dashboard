import { RECEIVE_TASK_WORK, FETCH_TASK_WORK_REQUEST, UI_OPEN_TASK_WORK_DIALOG, UI_CLOSE_TASK_WORK_DIALOG } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    dialog_open: false
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
    [UI_OPEN_TASK_WORK_DIALOG]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
            dialog_open: payload.dialog_open
        }),
    [UI_CLOSE_TASK_WORK_DIALOG]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
            dialog_open: payload.dialog_open
        }),
});
