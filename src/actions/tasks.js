import {FETCH_TASKS_REQUEST, RECEIVE_TASKS} from '../constants'
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

export function receiveTasks(data, initial) {
    const message = (initial)?null:"Tasks list updated";
    return {
        type: RECEIVE_TASKS,
        payload: {
            data,
            message,
        },
    };
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
        dispatch(receiveTasks(tasks, initial));
        dispatch(redirectToRoute("/tasks"));
    }
}