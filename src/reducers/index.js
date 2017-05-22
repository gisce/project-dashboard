import { combineReducers } from 'redux'
import projects from './projects'
import tasks from './tasks'
import taskWorks from './task_work'
import search from './search'
import users from './users'
import companies from './companies'
import ui from './ui'
import breadcrumb from './breadcrumb'

const appReducer = combineReducers({
    projects,
    tasks,
    taskWorks,
    search,
    users,
    companies,
    ui,
    breadcrumb
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;