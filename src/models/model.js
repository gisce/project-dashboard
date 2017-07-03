import axios  from 'axios';
import {parseJSON} from '../utils/misc';


export default class Model {

    constructor() {
        this.model = null;
        this.uri = "http://erp-ti.gisce.lan:5000";
        this.schema = [];
    }

    parse () {
        return [];
    }

    search(search_filters, configuration) {
        const search_uri = this.uri + "/" + this.model + "?filter=" + JSON.stringify(search_filters)
            + "&schema=" + this.schema.join(",");
        return axios.get(search_uri, configuration)
            .then(parseJSON)
            .catch(error => {
                console.log("API ERROR", error);
            });
    }

    post(body) {
        const uri = this.uri + "/" + this.model;
        return axios.post(uri, body);
    }

    patch(id, body){
        const uri = this.uri + "/" + this.model + "/"+id;
        return axios.patch(uri, body);
    }

    delete(id){
        const uri = this.uri + "/" + this.model + "/" + id;
        return axios.delete(uri);
    }
}

export class Project extends Model {

    constructor() {
        super();
        this.model = 'project.project';
        this.schema = ['name', 'tasks', 'manager.name', 'state'];
    }

    parse(response, unused) {
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
                "name": actual.name,
                "manager.name": actual.manager.name,
                "avatar": "https://avatars2.githubusercontent.com/u/13195695?v=3&u=fd11774329fd38d77b64b84d8c8ad559f087d958&s=400",
                "state": actual.state,
                "tasks": tasks
            };
            projects.push(project);
        }
        return projects;
    }
}

export class TaskWork extends Model {
    constructor() {
        super();
        this.model = 'project.task.work';
        this.schema = ["name", "hours", "user_id.name", "task_id.name", "date", "project_id.name"];
    }

    parse(response, unused) {
        let workdones = [];
        for(let i = 0; i <response.items.length;i++){
            let actual = response.items[i];
            let workdone = {
                "id": actual.id,
                "hours": actual.hours,
                "user_id.name": actual.user_id.name,
                "name": actual.name,
                "task_id.name": actual.task_id.name,
                "task_id.id": actual.task_id.id,
                "date": actual.date,
                "project_id.name": actual.project_id.name,
                "project_id.id": actual.project_id.id
            };
            workdones.push(workdone);
        }
        return workdones;
    }
}

export class Task extends Model {
    constructor() {
        super();
        this.model = 'project.task';
        this.schema = ["name", "project_id.name", "user_id.name", "total_hours", "remaining_hours", "planned_hours", "effective_hours", "priority", "state", "work_ids", "delay_hours"];
    }

    parse(response, unused) {
        let tasks = [];
        for(let i = 0; i<response.items.length;i++){
            let actual = response.items[i];
            let project_id = "None";
            let project_name = "No project";
            let delay_hours = actual.delay_hours;
            let user = actual.user_id;
            if(user){
                user = user.name;
            }
            if(!delay_hours){
                delay_hours = 0;
            }
            //Workdone parsing
            let workdones = [];
            for(let j=0; j<actual.work_ids.length;j++){
                workdones.push(actual.work_ids[j].id);
            }
            if(actual.project_id){
               project_id = actual.project_id.id;
               project_name = actual.project_id.name;
            }
            let task = {};
            task = {
                "id": actual.id,
                "name": actual.name,
                "project_id.id": project_id,
                "project_id.name": project_name,
                "user_id.name": user,
                "avatar": "https://avatars2.githubusercontent.com/u/13195695?v=3&u=fd11774329fd38d77b64b84d8c8ad559f087d958&s=400",
                "planned_hours": actual.planned_hours,
                "effective_hours": actual.effective_hours,
                "total_hours": actual.total_hours,
                "remaining_hours": actual.remaining_hours,
                "delay_hours": delay_hours,
                "priority": actual.priority,
                "state": actual.state,
                "work_ids": workdones
            };
            tasks.push(task);
        }
        return tasks;
    }

    parseTaskIds(response){
        let tasks_ids = [];
        for(let i = 0; i < response.items.length; i++){
            let actual = response.items[i];
            tasks_ids.push(actual.id);
        }
        return tasks_ids;
    }
}

export class Company extends Model {
    constructor() {
        super();
        this.model = "res.partner";
        this.schema = ["name", "city", "country.name"];
    }

    parse(response, tasks_ids) {
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
}

export class User extends Model {
    constructor() {
        super();
        this.model = "res.users";
        this.schema = ["login", "name"];
    }

    parse(response, tasks_ids) {
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
}