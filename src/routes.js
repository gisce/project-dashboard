import React from 'react';
import { Route } from 'react-router';

import { App } from './containers/App';
import Login from './components/Login';
import Config from './components/ConfigView';
import Dashboard from './components/DashboardView';
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

import { requireNoAuthentication } from './components/NotAuthenticatedComponent';
import { requireAuthentication } from './components/AuthenticatedComponent';

export default (
    <Route path="/" component={App}>
        <Route path="/login" component={requireNoAuthentication(Login)} />
        <Route path="/conf" component={requireAuthentication(Config)} />
        <Route path="/dashboard" component={requireAuthentication(Dashboard)} />
        <Route path="/projects" component={requireAuthentication(Projects)} />
        <Route path="/projects/:projectId/tasks" component={requireAuthentication(Tasks)} />
        <Route path="/projects/new" component={requireAuthentication(NewProject)}/>
        <Route path="/tasks" component={requireAuthentication(Tasks)} />
        <Route path="/tasks/new" component={requireAuthentication(NewTask)}/>
        <Route path="/tasks/:taskId" component={requireAuthentication(Task)} />
        <Route path="/tasks/:taskId/new" component={requireAuthentication(NewWorkdone)} />
        <Route path="/users" component={requireAuthentication(Users)} />
        <Route path="/user/:userId" component={requireAuthentication(User)} />
        <Route path="/companies" component={requireAuthentication(Companies)} />
        <Route path="/companies/:companyId/projects" component={requireAuthentication(Projects)} />
        <Route path="*" component={requireAuthentication(NotFound)} />
    </Route>
);