import { UI_OPEN_MENU, UI_CLOSE_MENU, UI_OPEN_FILTER_BUTTON_MENU, UI_CLOSE_FILTER_BUTTON_MENU } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    menu_open: false,
    filter_menu_open: false
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
    [UI_OPEN_FILTER_BUTTON_MENU]: (state, payload) =>
        Object.assign({}, state, {
            filter_menu_open: payload.filter_menu_open,
        }),
    [UI_CLOSE_FILTER_BUTTON_MENU]: (state, payload) =>
        Object.assign({}, state, {
            filter_menu_open: payload.filter_menu_open,
        })
});
