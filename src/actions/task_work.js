import {FETCH_TASK_WORK_REQUEST, RECEIVE_TASK_WORK} from '../constants'
import {redirectToRoute, getTaskWork} from '../utils/http_functions'
import {parseJSON} from '../utils/misc'
import {fetchTasks, fetchTasksRequest} from './tasks'

export function fetchTaskWorkRequest(initial) {
    const message = (initial)?null:"Refreshing task work list";

    return {
        type: FETCH_TASK_WORK_REQUEST,
        payload: {
            message,
        },
    };
}

export function receiveTaskWork(data, initial) {
    const message = (initial)?null:"Tasks work list updated";
    return {
        type: RECEIVE_TASK_WORK,
        payload: {
            data,
            message,
        },
    };
}

export function fetchTaskWork(token, tasca, initial = false) {
    return (dispatch) => {
        dispatch(fetchTaskWorkRequest(initial));
        // Can't use .then yet because getTasks is
        // a harcoded method, no real API calls stuff, so not
        // real Promise (async) objects
        let task_id = JSON.parse(tasca);
        let response = getTaskWork(task_id);
        let taskWorks = parseJSON(response);
        dispatch(receiveTaskWork(taskWorks, initial));
    }
}
