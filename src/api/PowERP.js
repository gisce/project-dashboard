class PowERP {

    constructor(options) {
        if (typeof options === 'undefined') {
            options = {};
        }
        this.baseUrl = options.baseUrl || "/";
    }

    request(path, options){
        let result = {};
        switch(path){
            case "/project.project/1":
                result = {
                    "id": 1,
                    "title": "/dev/null (No Dev tasks)",
                    "partner": "Eduard Carreras i Nadal",
                    "avatar": "https://avatars2.githubusercontent.com/u/294235?v=3&s=460",
                    "status": "En progrés",
                    "tasks": [1,2]
                };
                break;
            case "/project.project/2":
                result = {
                    "id": 2,
                    "title": "Casos ERP v4",
                    "partner": "Axel Simón González",
                    "avatar": "https://avatars2.githubusercontent.com/u/13195695?v=3&s=460",
                    "status": "En progrés",
                    "tasks": [3]
                };
                break;
            case "/project.project/3":
                result = {
                    "id": 3,
                    "title": "Desenvolupaments reports .mako",
                    "partner": "Guillem Julià",
                    "avatar": "https://avatars3.githubusercontent.com/u/4963636?v=3&s=460",
                    "status": "En progrés",
                    "tasks": [4]
                };
                break;
            case "/project.task/1":
                result = {
                    "id": 1,
                    "description": "No development tasks",
                    "project": "/dev/null (No Dev tasks)",
                    "partner": "Eduard Carreras i Nadal",
                    "avatar": "https://avatars2.githubusercontent.com/u/294235?v=3&s=460",
                    "estimated_hours": "0:00",
                    "dedicated_hours": "11:11",
                    "priority": "Mitjana",
                    "status": "En progrés",
                    "work_ids": [1]
                };
                break;
            case "/project.task/2":
                result = {
                    "id": 2,
                    "description": "Documentation for project-dashboard",
                    "project": "/dev/null (No Dev tasks)",
                    "partner": "Eduard Carreras i Nadal",
                    "avatar": "https://avatars2.githubusercontent.com/u/294235?v=3&s=460",
                    "estimated_hours": "0:00",
                    "dedicated_hours": "11:11",
                    "priority": "Mitjana",
                    "status": "En progrés",
                    "work_ids": [2]
                };
                break;
            case "/project.task/3":
                result = {
                    "id": 3,
                    "description": "Suport project dashboard",
                    "project": "Casos ERP v4",
                    "partner": "Axel Simón González",
                    "avatar": "https://avatars2.githubusercontent.com/u/13195695?v=3&s=460",
                    "estimated_hours": "0:00",
                    "dedicated_hours": "11:11",
                    "priority": "Mitjana",
                    "status": "En progrés",
                    "work_ids": [3]
                };
                break;
            case "/project.task/4":
                result = {
                    "id": 4,
                    "description": "Reports ERP",
                    "project": "Desenvolupaments reports .mako",
                    "partner": "Guillem Julià",
                    "avatar": "https://avatars3.githubusercontent.com/u/4963636?v=3&s=460",
                    "estimated_hours": "0:00",
                    "dedicated_hours": "11:11",
                    "priority": "Mitjana",
                    "status": "En progrés",
                    "work_ids": [4]
                };
                break;
            case "/project.task.work/1":
                result = {
                    "hours": 2,
                    "user_id": 1,
                    "work_summary": "Assistència telefònica",
                    "task_id": 1,
                    "date": "16/06/2016",
                    "project_id": 1
                };
                break;
            case "/project.task.work/2":
                result = {
                    "hours": 2,
                    "user_id": 1,
                    "work_summary": "Cas [3442342]: manteniment servidor",
                    "task_id": 2,
                    "date": "16/06/2016",
                    "project_id": 1
                };
                break;
            case "/project.task.work/3":
                result = {
                    "hours": 2,
                    "user_id": 1,
                    "work_summary": "Formació dashboard",
                    "task_id": 3,
                    "date": "16/06/2016",
                    "project_id": 2
                };
                break;
            case "/project.task.work/4":
                result = {
                    "hours": 6,
                    "user_id": 1,
                    "work_summary": "Desenvolupament report factura",
                    "task_id": 4,
                    "date": "16/06/2016",
                    "project_id": 3
                };
                break;
        }
        return result;
    }

    search(model, search_params){
        if (model == "project.project"){
            return [1,2,3];
        }
        return []
    }

    read(model, id, fields_to_read){
        let uri = "/" + model + "/" + id;
        return this.request(uri)
    }

    // getToken(user,password){
    //     var clientId = "admin";
    //     var clientSecret = "admin";
    //
    //     // Temporal hadcode, base64 is admin:admin
    //     var authorizationBasic = 'YWRtaW46YWRtaW4=';
    //
    //     var request = new XMLHttpRequest();
    //     request.open('POST', 'http://localhost:5000', true);
    //     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //     console.log("1234");
    //     request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
    //     console.log("5678");
    //     request.setRequestHeader('Accept', 'application/json');
    //     console.log("91011");
    //     console.log(request.responseText);
    //     request.send("username=John&password=Smith&grant_type=password");
    //     request.onreadystatechange = function () {
    //         if (request.readyState === 4) {
    //             return request.responseText;
    //         }
    //         else return "";
    //     };
    // }

}

export default PowERP;