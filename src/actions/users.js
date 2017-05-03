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

export function fetchUsers(token, usuaris_originals, filter, initial = false) {
    return (dispatch) => {
        if(!axios.defaults.headers.common['Authorization']){
            define_token(token);
        }
        dispatch(fetchUsersRequest(initial));
        let uri = "http://localhost:5000/res.users?schema=login,name";
        if(filter){
            uri += filter;
        }
        axios.get(uri)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveUsers(parseUsers(response), usuaris_originals, initial));
            })
            .catch(error => {
                console.log("API ERROR", error);
            });
    }
}