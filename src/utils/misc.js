import React from 'react';
import Filter from '../components/Filter';

export function parseJSON(response) {
    return response.data;
}

export function parseProjects(response) {
    let projects = [];
    for(let i = 0; i<response.items.length;i++){
        let actual = response.items[i];
        //TASK parsing
        let tasks = [];
        for(let j=0; j<actual.tasks.length; j++){
            tasks.push(actual.tasks[j].id);
        }
        let project = {
            "id": actual.id,
            "title": actual.name,
            "partner": actual.manager.name,
            "avatar": "https://avatars2.githubusercontent.com/u/13195695?v=3&u=fd11774329fd38d77b64b84d8c8ad559f087d958&s=400",
            "status": actual.state,
            "tasks": tasks
        };
        projects.push(project);
    }
    return projects;
}

export function parseTasks(response, userScreen) {
    let tasks = [];
    for(let i = 0; i<response.items.length;i++){
        let actual = response.items[i];
        let delay_hours = actual.delay_hours;
        if(!delay_hours){
            delay_hours = 0;
        }
        //Workdone parsing
        let workdones = [];
        for(let j=0; j<actual.work_ids.length;j++){
            workdones.push(actual.work_ids[j].id);
        }
        let task = {};
        if(!userScreen) {
            task = {
                "id": actual.id,
                "description": actual.name,
                "project_id": actual.project_id.id,
                "project": actual.project_id.name,
                "partner": actual.user_id.name,
                "avatar": "https://avatars2.githubusercontent.com/u/13195695?v=3&u=fd11774329fd38d77b64b84d8c8ad559f087d958&s=400",
                "estimated_hours": actual.planned_hours,
                "dedicated_hours": actual.effective_hours,
                "total_hours": actual.total_hours,
                "remaining_hours": actual.remaining_hours,
                "delay_hours": delay_hours,
                "priority": actual.priority,
                "status": actual.state,
                "work_ids": workdones
            };
        }
        else{
            task = {
                "id": actual.id,
                "description": actual.name,
                "project": actual.project_id.name,
                "status": actual.state,
                "work_ids": workdones
            };
        }
        tasks.push(task);
    }
    return tasks;
}

export function parseTasksIds(response){
    let tasks_ids = [];
    for(let i = 0; i < response.items.length; i++){
        let actual = response.items[i];
        tasks_ids.push(actual.id);
    }
    return tasks_ids;
}

export function parseWorkdones(response) {
    let workdones = [];
    for(let i = 0; i <response.items.length;i++){
        let actual = response.items[i];
        let workdone = {
            "id": actual.id,
            "hours": actual.hours,
            "user": actual.user_id.name,
            "work_summary": actual.name,
            "task": actual.task_id.name,
            "task_id": actual.task_id.id,
            "date": actual.date,
            "project": actual.project_id.name,
            "project_id": actual.project_id.id
        };
        workdones.push(workdone);
    }
    return workdones;
}

export function parseUsers(response, tasks_ids) {
    let users = [];
    for(let i = 0; i < response.items.length; i++){
        let actual = response.items[i];
        let user = {
            "id": actual.id,
            "login": actual.login,
            "name": actual.name,
            "avatar": "https://avatars2.githubusercontent.com/u/13195695?v=3&u=fd11774329fd38d77b64b84d8c8ad559f087d958&s=400",
            "tasks_ids": tasks_ids
        };
        users.push(user);
    }
    return users;
}

export function parseCompanies(response, tasks_ids){
    let companies = [];
    for(let i = 0; i < response.items.length; i++){
        let actual = response.items[i];
        let country = "-";
        let city = "-";
        if(actual.country){
            country = actual.country.name;
        }
        if(actual.city){
            city = actual.city;
        }
        let company = {
            "id": actual.id,
            "name": actual.name,
            "city": city,
            "country": country,
            "tasks_ids": tasks_ids
        };
        companies.push(company);
    }
    return companies;
}

export function initializeFilters(cols){
    let res = {};
    for(var key in cols){
        if(String(key).toLowerCase() !== 'avatar') {
            res[key] = [cols[key], false];
        }
    }
    return res;
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

export function addFilter(key, value, items, setter, activeFilters){
    let filters = JSON.parse(JSON.stringify(items));
    const remove = function(){
        removeFilter(key, value, items, setter, activeFilters)
    };
    activeFilters.push(
        <Filter
            key={key}
            field={key}
            value={value[0]}
            removeFilter={remove}
        />
    );
    delete filters[key];
    setter(filters);
}

export function removeFilter(key, value, items, setter, activeFilters){
    let filters = JSON.parse(JSON.stringify(items));
    let newFilters = [];
    filters[key] = value;
    for(let i = 0; i < activeFilters.length; i++){
        if(activeFilters[i].key == key){
            activeFilters.splice(activeFilters[i], 1);
        }
    }
    setter(filters);;
}
