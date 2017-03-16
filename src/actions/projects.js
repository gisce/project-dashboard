import {FETCH_PROJECTS_REQUEST, RECEIVE_PROJECTS} from '../constants'
import {getProjects} from '../utils/http_functions'
import {parseJSON} from '../utils/misc'

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

export function fetchProjects(token, initial = false) {
    return (dispatch) => {
        dispatch(fetchProjectsRequest(initial));
        // Can't use .then yet because getProject is
        // a harcoded method, no real API calls stuff, so not
        // real Promise (async) objects
        // console.log("FETCHED!" + getProjects());
        // getProjects()
        //     .then(parseJSON)
        //     .then(response => {
        //         dispatch(receiveProjects(response.result, initial));
        //     })
        let response = getProjects();
        let projects = parseJSON(response);
        dispatch(receiveProjects(projects, initial));
    }
}
