import PowERP from '../api/PowERP.js'
import { browserHistory } from 'react-router'
import parseJSON from './misc'
import axios  from 'axios'


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

export function getTaskWorks(taskWorks_ids) {
    /**
     * This function fetches task works with the same ID
     * of param *taskWorks_id* using PowERP api.
     */
    var api = new PowERP();
    let taskWorks = [];
    for (let i = 0; i < taskWorks_ids.length; i++){
        let taskWork = api.read("project.task.work", taskWorks_ids[i], [
            "hours", "user_id", "work_summary", "task_id", "date", "project_id"
        ]);
        taskWorks.push(taskWork);
    }
    return {
        "data": taskWorks
    }
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

export function define_token(token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.post['Content-Type'] = 'text/plain';
}

export function prova() {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiJ9.woh6RaTFrT4ANXK6e_BgUayaP3RFE2bmndBSJLEGQrI";
    define_token(token);
    axios.get("http://127.0.0.1:5000/project.project",)
        .then(parseJSON)
        .then(response => {
            if (response.result.status == "ok") {
                console.log("OK!")
            }
            else{
                console.log("ERROR!");
            }
        })
        .catch(error => {
            console.log("Error catched! ", error);
        })
}
