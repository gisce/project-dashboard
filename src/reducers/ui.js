import { UI_OPEN_MENU, UI_CLOSE_MENU, UI_OPEN_FILTER_BUTTON_MENU, UI_CLOSE_FILTER_BUTTON_MENU, UI_OPEN_DIALOG, UI_OPEN_TOAST, UI_CLOSE_DIALOG, UI_CLOSE_TOAST, UI_NEW_EDIT_ITEM, UI_SET_FIELDS_ERROR } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    menu_open: false,
    filter_menu_open: false,
    dialog_open: false,
    dialog_message: "",
    dialog_title: "",
    toast_open: false,
    toast_message: "",
    fields_errors: {},
    editing: []
};

export default createReducer(initialState, {
    [UI_OPEN_MENU]: (state, payload) =>
        Object.assign({}, state, {
            menu_open: payload.menu_open,
        }),
    [UI_CLOSE_MENU]: (state, payload) =>
        Object.assign({}, state, {
            menu_open: payload.menu_open,
        }),
    [UI_OPEN_TOAST]: (state, payload) =>
        Object.assign({}, state, {
            toast_open: payload.toast_open,
            toast_message: payload.toast_message
        }),
    [UI_CLOSE_TOAST]: (state, payload) =>
        Object.assign({}, state, {
            toast_open: payload.toast_open,
            toast_message: ""
        }),
    [UI_OPEN_FILTER_BUTTON_MENU]: (state, payload) =>
        Object.assign({}, state, {
            filter_menu_open: payload.filter_menu_open,
        }),
    [UI_CLOSE_FILTER_BUTTON_MENU]: (state, payload) =>
        Object.assign({}, state, {
            filter_menu_open: payload.filter_menu_open,
        }),
    [UI_OPEN_DIALOG]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
            dialog_open: payload.dialog_open,
            dialog_message: payload.dialog_message,
            dialog_title: payload.dialog_title
        }),
    [UI_CLOSE_DIALOG]: (state, payload) =>
        Object.assign({}, state, {
            isFetching: true,
            message_text: payload.message,
            dialog_open: payload.dialog_open,
            dialog_message: "",
            dialog_title: ""
        }),
    [UI_NEW_EDIT_ITEM]: (state, payload) =>
        Object.assign({}, state, {
            message_text: payload.message,
            editing: payload.editing
        }),
    [UI_SET_FIELDS_ERROR]: (state, payload) =>
        Object.assign({}, state, {
            fields_errors: payload.errors,
        }),

});
