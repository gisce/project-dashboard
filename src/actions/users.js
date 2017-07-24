import {FETCH_USERS_REQUEST, RECEIVE_USERS, SHOW_ALL_USER_TASKS_FLAG} from '../constants';
import {define_token} from '../utils/http_functions';
import {translationParse} from '../utils/misc';
import {receiveTasks, fetchTasksRequest} from './tasks';
import axios  from 'axios';
import {User, Task} from '../models/model';

export function fetchUsersRequest(initial) {
    const message = (initial)?null:"Refreshing users list";

    return {
        type: FETCH_USERS_REQUEST,
        payload: {
            message,
        },
    };
}

export function receiveUsers(users, initial) {
    const message = (initial)?null:"Users list updated";
    return {
        type: RECEIVE_USERS,
        payload: {
            users,
            message,
        },
    };
}

export function setShowAllUserTasksFlag(flag, initial){
    const message = (initial)?null:("Show all user tasks flag set to: " + String(flag));
    return {
        type: SHOW_ALL_USER_TASKS_FLAG,
        payload: {
            flag,
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
        let filter = [];
        if(userId){
            filter.push(["id", "=", parseInt(userId, 10)]);
        }
        let tasks_ids = [];
        let model = new User();
        model.search(filter, {
          transformResponse: [function (data) {
              let newData = JSON.parse(data);
              let results = [];
              if(newData.n_items > 0){
                  if(loadTasks){
                      dispatch(fetchTasksRequest(false));
                      let task = new Task();
                      task.search([
                          ["user_id", "=", parseInt(userId, 10)],
                          ["state", "in", ["open", "pending"]]
                      ], {
                          transformResponse: [function (data) {
                              let newTaskData = JSON.parse(data);
                              let tasks = task.parse(newTaskData, null);
                              task.functionCall("fields_get", {"args": [["state", "priority"], {"lang": "ca_ES"}]}, {
                                  transformResponse: [function (data) {
                                      let newData = JSON.parse(data);
                                      let p_trans = translationParse(newData, "priority");
                                      let s_trans = translationParse(newData, "state");
                                      for (let i = 0; i < tasks.length; i++) {
                                          const state_key = tasks[i]["state"];
                                          const priority_key = tasks[i]["priority"];
                                          tasks[i]["priority"] = p_trans[priority_key];
                                          tasks[i]["state"] = s_trans[state_key];
                                      }
                                      dispatch(receiveTasks(tasks, initial));
                                  }]
                              })
                          }]
                      });
                  }
              }
              results = model.parse(newData, tasks_ids);
              dispatch(receiveUsers(results), initial);
          }]
        });
    }
}