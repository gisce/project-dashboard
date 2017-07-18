import {
    FETCH_TASKS_REQUEST,
    RECEIVE_TASKS,
    SET_ACTIVE_TASK,
    CREATE_TASK_REQUEST,
    CREATE_TASK_RESPONSE,
    EDIT_TASK,
    PATCH_TASK_REQUEST,
    PATCH_TASK_RESPONSE,
    OPEN_TASK_REQUEST,
    OPEN_TASK_RESPONSE,
    GET_TASK_STATE_REQUEST,
    GET_TASK_STATE_RESPONSE
} from '../constants';
import {define_token} from '../utils/http_functions';
import {stateParse} from '../utils/misc';
import {setActiveProject, receiveProjects} from './projects';
import axios  from 'axios';
import { Project, Task } from '../models/model';

export function fetchTasksRequest(initial) {
    const message = (initial)?null:"Refreshing tasks list";

    return {
        type: FETCH_TASKS_REQUEST,
        payload: {
            message,
        },
    };
}

export function receiveTasks(tasks, initial) {
    const message = (initial)?null:"Tasks list updated";
    return {
        type: RECEIVE_TASKS,
        payload: {
            tasks,
            message,
        },
    };
}

export function setActiveTask(active_task) {
    return {
        type: SET_ACTIVE_TASK,
        payload: {
            active_task
        }
    }
}

export function createTaskRequest(initial) {
    const message = (initial)?null:"Creating new task";
    return {
        type: CREATE_TASK_REQUEST,
        payload: {
            message
        }
    }
}

export function editTask(isEditing){
    return {
        type: EDIT_TASK,
        payload: {
            editing: isEditing
        }
    }
}

export function patchTaskRequest(initial = false){
    const message = (initial)?null:"Patching task";

    return {
        type: PATCH_TASK_REQUEST,
        payload: {
            message
        }
    }
}

export function patchTaskResponse(initial = false){
    const message = (initial)?null:"Task patched.";

    return {
        type: PATCH_TASK_RESPONSE,
        payload: {
            message
        }
    }
}

export function patchTask(token, id, body, reload_function, initial = false){
    return(dispatch) => {
        dispatch(patchTaskRequest(initial));
        define_token(token);
        let model = new Task();
        model.patch(id, body, {
            transformResponse: [function (){
                dispatch(patchTaskResponse(initial));
                reload_function();
            }]
        });
    }
}

export function createTaskResponse(initial) {
    const message = (initial)?null:"Task created.";
    return {
        type: CREATE_TASK_RESPONSE,
        payload: {
            message
        }
    }
}

export function createTask(token, body, reload_function, initial = false) {
    return (dispatch) => {
        dispatch(createTaskRequest(initial));
        define_token(token);
        let model = new Task();
        model.post(body, {
            transformResponse: [function (){
                dispatch(createTaskResponse(initial));
                reload_function(false);
            }]
        });
    }
}

export function fetchTasks(token, filter, project_id, initial = false) {
    return (dispatch) => {
        dispatch(fetchTasksRequest(initial));
        if(!axios.defaults.headers.common['Authorization']){
            define_token(token);
        }
        let model = new Task();
        model.search(filter, {
            transformResponse: [function (data) {
                let newData = JSON.parse(data);
                let results = [];
                if (newData.n_items > 0) {
                    results = model.parse(newData, false);
                }
                dispatch(receiveTasks(results, initial));
                if(project_id){
                    let project = new Project();
                    project.search([["id", "=", parseInt(project_id, 10)]], {
                        transformResponse: [function (data) {
                            let newData = JSON.parse(data);
                            let results = [];
                            if (newData.n_items > 0){
                                results = project.parse(newData, false);
                            }
                            dispatch(receiveProjects(results, initial));
                            dispatch(setActiveProject(results[0]));
                        }]
                    });
                }
            }]
        });
    }
}


export function openTaskRequest(initial = false){
    const message = (initial)?null:"Opening task...";

    return {
        type: OPEN_TASK_REQUEST,
        payload: {
            message
        }
    }
}

export function openTaskResponse(initial = false){
    const message = (initial)?null:"Task is open.";

    return {
        type: OPEN_TASK_RESPONSE,
        payload: {
            message
        }
    }
}

export function openTask(token, body, reload_function, initial = false) {
    return (dispatch) => {
        dispatch(openTaskRequest(initial));
        define_token(token);
        let model = new Task();
        model.functionCall(body, {
            transformResponse: [function (){
                dispatch(openTaskResponse(initial));
                reload_function(false);
            }]
        });
    }
}

export function getTaskStateRequest(initial = false){
    const message = (initial)?null:"Getting task state...";

    return {
        type: GET_TASK_STATE_REQUEST,
        payload: {
            message
        }
    }
}

export function getTaskStateResponse(results, initial = false){
    const message = (initial)?null:"Task state retrieved";

    return {
        type: GET_TASK_STATE_RESPONSE,
        payload: {
            message,
            results
        }
    }
}

export function getTaskState(token){
    return (dispatch) => {
        dispatch(getTaskStateRequest());
        define_token(token);
        let model = new Task();
        model.functionCall("fields_get", {"args": [["state"], {"lang": "ca_ES"}]}, {
            transformResponse: [function (data) {
                let newData = JSON.parse(data);
                let results = stateParse(newData);
                dispatch(getTaskStateResponse(results));
            }]
        });
    }
}