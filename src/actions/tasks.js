import {FETCH_TASKS_REQUEST, RECEIVE_TASKS, SET_ACTIVE_TASK} from '../constants'
import {redirectToRoute, getTasks} from '../utils/http_functions'
import {parseJSON} from '../utils/misc'

export function fetchTasksRequest(initial) {
    const message = (initial)?null:"Refreshing tasks list";

    return {
        type: FETCH_TASKS_REQUEST,
        payload: {
            message,
        },
    };
}

export function receiveTasks(tasks, original_ids, initial) {
    const message = (initial)?null:"Tasks list updated";
    return {
        type: RECEIVE_TASKS,
        payload: {
            tasks,
            original_ids,
            message,
        },
    };
}

export function setActiveTask(active_task_id, initial) {
    return {
        type: SET_ACTIVE_TASK,
        payload: {
            active_task_id
        }
    }
}

export function fetchTasks(token, tasques, initial = false) {
    return (dispatch) => {
        dispatch(fetchTasksRequest(initial));
        // Can't use .then yet because getTasks is
        // a harcoded method, no real API calls stuff, so not
        // real Promise (async) objects
        let tasks_ids = JSON.parse(tasques);
        let response = getTasks(tasks_ids);
        let tasks = parseJSON(response);
        dispatch(receiveTasks(tasks, tasks_ids, initial));
        dispatch(redirectToRoute("/tasks"));
    }
}