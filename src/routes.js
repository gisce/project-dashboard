import React from 'react';
import { Route } from 'react-router';

import { App } from './containers/App';
import Projects from './components/ProjectsView';

export default (
    <Route path="/" component={App}>
        <Route path="projects" component={Projects} />
    </Route>
);