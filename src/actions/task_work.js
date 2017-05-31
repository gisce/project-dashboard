import {FETCH_TASK_WORK_REQUEST, RECEIVE_TASK_WORK, UI_OPEN_TASK_WORK_DIALOG, UI_CLOSE_TASK_WORK_DIALOG} from '../constants';
import {redirectToRoute, getTaskWorks, define_token} from '../utils/http_functions';
import {parseJSON, parseWorkdones, parseTasks} from '../utils/misc';
import {fetchTasksRequest, receiveTasks, setActiveTask} from './tasks';
import axios  from 'axios';
import { Task, TaskWork } from '../models/model';

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

export function fetchTaskWorks(token, task_id, active_task, initial = false) {
    return (dispatch) => {
        if(!axios.defaults.headers.common['Authorization']){
            define_token(token);
        }
        dispatch(fetchTaskWorkRequest(initial));
        let model = new TaskWork();
        model.search([["task_id", "=", parseInt(task_id, 10)]], {
            transformResponse: [function (data){
                let newData = JSON.parse(data);
                let results = model.parse(newData, false);
                dispatch(receiveTaskWork(results, initial));
                if (active_task) {
                    /*
                     * If there's not any active_task, it's necessary to fetch the task to retrieve extra task info.
                     * It may be possible with a single api call. TODO
                     * */
                    let task = new Task();
                    dispatch(fetchTasksRequest(initial));
                    task.search([["id", "=", parseInt(task_id, 10)]], {
                        transformResponse: [function (data) {
                            let newData = JSON.parse(data);
                            let tasks = parseTasks(newData, false);
                            dispatch(receiveTasks(tasks, initial));
                            dispatch(setActiveTask(tasks[0]));
                        }]
                    });
                }
            }]
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

