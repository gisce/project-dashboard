import {UI_OPEN_MENU, UI_CLOSE_MENU, UI_OPEN_FILTER_BUTTON_MENU, UI_CLOSE_FILTER_BUTTON_MENU} from '../constants'

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

export function openFilterButtonMenu(){
    const filter_menu_open = true;
    return {
        type: UI_OPEN_FILTER_BUTTON_MENU,
        payload: {
            filter_menu_open
        }
    }
}

export function closeFilterButtonMenu(){
    const filter_menu_open = false;
    return {
        type: UI_CLOSE_FILTER_BUTTON_MENU,
        payload: {
            filter_menu_open
        }
    }
}