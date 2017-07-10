import {FETCH_TASK_WORK_REQUEST, RECEIVE_TASK_WORK, CREATE_TASK_WORK_REQUEST, CREATE_TASK_WORK_RESPONSE, PATCH_TASK_WORK_REQUEST, PATCH_TASK_WORK_RESPONSE, DELETE_TASK_WORK_REQUEST, DELETE_TASK_WORK_RESPONSE} from "../constants";
import {define_token} from "../utils/http_functions";
import {fetchTasksRequest, receiveTasks, setActiveTask} from "./tasks";
import axios from "axios";
import {Task, TaskWork} from "../models/model";

export function fetchTaskWorkRequest(initial) {
    const message = (initial)?null:"Refreshing task work list";

    return {
        type: FETCH_TASK_WORK_REQUEST,
        payload: {
            message,
        },
    };
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

export function createTaskWorkRequest(initial){
    const message = (initial)?null:"Creating new task work";

    return {
        type: CREATE_TASK_WORK_REQUEST,
        payload: {
            message
        }
    }
}

export function createTaskWorkResponse(initial){
    const message = (initial)?null:"Task work created.";

    return {
        type: CREATE_TASK_WORK_RESPONSE,
        payload: {
            message
        }
    }
}

export function patchTaskWorkRequest(initial = false){
    const message = (initial)?null:"Patching task work";

    return {
        type: PATCH_TASK_WORK_REQUEST,
        payload: {
            message
        }
    }
}

export function patchTaskWorkResponse(initial = false){
    const message = (initial)?null:"Task work patched.";

    return {
        type: PATCH_TASK_WORK_RESPONSE,
        payload: {
            message
        }
    }
}

export function deleteTaskWorkRequest(initial = false){
    const message = (initial)?null:"Dropping task work";

    return {
        type: DELETE_TASK_WORK_REQUEST,
        payload: {
            message
        }
    }
}

export function deleteTaskWorkResponse(initial = false){
    const message = (initial)?null:"Task work dropped.";

    return {
        type: DELETE_TASK_WORK_RESPONSE,
        payload: {
            message
        }
    }
}

export function createTaskWork(token, body, reload_function, initial = false){
    return(dispatch) => {
        dispatch(createTaskWorkRequest(initial));
        define_token(token);
        let model = new TaskWork();
        model.post(body, {
            transformResponse: [function (){
                dispatch(createTaskWorkResponse(initial));
                reload_function(false);
            }]
        });
    }
}

export function patchTaskWork(token, id, body, reload_function, initial = false){
    return(dispatch) => {
        dispatch(patchTaskWorkRequest(initial));
        define_token(token);
        let model = new TaskWork();
        model.patch(id, body, {
            transformResponse: [function (){
                dispatch(patchTaskWorkResponse(initial));
                reload_function(false);
            }]
        });
    }
}

export function deleteTaskWork(token, id, reload_function, initial = false){
    return(dispatch) => {
        dispatch(deleteTaskWorkRequest(initial));
        define_token(token);
        let model = new TaskWork();
        model.delete(id, {
            transformResponse: [function (){
                dispatch(deleteTaskWorkResponse(initial));
                reload_function(false);
            }]
        });
    }
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
                            let tasks = task.parse(newData, false);
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

