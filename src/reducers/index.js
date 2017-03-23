import { combineReducers } from 'redux'
import projects from './projects'
import tasks from './tasks'
import taskWorks from './task_work'
import search from './search'

const appReducer = combineReducers({
    projects,
    tasks,
    taskWorks,
    search
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;