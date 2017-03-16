import { combineReducers } from 'redux'
import project from './project'
import projects from './projects'
import tasks from './tasks'
import search from './search'

const appReducer = combineReducers({
    project,
    projects,
    tasks,
    search
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;