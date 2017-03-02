import { combineReducers } from 'redux'
import project from './project'

const appReducer = combineReducers({
    project
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;