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
    OPEN_TASK_RESPONSE
} from '../constants';
import {define_token} from '../utils/http_functions';
import {translationParse} from '../utils/misc';
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
                let tasks = [];
                if (newData.n_items > 0) {
                    tasks = model.parse(newData, false);
                }
                /*
                Now, we need to translate the following fields:
                    - State
                    - Priority
                */
                model.functionCall("fields_get", {"args": [["state", "priority"], {"lang": "ca_ES"}]}, {
                    transformResponse: [function (data) {
                        let newData = JSON.parse(data);
                        let p_trans = translationParse(newData, "priority");
                        let s_trans = translationParse(newData, "state");
                        for (let i = 0; i < tasks.length; i++) {
                            const state_key = tasks[i]["state"];
                            const priority_key = tasks[i]["priority"];
                            tasks[i]["priority"] = p_trans[priority_key];
                            tasks[i]["state"] = s_trans[state_key];
                        }
                        dispatch(receiveTasks(tasks, initial));
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

export function openTask(token, task_id, reload_function, initial = false) {
    return (dispatch) => {
        dispatch(openTaskRequest(initial));
        define_token(token);
        let model = new Task();
        model.functionCall("do_open", {"args": [[parseInt(task_id)]]}, {
            transformResponse: [function (){
                dispatch(openTaskResponse(initial));
                reload_function(false);
            }]
        });
    }
}
