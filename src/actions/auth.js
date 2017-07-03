import {BASIC_AUTH_REQUEST, BASIC_AUTH_RESPONSE, SET_TOKEN, LOGOUT, BASIC_AUTH_ERROR} from '../constants'
import axios  from 'axios';

export function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: {
            token: token
        }
    }
}

export function logOut(){
    return {
        type: LOGOUT
    }
}

export function basicAuthRequest() {
    return {
        type: BASIC_AUTH_REQUEST,
        payload: {
            isAuthenticating: true
        }
    }
}

export function basicAuthResponse(result) {
    return {
        type: BASIC_AUTH_RESPONSE,
        payload: {
            isAuthenticated: result["isAuthenticated"],
            token: result["token"]
        }
    }
}

export function basicAuthError(){
    return {
        type: BASIC_AUTH_ERROR,
        payload: {
            error: "Usuari o contrassenya incorrectes."
        }
    }
}

export function basicAuth(user, password) {
    return (dispatch) => {
        dispatch(basicAuthRequest());
        const uri = "http://erp-ti.gisce.lan:5000/token";
        const body = {
            auth: {
                username: user,
                password: password
            }
        };
        let result = {
            token: null,
            isAuthenticated: false
        };
        axios.get(uri, body)
            .then(res => {
                if ("token" in res.data && res.status == 200) {
                    result["token"] = res.data["token"];
                    result["isAuthenticated"] = true;
                }
                dispatch(basicAuthResponse(result));
            })
            .catch(function (error) {
                dispatch(basicAuthError());
            });
    }
}