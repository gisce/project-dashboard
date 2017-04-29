import { RECEIVE_USERS, FETCH_USERS_REQUEST } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [RECEIVE_USERS]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
            loaded: true,
            message_text: payload.message,
        }),
    [FETCH_USERS_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
        })
});
