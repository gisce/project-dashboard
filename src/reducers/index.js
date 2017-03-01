import { combineReducers } from 'redux'
import project from './Project'
import window from './CurrentWindow.js'

const todoApp = combineReducers({
    project,
    window
});

export default todoApp