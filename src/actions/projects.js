import {FETCH_PROJECTS_REQUEST, RECEIVE_PROJECTS, SET_ACTIVE_PROJECT} from '../constants';
import {parseJSON, parseProjects, parseCompanies } from '../utils/misc';
import { receiveCompanies, setActiveCompany } from './companies';
import {define_token} from '../utils/http_functions';
import axios  from 'axios';

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

export function fetchProjects(token, filter, companyId, initial = false) {
    return (dispatch) => {
        dispatch(fetchProjectsRequest(initial));
        define_token(token);
        axios.get("http://localhost:5000/project.project?schema=name,tasks,manager.name,state" + filter)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProjects(parseProjects(response), initial));
                if(companyId){
                    let uri = "http://localhost:5000/res.partner?schema=name,city,country.name";
                    if(companyId){
                        filter = "&filter=[('id','='," + companyId + ")]";
                        uri += filter;
                    }
                    axios.get(uri)
                        .then(parseJSON)
                        .then(response => {
                            const companies = parseCompanies(response, []);
                            dispatch(receiveCompanies(companies, initial));
                            dispatch(setActiveCompany(companies[0]));
                        })
                        .catch(error => {
                            console.log("API ERROR", error);
                        });
                }
            })
            .catch(error => {
                console.log("API ERROR", error);
            });
        dispatch(setActiveProject(null));
    }
}
