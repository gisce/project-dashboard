import { combineReducers } from 'redux'
import project from './project'
import projects from './projects'
import tasks from './tasks'

const appReducer = combineReducers({
    project,
    projects,
    tasks
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;