import { RECEIVE_PROJECT, FETCH_PROJECT_REQUEST } from '../constants';
import { createReducer } from '../utils/misc'

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
   [FETCH_PROJECT_REQUEST]: (state, payload) =>
       Object.assign({}, state, {
           isFetching: true,
           message_text: payload.message
       }),
    [RECEIVE_PROJECT]: (state, payload) =>
       Object.assign({}, state, {
           data: payload.data,
           isFetching: false,
           loaded: true,
           message_text: payload.message,
       }),
});