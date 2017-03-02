import {FETCH_PROJECT_REQUEST, RECEIVE_PROJECT} from '../constants'
import {getProjects} from '../utils/http_functions'
import {parseJSON} from '../utils/misc'

/******************
  ###############
   FETCH PROJECT
  ###############
 ******************/

export function fetchProjectRequest(initial) {
    const message = (initial)?null:"Fetching project";
    return {
        type: FETCH_PROJECT_REQUEST,
        payload: {
            message,
        },
    };
}

export function fetchProject(token, project, initial=false) {
    return (dispatch) => {
        dispatch(fetchProjectRequest(initial));
        getProjects()
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProject(response.result, initial));
            })
    }
}

export function receiveProject(data, initial) {
    const message = (initial)?null:"Refreshing project";
    return {
        type: RECEIVE_PROJECT,
        payload: {
            data
        }
    }
}