import {SEARCH_PROJECTS_REQUEST, SEARCH_TASKS_REQUEST} from '../constants'
import {searchHelper} from '../utils/http_functions'
import {parseJSON, parseTasks} from '../utils/misc'
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
        let response = searchHelper("project.project", valueToSearch);
        let projects = parseJSON(response);
        dispatch(receiveProjects(projects, initial));
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
            axios.get("http://localhost:5000/project.task?schema=name,project_id.name,user_id.name,total_hours,remaining_hours,planned_hours,effective_hours,priority,state,work_ids,delay_hours&filter=[('name','like','" + valueToSearch + "'),('id','in',"+JSON.stringify(original_tasks).replace(/"/g, '')+")]")
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