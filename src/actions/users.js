import {FETCH_USERS_REQUEST, RECEIVE_USERS} from '../constants'
import {redirectToRoute, define_token} from '../utils/http_functions'
import {parseJSON, parseUsers, parseTasksIds} from '../utils/misc'
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
            message,
        },
    };
}

export function fetchUsers(token, userId, loadTasks, initial = false) {
    return (dispatch) => {
        if(!axios.defaults.headers.common['Authorization']){
            define_token(token);
        }
        dispatch(fetchUsersRequest(initial));
        let uri = "http://localhost:5000/res.users?schema=login,name";
        let filter = "";
        if(userId){
            filter = "&filter=[('id','='," + userId + ")]";
            uri += filter;
        }
        let tasks_ids = [];
        axios.get(uri)
            .then(parseJSON)
            .then(response => {
                if(loadTasks){
                    axios.get("http://localhost:5000/project.task?schema=id" +
                        "&filter=[('user_id','='," + userId + ")," +
                        "('state','in',['open','pending'])]")
                        .then(parseJSON)
                        .then(tasksResponse => {
                            tasks_ids = parseTasksIds(tasksResponse);
                            dispatch(receiveUsers(parseUsers(response, tasks_ids), initial));
                        }).catch(error => {
                            console.log("API ERROR (Tasks IDS)", error);
                        });
                }
                dispatch(receiveUsers(parseUsers(response, tasks_ids), initial));
            })
            .catch(error => {
                console.log("API ERROR", error);
            });
    }
}