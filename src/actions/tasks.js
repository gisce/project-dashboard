import {FETCH_TASKS_REQUEST, RECEIVE_TASKS, SET_ACTIVE_TASK} from '../constants'
import {redirectToRoute, getTasks} from '../utils/http_functions'
import {parseJSON, parseTasks} from '../utils/misc'
import axios  from 'axios'

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
        let tasks_ids = JSON.parse(tasques);
        axios.get("http://172.26.0.216:5000/project.task?schema=name,project_id.name,user_id.name,total_hours,remaining_hours,planned_hours,effective_hours,priority,state,work_ids,delay_hours&filter=[('id','in',"+JSON.stringify(tasques).replace(/"/g, '')+")]")
            .then(parseJSON)
            .then(response => {
                dispatch(receiveTasks(parseTasks(response), tasks_ids, initial));
                dispatch(redirectToRoute("/tasks"));
            })
            .catch(error => {
                console.log("API ERROR", error);
            });
    }
}