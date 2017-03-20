import {FETCH_TASK_WORK_REQUEST, RECEIVE_TASK_WORK} from '../constants'
import {redirectToRoute, getTaskWorks} from '../utils/http_functions'
import {parseJSON} from '../utils/misc'

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

export function fetchTaskWorks(token, taskWorks, initial = false) {
    return (dispatch) => {
        dispatch(fetchTaskWorkRequest(initial));
        // Can't use .then yet because getTasks is
        // a harcoded method, no real API calls stuff, so not
        // real Promise (async) objects
        let taskWorks_ids = JSON.parse(taskWorks);
        let response = getTaskWorks(taskWorks_ids);
        let taskWorksArray = parseJSON(response);
        dispatch(receiveTaskWork(taskWorksArray, initial));
        dispatch(redirectToRoute("/task"));
    }
}
