import {FETCH_TASKS_REQUEST, RECEIVE_TASKS, SET_ACTIVE_TASK, CREATE_TASK} from '../constants';
import {define_token} from '../utils/http_functions';
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
        type: CREATE_TASK,
        payload: {
            message
        }
    }
}

export function createTask(token, body, initial = false) {
    return (dispatch) => {
        dispatch(createTaskRequest(initial));
        define_token(token);
        let model = new Task();
        model.post(body);
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