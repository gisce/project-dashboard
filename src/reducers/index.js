import { combineReducers } from 'redux'
import projects from './projects'
import tasks from './tasks'
import taskWork from './task_work'
import search from './search'

const appReducer = combineReducers({
    projects,
    tasks,
    taskWork,
    search
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;