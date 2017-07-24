import {
    FETCH_PROJECTS_REQUEST,
    RECEIVE_PROJECTS,
    SET_ACTIVE_PROJECT,
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_RESPONSE,
    EDIT_PROJECT,
    PATCH_PROJECT_REQUEST,
    PATCH_PROJECT_RESPONSE
} from '../constants';
import { receiveCompanies, setActiveCompany, fetchCompaniesRequest } from './companies';
import {define_token} from '../utils/http_functions';
import {translationParse} from '../utils/misc';
import {Project, Company} from '../models/model'

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

export function createProjectRequest(initial) {
    const message = (initial)?null:"Creating new project";
    return {
        type: CREATE_PROJECT_REQUEST,
        payload: {
            message
        }
    }
}

export function createProjectResponse(initial) {
    const message = (initial)?null:"Project created.";
    return {
        type: CREATE_PROJECT_RESPONSE,
        payload: {
            message
        }
    }
}

export function createProject(token, body, reload_function, initial = false) {
    return (dispatch) => {
        dispatch(createProjectRequest(initial));
        define_token(token);
        let model = new Project();
        model.post(body, {
            transformResponse: [function (){
                dispatch(createProjectResponse(initial));
                reload_function(false);
            }]
        });
    }
}

export function editProject(isEditing){
    return {
        type: EDIT_PROJECT,
        payload: {
            editing: isEditing
        }
    }
}

export function patchProjectRequest(initial = false){
    const message = (initial)?null:"Patching project";

    return {
        type: PATCH_PROJECT_REQUEST,
        payload: {
            message
        }
    }
}

export function patchProjectResponse(initial = false){
    const message = (initial)?null:"Project patched.";

    return {
        type: PATCH_PROJECT_RESPONSE,
        payload: {
            message
        }
    }
}

export function patchProject(token, id, body, reload_function, initial = false){
    return(dispatch) => {
        dispatch(patchProjectRequest(initial));
        define_token(token);
        let model = new Project();
        model.patch(id, body, {
            transformResponse: [function (){
                dispatch(patchProjectResponse(initial));
                reload_function();
            }]
        });
    }
}

export function fetchProjects(token, filter, companyId, initial = false) {
    return (dispatch) => {
        dispatch(fetchProjectsRequest(initial));
        define_token(token);
        let model = new Project();
        model.search(filter, {
            transformResponse: [function(data) {
                let newData = JSON.parse(data);
                let projects = [];
                if (newData.n_items > 0) {
                    projects = model.parse(newData);
                }
                /*
                Now, we need to translate the following fields:
                    - State
                */
                model.functionCall("fields_get", {"args": [["state"], {"lang": "ca_ES"}]}, {
                    transformResponse: [function (data) {
                        let newData = JSON.parse(data);
                        let translations = translationParse(newData, "state");
                        for (let i = 0; i < projects.length; i++) {
                            const key = projects[i]["state"];
                            projects[i]["state"] = translations[key];
                        }
                        dispatch(receiveProjects(projects, initial));
                        if (companyId) {
                            dispatch(fetchCompaniesRequest(false));
                            let company = new Company();
                            company.search([["id", "=", companyId]], {
                                transformResponse: [function (data) {
                                    let newData = JSON.parse(data);
                                    let results = [];
                                    if (newData.n_items > 0) {
                                        results = company.parse(newData, []);
                                    }
                                    dispatch(receiveCompanies(results, initial));
                                    dispatch(setActiveCompany(results[0]))
                                }]
                            });
                        }
                    }]
                });
            }]
        });
        dispatch(setActiveProject(null));
    }
}
