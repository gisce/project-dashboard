import {UI_OPEN_MENU, UI_CLOSE_MENU} from '../constants'

export function openMenu() {
    const menu_open = true;
    return {
        type: UI_OPEN_MENU,
        payload: {
            menu_open
        }
    }
}

export function closeMenu() {
    const menu_open = false;
    return {
        type: UI_CLOSE_MENU,
        payload: {
            menu_open
        }
    }
}