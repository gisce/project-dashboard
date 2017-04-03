import { UI_OPEN_MENU, UI_CLOSE_MENU } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    menu_open: false
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
});
