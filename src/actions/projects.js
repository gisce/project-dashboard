import {FETCH_PROJECTS_REQUEST, RECEIVE_PROJECTS, SET_ACTIVE_PROJECT} from '../constants'
import {parseJSON, parseProjects} from '../utils/misc'
import {define_token} from '../utils/http_functions'
import axios  from 'axios'

export function fetchProjectsRequest(initial) {
    const message = (initial)?null:"Refreshing projects list";

    return {
        type: FETCH_PROJECTS_REQUEST,
        payload: {
            message,
        },
    };
}

export function receiveProjects(data, initial) {
    const message = (initial)?null:"Projects list updated";
    return {
        type: RECEIVE_PROJECTS,
        payload: {
            data,
            message,
        },
    };
}

export function setActiveProject(active_project) {
    return {
        type: SET_ACTIVE_PROJECT,
        payload: {
            active_project
        }
    }
}

export function fetchProjects(token, initial = false) {
    return (dispatch) => {
        dispatch(fetchProjectsRequest(initial));
        define_token(token);
        axios.get("http://localhost:5000/project.project?schema=name,tasks,manager.name,state")
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProjects(parseProjects(response), initial));
            })
            .catch(error => {
                console.log("API ERROR", error);
            });
        dispatch(setActiveProject(null));
    }
}
