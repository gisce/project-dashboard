import { browserHistory } from 'react-router'
import parseJSON from './misc'
import axios  from 'axios'


export function redirectToRoute(route) {
    return () => {
        console.log("Redirecting to " + route + "...");
        browserHistory.push(route);
    };
}

export function define_token(token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = "token " + token;
    axios.defaults.headers.post['Content-Type'] = 'text/plain';
}