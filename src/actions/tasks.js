import {FETCH_TASKS_REQUEST, RECEIVE_TASKS, SET_ACTIVE_TASK} from '../constants'
import {redirectToRoute, define_token} from '../utils/http_functions'
import {parseJSON, parseTasks, parseProjects} from '../utils/misc'
import {setActiveProject, receiveProjects} from './projects'
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

export function receiveTasks(tasks, initial) {
    const message = (initial)?null:"Tasks list updated";
    return {
        type: RECEIVE_TASKS,
        payload: {
            tasks,
            message,
        },
    };
}

export function setActiveTask(active_task) {
    return {
        type: SET_ACTIVE_TASK,
        payload: {
            active_task
        }
    }
}

export function fetchTasks(token, filter, project_id, initial = false) {
    return (dispatch) => {
        dispatch(fetchTasksRequest(initial));
        let uri = "http://localhost:5000/project.task?" +
            "schema=name,project_id.name,user_id.name,total_hours,remaining_hours,planned_hours," +
            "effective_hours,priority,state,work_ids,delay_hours" + filter;
        if(!axios.defaults.headers.common['Authorization']){
            define_token(token);
        }
        axios.get(uri)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveTasks(parseTasks(response, false), initial));
            })
            .then(response => {
                /*
                * If there's not any active_project, it's necessary to fetch the project to retrieve extra project info.
                * It may be possible with a single api call. TODO
                * */
                if(project_id){
                    let filter = "&filter=[('id','='," + project_id + ")]";
                    axios.get("http://localhost:5000/project.project?schema=name,tasks,manager.name,state" + filter)
                        .then(parseJSON)
                        .then(response => {
                            let projects = parseProjects(response, false);
                            dispatch(receiveProjects(projects, initial));
                            dispatch(setActiveProject(projects[0]));
                        })
                        .catch(error => {
                            console.log("API ERROR", error);
                        });
                }
            })
            .catch(error => {
                console.log("API ERROR", error);
            });
    }
}