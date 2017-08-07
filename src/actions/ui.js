import {
    UI_OPEN_MENU,
    UI_CLOSE_MENU,
    UI_OPEN_FILTER_BUTTON_MENU,
    UI_CLOSE_FILTER_BUTTON_MENU,
    UI_OPEN_DIALOG,
    UI_OPEN_TOAST,
    UI_CLOSE_TOAST,
    UI_CLOSE_DIALOG,
    UI_NEW_EDIT_ITEM,
    UI_SET_FIELDS_ERROR
} from '../constants'

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

export function openDialogRequest(dialog_title, dialog_message) {
    const message = "Opening dialog";
    const dialog_open = true;
    return {
        type: UI_OPEN_DIALOG,
        payload: {
            message,
            dialog_open,
            dialog_title,
            dialog_message
        }
    }
}

export function closeDialogRequest() {
    const message = "Closing dialog";
    const dialog_open = false;
    return {
        type: UI_CLOSE_DIALOG,
        payload: {
            message,
            dialog_open
        }
    }
}

export function openToastRequest(toast_message){
    const message = "Opening toast";
    const toast_open = true;
    return {
        type: UI_OPEN_TOAST,
        payload: {
            message,
            toast_open,
            toast_message
        }
    }
}

export function closeToastRequest(){
    const message = "Closing toast";
    const toast_open = false;
    return {
        type: UI_CLOSE_TOAST,
        payload: {
            message,
            toast_open
        }
    }
}

export function editItems(editing, initial){
    const message = (initial)?null:"Editing task work";

    return {
        type: UI_NEW_EDIT_ITEM,
        payload: {
            editing,
            message
        }
    }
}

export function setFieldsErrors(errors){
    return {
        type: UI_SET_FIELDS_ERROR,
        payload: {
            errors
        }
    }
}