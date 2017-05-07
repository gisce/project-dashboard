import {SEARCH_PROJECTS_REQUEST, SEARCH_TASKS_REQUEST, SEARCH_USERS_REQUEST} from '../constants'
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

export function searchUsersRequest(initial) {
    const message = (initial)?null:"Users search requested";

    return {
        type: SEARCH_USERS_REQUEST,
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

export function searchTasks(token, valueToSearch, project_id, userId, initial = false){
    return(dispatch) => {
        /*
        * If search filter is not empty, it must search for a task with a name like
        * the value to search.
        * */
        dispatch(searchTasksRequest(initial));
        let uri = "";
        //"&filter=[('user_id','='," + this.props.params.userId + "),('state','in',['open','pending'])]";
        if(!userId) {
            uri = "http://localhost:5000/project.task?schema=name,project_id.name,user_id.name,total_hours," +
                "remaining_hours,planned_hours,effective_hours,priority,state,work_ids,delay_hours&" +
                "filter=[('name','ilike','" + valueToSearch + "')";
        }
        else{
            uri = "http://localhost:5000/project.task?schema=name,project_id.name,state,work_ids" +
                "&filter=[('name','ilike','" + valueToSearch + "')," +
                "('user_id','='," + userId + ")," +
                "('state','in',['open','pending'])";
        }
        if(project_id){
            /*
            * If project_id is not empty, it must not search the value to search in the whole collection of
            * tasks, it must only fetch the tasks from the project_id.
            * */
            uri = uri + ",('project_id','='," + project_id + ")";
        }
        uri += "]";
        axios.get(uri)
            .then(parseJSON)
            .then(response => {
                if(response.n_items > 0){
                    //let filter = "&filter=[('id','in'," + JSON.stringify(original_tasks).replace(/"/g, '') + ")]";
                    dispatch(receiveTasks(parseTasks(response, userId), initial));
                }else{
                    dispatch(receiveTasks([], initial));
                }
            })
            .catch(error => {
                console.log("API ERROR", error);
            });
    }
}

export function searchUsers(token, valueToSearch, initial = false){
    return(dispatch) => {
        dispatch(searchUsersRequest(initial));
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