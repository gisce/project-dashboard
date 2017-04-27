import {FETCH_TASK_WORK_REQUEST, RECEIVE_TASK_WORK, UI_OPEN_TASK_WORK_DIALOG, UI_CLOSE_TASK_WORK_DIALOG} from '../constants'
import {redirectToRoute, getTaskWorks} from '../utils/http_functions'
import {parseJSON, parseWorkdones} from '../utils/misc'
import axios  from 'axios'

export function fetchTaskWorkRequest(initial) {
    const message = (initial)?null:"Refreshing task work list";

    return {
        type: FETCH_TASK_WORK_REQUEST,
        payload: {
            message,
        },
    };
}

export function openTaskWorkDialogRequest() {
    const message = "Opening task work dialog";
    const dialog_open = true;
    return {
        type: UI_OPEN_TASK_WORK_DIALOG,
        payload: {
            message,
            dialog_open
        }
    }
}

export function closeTaskWorkDialogRequest() {
    const message = "Closing task work dialog";
    const dialog_open = false;
    return {
        type: UI_CLOSE_TASK_WORK_DIALOG,
        payload: {
            message,
            dialog_open
        }
    }
}

export function receiveTaskWork(taskWorks, initial) {
    const message = (initial)?null:"Tasks work list updated";
    return {
        type: RECEIVE_TASK_WORK,
        payload: {
            taskWorks,
            message,
        },
    };
}

export function fetchTaskWorks(token, task_id, initial = false) {
    return (dispatch) => {
        dispatch(fetchTaskWorkRequest(initial));
        dispatch(redirectToRoute("/task"));
        axios.get("http://localhost:5000/project.task.work?schema=name,hours,user_id.name,task_id.name,date,project_id.name&filter=[('task_id','=',"+ task_id +")]")
            .then(parseJSON)
            .then(response => {
                dispatch(receiveTaskWork(parseWorkdones(response), initial));
            })
            .catch(error => {
                console.log("API ERROR", error);
            });
    }
}

export function openTaskWorkDialog(){
    return (dispatch) => {
        dispatch(openTaskWorkDialogRequest());
    }
}

export function closeTaskWorkDialog(){
    return (dispatch) => {
        dispatch(closeTaskWorkDialogRequest());
    }
}

