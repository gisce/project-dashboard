import {BASIC_AUTH_REQUEST, BASIC_AUTH_RESPONSE} from '../constants'
import { createReducer } from '../utils/misc';

const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
};

export default createReducer(initialState, {
    [BASIC_AUTH_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: true,
        }),
    [BASIC_AUTH_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: payload.isAuthenticated,
            token: payload.token
        }),
});
