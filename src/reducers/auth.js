import {BASIC_AUTH_REQUEST, BASIC_AUTH_RESPONSE, SET_TOKEN, LOGOUT, BASIC_AUTH_ERROR} from '../constants'
import { createReducer } from '../utils/misc';

const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    error: null
};

export default createReducer(initialState, {
    [BASIC_AUTH_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: true,
            error: null
        }),
    [BASIC_AUTH_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: payload.isAuthenticated,
            token: payload.token,
            error: null
        }),
    [SET_TOKEN]: (state, payload) =>
        Object.assign({}, state, {
            token: payload.token,
            isAuthenticated: true
        }),
    [LOGOUT]: (state, payload) =>
        Object.assign({}, state, {
            token: null,
            isAuthenticated: false,
            isAuthenticating: false,
            error: null
        }),
    [BASIC_AUTH_ERROR]: (state, payload) =>
        Object.assign({}, state, {
            error: payload.error,
            token: null,
            isAuthenticated: false,
            isAuthenticating: false,
        }),
});
