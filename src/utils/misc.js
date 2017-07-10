import React from 'react';
import Filter from '../components/Filter';

export function parseJSON(response) {
    return response.data;
}

export function initializeFilters(cols){
    let res = {};
    for(var key in cols){
        if(String(key).toLowerCase() !== 'avatar') {
            res[key] = cols[key];
        }
    }
    return res;
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer
            ? reducer(state, action.payload)
            : state;
    };
}

export function addFilter(key, value, items, setter, adder, activeFilters){
    let filters = JSON.parse(JSON.stringify(items.filters));
    const remove = function(){
        removeFilter(key, value, adder, activeFilters)
    };
    activeFilters.push(
        <Filter
            key={key}
            field={key}
            value={value}
            searchFunction={items.search_function}
            removeFilter={remove}
        />
    );
    delete filters[key];
    setter(filters, items.search_function);
}

export function removeFilter(key, value, adder, activeFilters){
    let newActiveFilters = [];
    for(let i = 0; i < activeFilters.length; i++){
        if(activeFilters[i].key == key){
            activeFilters.splice(i, 1);
        }
    }
    const newFilter = {};
    newFilter[key] = value;
    adder(newFilter);
}

export function dateFormat(date){
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}

export function getFieldType(field){
    let result = "text";
    switch(field){
        case "user_id.name":
            result = "many2one";
            break;
        case "hours":
            result =  "float";
            break;
        case "date":
            result = "date";
    }
    return result;
}

export function convertToDate(str){
    const parts = str.split("-");
    return new Date(parts[0],parts[1]-1,parts[2].split(' ')[0]);
}

export function errorAdd(err){
    let res = [];
    res.push('error');
    res.push(err);
    return res;
}

export function timeFormat(time, mode){
    let res = [];
    try {
        if(String(time).length === 0){
            res = errorAdd('ERROR: el temps no pot estar buit.')
        }
        else if (mode === 'float') {
            /*
            * String time converted to float
            * */
            if (time.indexOf(':') != -1) {
                const hours = parseFloat(time.split(':')[0]);
                const minutes = parseFloat(time.split(':')[1]) / 0.60;
                if(parseFloat(time.split(':')[1]) >= 60){
                    res = errorAdd('ERROR: els minuts no poden ser iguals o superiors a 60.');
                }
                else if(hours  && minutes){
                    res.push('ok');
                    res.push(parseFloat(hours + '.' + minutes));
                }
                else{
                    res = errorAdd('ERROR: Format desconegut.');
                }
            }
            else{
                res.push('ok');
                res.push(parseFloat(time));
            }

        }
        else if (mode === 'string') {
            /*
            * Float time converted to string
            * */
            const hours = Math.trunc(time);
        }
    }
    catch(err){
        res = errorAdd(err.message);
    }
    return res;
}