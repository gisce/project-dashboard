import {SEARCH_PROJECTS_REQUEST, SEARCH_TASKS_REQUEST} from '../constants'
import {searchHelper} from '../utils/http_functions'
import {parseJSON} from '../utils/misc'
import {receiveProjects} from './projects'
import {receiveTasks} from './tasks'

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
        dispatch(searchTasksRequest(initial));
        let response = searchHelper("project.task", valueToSearch);
        let tasks = parseJSON(response);
        if(tasks.length == 0) {
            console.log("VAL ZERPP");
            dispatch(receiveTasks(original_tasks, original_tasks, initial));
        }
        else{
            dispatch(receiveTasks(tasks, original_tasks, initial));
        }
    }
}