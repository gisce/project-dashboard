import {SEARCH_PROJECTS_REQUEST, SEARCH_TASKS_REQUEST} from '../constants'
import {searchHelper} from '../utils/http_functions'
import {parseJSON, parseTasks, parseProjects} from '../utils/misc'
import {receiveProjects} from './projects'
import {receiveTasks, fetchTasks} from './tasks'
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
        axios.get("http://localhost:5000/project.project?schema=name,tasks,manager.name,state&filter=[('name','like','" + valueToSearch + "')]")
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
            dispatch(fetchTasks(token, JSON.stringify(original_tasks), false));
        }
        else{
            /*
            * If search filter is not empty, it must search for a task with a name like
            * the value to search.
            * */
            dispatch(searchTasksRequest(initial));
            let filter = "";
            let uri = "http://localhost:5000/project.task?schema=name,project_id.name,user_id.name,total_hours," +
                "remaining_hours,planned_hours,effective_hours,priority,state,work_ids,delay_hours&" +
                "filter=[('name','like','" + valueToSearch + "')";
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
                        dispatch(receiveTasks(parseTasks(response), original_tasks, initial));
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