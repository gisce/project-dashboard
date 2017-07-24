import { RECEIVE_PROJECTS,
    FETCH_PROJECTS_REQUEST,
    SET_ACTIVE_PROJECT,
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_RESPONSE,
    EDIT_PROJECT,
    PATCH_PROJECT_REQUEST,
    PATCH_PROJECT_RESPONSE,
    GET_PROJECT_STATE_REQUEST,
    GET_PROJECT_STATE_RESPONSE
} from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
    active_project: null,
    message_text: null,
    editing: false
};

export default createReducer(initialState, {
    [RECEIVE_PROJECTS]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
            message_text: payload.message,
        }),
    [FETCH_PROJECTS_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            loaded: false,
            message_text: payload.message,
        }),
    [SET_ACTIVE_PROJECT]: (state, payload) =>
        Object.assign({}, state, {
            active_project: payload.active_project
        }),
    [CREATE_PROJECT_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message_text
        }),
    [CREATE_PROJECT_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message_text
        }),
    [EDIT_PROJECT]: (state, payload) =>
        Object.assign({}, state, {
            editing: payload.editing
        }),
    [PATCH_PROJECT_REQUEST]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message
        }),
    [PATCH_PROJECT_RESPONSE]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message
        })
});
