import React from 'react';
import { Route } from 'react-router';

import { App } from './containers/App';
import Projects from './components/ProjectsView';
import Tasks from './components/TasksView';
import Task from './components/TaskView';
import Users from './components/UsersView';
import User from './components/UserView';
import Companies from './components/CompaniesView';
import NotFound from './components/NotFound';
import NewProject from './components/NewProject';
import NewTask from './components/NewTask';
import NewWorkdone from './components/NewWorkdone';

export default (
    <Route path="/" component={App}>
            <Route path="/projects" component={Projects} />
            <Route path="/projects/:projectId/tasks" component={Tasks} />
            <Route path="/projects/new" component={NewProject}/>
            <Route path="/tasks" component={Tasks} />
            <Route path="/tasks/new" component={NewTask}/>
            <Route path="/tasks/:taskId" component={Task} />
            <Route path="/tasks/:taskId/new" component={NewWorkdone} />
            <Route path="/users" component={Users} />
            <Route path="/user/:userId" component={User} />
            <Route path="/companies" component={Companies} />
            <Route path="/companies/:companyId/projects" component={Projects} />
            <Route path="*" component={NotFound} />
    </Route>
);