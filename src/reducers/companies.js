import { RECEIVE_COMPANIES, FETCH_COMPANIES_REQUEST, SET_ACTIVE_COMPANY } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    active_company: null
};

export default createReducer(initialState, {
    [RECEIVE_COMPANIES]: (state, payload) =>
        Object.assign({}, state, {
            data: payload,
            isFetching: false,
            loaded: true,
            message_text: payload.message,
        }),
    [FETCH_COMPANIES_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
        }),
    [SET_ACTIVE_COMPANY]: (state, payload) =>
        Object.assign({}, state, {
            active_company: payload.active_company
        })
});
