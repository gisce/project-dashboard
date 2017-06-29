import { combineReducers } from 'redux';
import auth from './auth';
import projects from './projects';
import tasks from './tasks';
import taskWorks from './task_work';
import search from './search';
import users from './users';
import companies from './companies';
import ui from './ui';
import breadcrumb from './breadcrumb';
import filter from './filter';
import config from './config';
import paginator from './paginator';

const appReducer = combineReducers({
    auth,
    projects,
    tasks,
    taskWorks,
    search,
    users,
    companies,
    ui,
    breadcrumb,
    filter,
    config,
    paginator
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;