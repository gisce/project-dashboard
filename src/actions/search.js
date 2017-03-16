import {SEARCH_PROJECTS_REQUEST, SEARCH_TASKS_REQUEST} from '../constants'
import {searchHelper, getTasks} from '../utils/http_functions'
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
        if(valueToSearch == "") {
            /*
            * If search filter is empty, it must reload
            * the tasks of the selected project (original tasks).
            * */
            response = getTasks(original_tasks);
            tasks = parseJSON(response);
            dispatch(receiveTasks(tasks, original_tasks, initial));
        }
        else{
            /*
            * If search returns any task, it must be received and
            * rendered.
            * */
            dispatch(receiveTasks(tasks, original_tasks, initial));
        }
    }
}