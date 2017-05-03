import {SEARCH_PROJECTS_REQUEST, SEARCH_TASKS_REQUEST} from '../constants'
import {parseJSON, parseTasks, parseProjects, parseUsers} from '../utils/misc'
import {receiveProjects} from './projects'
import {receiveTasks, fetchTasks} from './tasks'
import {receiveUsers} from './users'
import axios from 'axios';

export function searchProjectsRequest(initial) {
    const message = (initial)?null:"Projects search requested";

    return {
        type:  SEARCH_PROJECTS_REQUEST,
        payload: {
            message,
        }
    }
}

export function searchTasksRequest(initial) {
    const message = (initial)?null:"Tasks search requested";

    return {
        type:  SEARCH_TASKS_REQUEST,
        payload: {
            message,
        }
    }
}

export function searchProjects(token, valueToSearch, initial = false){
    return(dispatch) => {
        dispatch(searchProjectsRequest(initial));
        axios.get("http://localhost:5000/project.project?schema=name,tasks,manager.name,state&filter=[('name','ilike','" + valueToSearch + "')]")
            .then(parseJSON)
            .then(response => {
                    if (response.n_items > 0) {
                        dispatch(receiveProjects(parseProjects(response), initial));
                    } else {
                        dispatch(receiveProjects([], initial));
                    }
                }
            )
            .catch(error => {
                console.log("API ERROR", error);
            });
    }
}

export function searchTasks(token, valueToSearch, original_tasks, initial = false){
    return(dispatch) => {
        // let response = searchHelper("project.task", valueToSearch);
        // let tasks = parseJSON(response);
        if(valueToSearch == "") {
            /*
            * If search filter is empty, it must reload
            * the tasks of the selected project (original tasks).
            * */
            let filter = null;
            if(original_tasks){
                filter = "&filter=[('id','in'," + JSON.stringify(original_tasks).replace(/"/g, '') + ")]";
            }
            dispatch(fetchTasks(token, original_tasks, filter, false));
        }
        else{
            /*
            * If search filter is not empty, it must search for a task with a name like
            * the value to search.
            * */
            dispatch(searchTasksRequest(initial));
            let uri = "http://localhost:5000/project.task?schema=name,project_id.name,user_id.name,total_hours," +
                "remaining_hours,planned_hours,effective_hours,priority,state,work_ids,delay_hours&" +
                "filter=[('name','ilike','" + valueToSearch + "')";
            if(original_tasks){
                /*
                * If original tasks is not empty, it must not search the value to search in the whole collection of
                * tasks, it must do it only in the range of the original tasks.
                * */
                uri = uri + ",('id','in',"+JSON.stringify(original_tasks).replace(/"/g, '')+")";
            }
            uri += "]";
            axios.get(uri)
                .then(parseJSON)
                .then(response => {
                    if(response.n_items > 0){
                        let filter = "&filter=[('id','in'," + JSON.stringify(original_tasks).replace(/"/g, '') + ")]";
                        dispatch(receiveTasks(parseTasks(response), original_tasks, filter, initial));
                    }else{
                        dispatch(receiveTasks([], original_tasks, initial));
                    }
                })
                .catch(error => {
                    console.log("API ERROR", error);
                });
        }
    }
}

export function searchUsers(token, valueToSearch, initial = false){
    return(dispatch) => {
        dispatch(searchProjectsRequest(initial));
        axios.get("http://localhost:5000/res.users?schema=login,name&filter=[('name','ilike','" + valueToSearch + "')]")
            .then(parseJSON)
            .then(response => {
                    if (response.n_items > 0) {
                        dispatch(receiveUsers(parseUsers(response), initial));
                    } else {
                        dispatch(receiveUsers([], initial));
                    }
                }
            )
            .catch(error => {
                console.log("API ERROR", error);
            });
    }
}