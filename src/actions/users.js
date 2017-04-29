import {FETCH_USERS_REQUEST, RECEIVE_USERS} from '../constants'
import {redirectToRoute, define_token} from '../utils/http_functions'
import {parseJSON, parseUsers} from '../utils/misc'
import axios  from 'axios'

export function fetchUsersRequest(initial) {
    const message = (initial)?null:"Refreshing users list";

    return {
        type: FETCH_USERS_REQUEST,
        payload: {
            message,
        },
    };
}

export function receiveUsers(users, original_ids, initial) {
    const message = (initial)?null:"Users list updated";
    return {
        type: RECEIVE_USERS,
        payload: {
            users,
            original_ids,
            message,
        },
    };
}

export function fetchUsers(token, usuaris, initial = false) {
    return (dispatch) => {
        let users_ids = JSON.parse(usuaris);
        if(!axios.defaults.headers.common['Authorization']){
            define_token(token);
        }
        dispatch(fetchUsersRequest(initial));
        axios.get("http://localhost:5000/res.users?schema=login,name")
            .then(parseJSON)
            .then(response => {
                dispatch(receiveUsers(parseUsers(response), users_ids, initial));
            })
            .catch(error => {
                console.log("API ERROR", error);
            });
    }
}