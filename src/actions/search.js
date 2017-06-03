import {SEARCH_PROJECTS_REQUEST, SEARCH_TASKS_REQUEST, SEARCH_USERS_REQUEST, SEARCH_COMPANIES_REQUEST} from '../constants'
import {receiveProjects} from './projects'
import {receiveTasks, fetchTasks} from './tasks'
import {receiveUsers} from './users'
import {receiveCompanies} from './companies'
import axios from 'axios';
import {Project, Task, User, Company} from '../models/model'

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

export function searchCompaniesRequest(initial){
    const message = (initial)?null:"Companies search requested";

    return {
        type: SEARCH_COMPANIES_REQUEST,
        payload: {
            message,
        }
    }
}

export function searchProjects(valueToSearch, field, companyId, initial = false){
    return(dispatch) => {
        dispatch(searchProjectsRequest(initial));

        let search_params = [];
        search_params.push([field, "ilike", valueToSearch]);

        if (companyId) {
            search_params.push(['partner_id', '=', companyId]);
        }

        let model = new Project();
        model.search(search_params, {
            transformResponse: [function (data) {
                let newData = JSON.parse(data);
                let results = [];
                if (newData.n_items > 0) {
                    results = model.parse(newData);
                }
                dispatch(receiveProjects(results, initial));
            }]
        })
    }
}

export function iSearchTasks(valueToSearch, field, project_id, userId, initial = false){
    return(dispatch) => {
        /*
        * If search filter is not empty, it must search for a task with a name like
        * the value to search.
        * */
        dispatch(searchTasksRequest(initial));
        let model = new Task();
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
                let results = [];
                if (newData.n_items > 0) {
                    results = model.parse(newData);
                }
                dispatch(receiveTasks(results, initial));
            }]
        })
    }
}

export function searchTasks(valueToSearch, field, filter_id, initial = false){
    return iSearchTasks(valueToSearch, field, filter_id, false, initial);
}

export function searchUserTasks(valueToSearch, field, filter_id, initial = false){
    return iSearchTasks(valueToSearch, field, false, filter_id, initial);
}

export function searchUsers(valueToSearch, initial = false){
    return(dispatch) => {
        dispatch(searchUsersRequest(initial));
        let search_params = [];
        search_params.push(["name", "ilike", valueToSearch]);
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

export function searchCompanies(valueToSearch, field, initial = false){
    return(dispatch) => {
        dispatch(searchCompaniesRequest(initial));
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