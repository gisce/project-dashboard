import {SEARCH_PROJECTS_REQUEST, SEARCH_TASKS_REQUEST, SEARCH_USERS_REQUEST, SEARCH_COMPANIES_REQUEST} from '../constants'
import {receiveProjects} from './projects'
import {receiveTasks, fetchTasks} from './tasks'
import {receiveUsers} from './users'
import {receiveCompanies} from './companies'
import {define_token} from '../utils/http_functions';
import {translationParse, reverseObject, checkKeys} from '../utils/misc';
import {Project, Task, User, Company} from '../models/model'

export function searchProjectsRequest(initial, valueToSearch) {
    const message = (initial)?null:"Projects search requested";

    return {
        type:  SEARCH_PROJECTS_REQUEST,
        payload: {
            message,
            searchText: valueToSearch
        }
    }
}

export function searchTasksRequest(initial, valueToSearch) {
    const message = (initial)?null:"Tasks search requested";

    return {
        type:  SEARCH_TASKS_REQUEST,
        payload: {
            message,
            searchText: valueToSearch
        }
    }
}

export function searchUsersRequest(initial, valueToSearch) {
    const message = (initial)?null:"Users search requested";

    return {
        type: SEARCH_USERS_REQUEST,
        payload: {
            message,
            searchText: valueToSearch
        }
    }
}

export function searchCompaniesRequest(initial, valueToSearch){
    const message = (initial)?null:"Companies search requested";

    return {
        type: SEARCH_COMPANIES_REQUEST,
        payload: {
            message,
            searchText: valueToSearch
        }
    }
}

export function searchProjects(token, valueToSearch, field, companyId = false, initial = false){
    return(dispatch) => {
        define_token(token);
        let model = new Project();
        model.functionCall("fields_get", {"args": [["state"], {"lang": "ca_ES"}]}, {
            transformResponse: [function (data) {
                let projects = JSON.parse(data);
                let translations = translationParse(projects, "state");
                for (let i = 0; i < projects.length; i++) {
                    const key = projects[i]["state"];
                    projects[i]["state"] = translations[key];
                }
                dispatch(searchProjectsRequest(initial, valueToSearch));
                let search_params = [];

                const s_trans = translationParse(projects, "state");
                const s_trans_reverse = reverseObject(s_trans);
                if(field === "state" && valueToSearch.length > 0){
                    const actual = String(valueToSearch).toLocaleLowerCase();
                    const newValueToSearch = checkKeys(s_trans_reverse, actual);
                    if(newValueToSearch !== "none") {
                        valueToSearch = s_trans_reverse[newValueToSearch];
                    }
                }
                search_params.push([field, "ilike", valueToSearch]);

                if (companyId) {
                    search_params.push(['partner_id', '=', companyId]);
                }
                model.search(search_params, {
                    transformResponse: [function (data) {
                        let newData = JSON.parse(data);
                        let results = [];
                        if (newData.n_items > 0) {
                            results = model.parse(newData);
                        }
                        for (let i = 0; i < results.length; i++) {
                            const state_key = results[i]["state"];
                            results[i]["state"] = s_trans[state_key];
                        }
                        dispatch(receiveProjects(results, initial));
                    }]
                })
            }]
        })
    }
}

export function iSearchTasks(valueToSearch, field, project_id, userId, initial = false){
    return(dispatch) => {
        let model = new Task();
        model.functionCall("fields_get", {"args": [["state", "priority"], {"lang": "ca_ES"}]}, {
            transformResponse: [function (data) {
                const newData = JSON.parse(data);
                const p_trans = translationParse(newData, "priority");
                const s_trans = translationParse(newData, "state");
                const p_trans_reverse = reverseObject(p_trans);
                const s_trans_reverse = reverseObject(s_trans);
                let trans = null;
                if(field === "priority"){
                    trans = p_trans_reverse;
                }
                else if(field === "state"){
                    trans = s_trans_reverse;
                }
                if((field === "priority" || field === "state") && valueToSearch.length > 0){
                    const actual = String(valueToSearch).toLocaleLowerCase();
                    const newValueToSearch = checkKeys(trans, actual);
                    if(newValueToSearch !== "none") {
                        valueToSearch = trans[newValueToSearch];
                    }
                }
                dispatch(searchTasksRequest(initial, valueToSearch));
                let search_params = [];
                search_params.push([field, "ilike", valueToSearch]);
                if (userId) {
                    search_params.push(
                        ["user_id", "=", userId],
                        ["state", "in", ['open', 'pending']]
                    );
                }
                if(project_id){
                    /*
                    * If project_id is not empty, it must not search the value to search in the whole collection of
                    * tasks, it must only fetch the tasks from the project_id.
                    * */
                    search_params.push(["project_id", "=", parseInt(project_id, 10)]);
                }
                model.search(search_params, {
                    transformResponse: [function (data) {
                        let newData = JSON.parse(data);
                        let tasks = [];
                        if (newData.n_items > 0) {
                            tasks = model.parse(newData);
                        }
                        for (let i = 0; i < tasks.length; i++) {
                            const state_key = tasks[i]["state"];
                            const priority_key = tasks[i]["priority"];
                            tasks[i]["priority"] = p_trans[priority_key];
                            tasks[i]["state"] = s_trans[state_key];
                        }
                        dispatch(receiveTasks(tasks, initial));
                    }]
                })
            }]
        })
    }
}

export function searchTasks(token, valueToSearch, field, filter_id, initial = false){
    define_token(token);
    return iSearchTasks(valueToSearch, field, filter_id, false, initial);
}

export function searchUserTasks(token, valueToSearch, field, filter_id, initial = false){
    define_token(token);
    return iSearchTasks(valueToSearch, field, false, filter_id, initial);
}

export function searchUsers(token, valueToSearch, field, initial = false){
    return(dispatch) => {
        define_token(token);
        dispatch(searchUsersRequest(initial, valueToSearch));
        let search_params = [];
        search_params.push([field, "ilike", valueToSearch]);
        let model = new User();
        model.search(search_params, {
            transformResponse: [function (data) {
                let newData = JSON.parse(data);
                let results = [];
                if (newData.n_items > 0) {
                    results = model.parse(newData);
                }
                dispatch(receiveUsers(results, initial));
            }]
        })
    }
}

export function searchCompanies(token, valueToSearch, field, initial = false){
    return(dispatch) => {
        define_token(token);
        dispatch(searchCompaniesRequest(initial, valueToSearch));
        let search_params = [];
        search_params.push([field, "ilike", valueToSearch]);
        let model = new Company();
        model.search(search_params, {
            transformResponse: [function (data) {
                let newData = JSON.parse(data);
                let results = [];
                if (newData.n_items > 0) {
                    results = model.parse(newData);
                }
                dispatch(receiveCompanies(results, initial));
            }]
        })
    }
}
