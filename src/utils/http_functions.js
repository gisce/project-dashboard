import PowERP from '../../api/PowERP.js'

export function getProjects() {
    /**
     * This function fetches all projects from PowERP server
     * using PowERP api.
     * */
    var api = new PowERP();
    let projects = [];
    let project_ids = api.search("project.project", []);
    for(let i = 0; i < project_ids.length; i++){
        let project = api.read("project.project", project_ids[i], ['id', 'title', 'subtitle', 'avatar', 'description']);
        projects.push(project);
    }
    return {
        "data": projects
    }
}