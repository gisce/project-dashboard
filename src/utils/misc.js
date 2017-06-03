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
