import PowERP from '../api/PowERP.js'
import { browserHistory } from 'react-router'


export function getProjects() {
    /**
     * This function fetches all projects from PowERP server
     * using PowERP api.
     * */
    var api = new PowERP();
    let projects = [];
    let project_ids = api.search("project.project", []);
    for(let i = 0; i < project_ids.length; i++){
        let project = api.read("project.project", project_ids[i], ['id', 'title', 'partner', 'avatar', 'state']);
        projects.push(project);
    }
    return {
        "data": projects
    }
}

function delay(ms) {
    /**
     * Per simular crides asíncrones
     * @type {number} milliseconds
     */
    ms += new Date().getTime();
    while (new Date() < ms){}
}

export function getTasks(tasks_ids) {
    /**
     * This function fetches tasks with the same IDS of
     * param *tasks* using PowERP api.
     */
    var api = new PowERP();
    let tasks = [];
    for (let i = 0; i < tasks_ids.length; i++){
        let task = api.read("project.task", tasks_ids[i], [
            'id', 'description', 'project', 'partner', 'avatar', 'estimated_hours', 'dedicated_hours', 'priority', 'state'
        ]);
        tasks.push(task);
    }
    return {
        "data": tasks
    }
}

export function getTaskWork(task_id) {
    /**
     * This function fetches a single task with the same ID
     * of param *task_id* using PowERP api.
     */
}

export function searchHelper(model, value){
    var api = new PowERP();
    if(!value && model == "project.project"){
        return getProjects();
    }
    else if(!value && model == "project.task"){
        return {
            "data": null
        }
    }
    return {
        "data": []
    }
}

export function redirectToRoute(route) {
    return () => {
        console.log("Redirecting to " + route + "...");
        browserHistory.push(route);
    };
}