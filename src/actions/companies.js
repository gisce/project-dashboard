import {FETCH_COMPANIES_REQUEST, RECEIVE_COMPANIES, SET_ACTIVE_COMPANY} from '../constants';
import {define_token} from '../utils/http_functions';
import {parseJSON, parseCompanies, parseTasksIds} from '../utils/misc';
import axios  from 'axios';
import { Company, Task } from '../models/model';

export function fetchCompaniesRequest(initial) {
    const message = (initial)?null:"Refreshing companies list";

    return {
        type: FETCH_COMPANIES_REQUEST,
        payload: {
            message,
        },
    };
}

export function receiveCompanies(companies, initial) {
    const message = (initial)?null:"Companies list updated";
    return {
        type: RECEIVE_COMPANIES,
        payload: {
            companies,
            message,
        },
    };
}

export function setActiveCompany(active_company) {
    return {
        type: SET_ACTIVE_COMPANY,
        payload: {
            active_company
        }
    }
}

export function fetchCompanies(token, companyId, loadTasks, initial = false) {
    return (dispatch) => {
        if(!axios.defaults.headers.common['Authorization']){
            define_token(token);
        }
        dispatch(fetchCompaniesRequest(initial));
        let model = new Company();
        let filter = [];
        let tasks_ids = [];
        if(companyId){
            filter.push(["id", "=", parseInt(companyId, 10)]);
        }
        model.search(filter, {
            transformResponse: [function (data) {
                    let newData = JSON.parse(data);
                    let results = [];
                    if (newData.n_items > 0) {
                        if(loadTasks){
                            let task = new Task();
                            task.search([
                                ["partner_id", "=", parseInt(companyId, 10)],
                                ["state", "in", ["open", "pending"]]
                            ], {
                                transformResponse: [function (data) {
                                    let newData = JSON.parse(data);
                                    tasks_ids = task.parseTaskIds(newData);
                                    dispatch(receiveCompanies(model.parse(newData, tasks_ids), initial));
                                }]
                            });
                        }
                        results = model.parse(newData, tasks_ids);
                    }
                    dispatch(receiveCompanies(results, initial));
            }]
        });
    }
}