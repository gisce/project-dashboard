const project = (state, action) => {
    switch(action.type) {
        case 'ADD_PROJECT':
            return{
                payload: action.payload
            };
        default:
            return state
    }
};

export default project;