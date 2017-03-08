import { combineReducers } from 'redux'
import project from './project'
import projects from './projects'

const appReducer = combineReducers({
    project,
    projects
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;