import {FETCH_COMPANIES_REQUEST, RECEIVE_COMPANIES} from '../constants'
import {define_token} from '../utils/http_functions'
import {parseJSON, parseCompanies, parseTasksIds} from '../utils/misc'
import axios  from 'axios'

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

export function fetchCompanies(token, companyId, loadTasks, initial = false) {
    return (dispatch) => {
        if(!axios.defaults.headers.common['Authorization']){
            define_token(token);
        }
        dispatch(fetchCompaniesRequest(initial));
        let uri = "http://localhost:5000/res.partner?schema=name,city,country.name";
        let filter = "";
        if(companyId){
            filter = "&filter=[('id','='," + companyId + ")]";
            uri += filter;
        }
        let tasks_ids = [];
        axios.get(uri)
            .then(parseJSON)
            .then(response => {
                if(loadTasks){
                    axios.get("http://localhost:5000/project.task?schema=id" +
                        "&filter=[('partner_id','='," + companyId + ")," +
                        "('state','in',['open','pending'])]")
                        .then(parseJSON)
                        .then(tasksResponse => {
                            tasks_ids = parseTasksIds(tasksResponse);
                            dispatch(receiveCompanies(parseCompanies(response, tasks_ids), initial));
                        }).catch(error => {
                            console.log("API ERROR (Tasks IDS)", error);
                        });
                }
                dispatch(receiveCompanies(parseCompanies(response, tasks_ids), initial));
            })
            .catch(error => {
                console.log("API ERROR", error);
            });
    }
}