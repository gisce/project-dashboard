import { browserHistory } from 'react-router'
import { API_PREFIX } from '../constants/index'
import parseJSON from './misc'
import axios  from 'axios'


export function redirectToRoute(route) {
    return () => {
        console.log("Redirecting to " + route + "...");
        browserHistory.push(route);
    };
}

export function validate_token(token) {
    if(token === "null"){
        return false;
    }
    return true;
}

export function define_token(token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = "token " + token;
    axios.defaults.headers.post['Content-Type'] = 'text/plain';
}