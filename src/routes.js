import React from 'react';
import { Route } from 'react-router';

import { App } from './containers/App';
import Projects from './components/ProjectsView';
import Tasks from './components/TasksView';
import Task from './components/TaskView';

export default (
    <Route path="/" component={App}>
        <Route path="projects" component={Projects} />
        <Route path="tasks" component={Tasks} />
        <Route path="task" component={Task} />
    </Route>
);