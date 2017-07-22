import { RECEIVE_USERS, FETCH_USERS_REQUEST,SHOW_ALL_USER_TASKS_FLAG } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    allTasks: false
};

export default createReducer(initialState, {
    [RECEIVE_USERS]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.users,
            isFetching: false,
            loaded: true,
            message_text: payload.message,
        }),
    [FETCH_USERS_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
        }),
    [SHOW_ALL_USER_TASKS_FLAG]: (state, payload) =>
        Object.assign({}, state, {
            allTasks: payload.flag,
            message_text: payload.message,
        })
});
