import {
    SET_DAZZLE_STATE,
    GET_TASKS_STATUS_REQUEST,
    GET_TASKS_STATUS_RESPONSE,
    GET_USER_TASKS_COUNT_REQUEST,
    GET_USER_TASKS_COUNT_RESPONSE,
    GET_STARTED_TASKS_COUNT_REQUEST,
    GET_STARTED_TASKS_COUNT_RESPONSE,
    MONTHS
} from '../constants'
import {define_token} from '../utils/http_functions';
import {monthToString} from '../utils/misc';
import {Task, User} from '../models/model'

export function setDazzleState(newState) {
    return {
        type: SET_DAZZLE_STATE,
        payload: {
            dazzle_state: newState
        }
    }
}

export function getTasksStatusRequest() {
    const message = "Retrieving current tasks status...";
    return {
        type: GET_TASKS_STATUS_REQUEST,
        payload: {
            message,
        },
    };
}

export function getTasksStatusResponse(tasks_status) {
    const message = "Tasks status retrieved.";
    return {
        type: GET_TASKS_STATUS_RESPONSE,
        payload: {
            message,
            tasks_status
        },
    };
}

export function getUserTasksCountRequest() {
    const message = "Retrieving current tasks per user count...";
    return {
        type: GET_USER_TASKS_COUNT_REQUEST,
        payload: {
            message,
        },
    };
}

export function getUserTasksCountResponse(user_tasks_count) {
    const message = "Tasks per user count retrieved.";
    return {
        type: GET_USER_TASKS_COUNT_RESPONSE,
        payload: {
            message,
            user_tasks_count
        },
    };
}

export function getStartedTasksCountRequest() {
    const message = "Retrieving current tasks per user count...";
    return {
        type: GET_STARTED_TASKS_COUNT_REQUEST,
        payload: {
            message,
        },
    };
}

export function getStartedTasksCountResponse(started_tasks_count) {
    const message = "Tasks per user count retrieved.";
    return {
        type: GET_STARTED_TASKS_COUNT_RESPONSE,
        payload: {
            message,
            started_tasks_count
        },
    };
}

export function recursiveGet(model, field_to_search, states, status, dispatch, dispatchFunction, customFilter = false){
    let filter = [];
    let months = [];
    if(!customFilter) {
        filter = [[field_to_search, '=', String(states[0])]];
    }
    else if(customFilter === "userTasksCount"){
        filter = [[field_to_search, '=', String(states[0][0])]];
    }
    else if(customFilter === "startedTasksCount"){
        months = states[1];
        states = states[0];
        let mesActual = states[0][0];
        let mesSeguent = states[0][0] + 1;
        let year = states[0][1];
        let nextYear = states[0][1];
        if(mesActual + 1 > 12){
            mesSeguent = 1;
            nextYear += 1;
        }
        mesActual = monthToString(mesActual);
        mesSeguent = monthToString(mesSeguent);
        filter = [["date_start",">=", year + "-" + mesActual + "-01"], ["date_start","<", nextYear + "-" + mesSeguent + "-01"]];
    }
    model.search(filter, {
        transformResponse: [function (data) {
            const newData = JSON.parse(data);
            if(customFilter === "startedTasksCount"){
                status.push([states[0], newData.n_items]);
            }
            else if(customFilter === "userTasksCount"){
                status[states[0][1]] = newData.n_items;
            }
            else {
                status[states[0]] = newData.n_items;
            }
            states.splice(0, 1);
            if(states.length > 0) {
                if(customFilter === "startedTasksCount"){
                    states = [states, months]
                }
                recursiveGet(model, field_to_search, states, status, dispatch, dispatchFunction, customFilter);
            }
            else{
                if(customFilter === "startedTasksCount"){
                    let values = [];
                    let months = [];
                    for(let i = 0; i < status.length; i++){
                        const month = MONTHS[status[i][0][0]];
                        const value = status[i][1];
                        months.push(month + " " + status[i][0][1]);
                        values.push(value);
                    }
                    status = {
                        "labels": months,
                        "values": values
                    };
                }
                dispatch(dispatchFunction(status));
            }
        }]
    });
}

export function getTasksStatus(token){
    return(dispatch) => {
        dispatch(getTasksStatusRequest());
        define_token(token);
        let model = new Task();
        let status = {};
        model.setSchema(['id']);
        model.setLimit(0);
        recursiveGet(model, "state", ['open', 'draft', 'pending', 'cancelled', 'done'], status, dispatch, getTasksStatusResponse);
    }
}

export function getUserTasksCount(token){
    return(dispatch) => {
        dispatch(getUserTasksCountRequest());
        define_token(token);
        let user = new User();
        let task = new Task();
        let count = {};
        user.setSchema(['id', 'name']);
        user.setLimit(0);
        task.setSchema(['id']);
        task.setLimit(0);
        user.search([], {
            transformResponse: [function (data) {
                const newData = JSON.parse(data);
                if(newData.n_items > 0){
                    const items = user.parse(newData, []);
                    let users = [];
                    for(let i = 0; i < items.length; i++){
                        users.push([items[i].id, items[i].name]);
                    }
                    recursiveGet(task, "user_id.id", users, count, dispatch, getUserTasksCountResponse, "userTasksCount");
                }
            }]
        });
    }
}

export function getStartedTasksCount(token){
    return(dispatch) => {
        dispatch(getStartedTasksCountRequest());
        define_token(token);
        let task = new Task();
        let count = [];
        task.setSchema(['id', 'date_start']);
        task.setLimit(0);
        let today = new Date();
        let utc = String(today.toJSON().slice(0,10));
        let months = {};
        let sortedMonths = [];
        let actualMonth = today.getUTCMonth()+2;
        let actualYear = today.getUTCFullYear()-1;
        for(let i = 0; i < 12; i++){
            months[actualMonth] = MONTHS[actualMonth];
            sortedMonths.push([actualMonth, actualYear]);
            actualMonth++;
            if(actualMonth > 12){
                actualMonth = 1;
                actualYear += 1;
            }
        }
        recursiveGet(task, null, [sortedMonths, months], count, dispatch, getStartedTasksCountResponse, "startedTasksCount");
    }
}

