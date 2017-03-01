const window = (state, action) => {
    switch(action.type) {
        case 'CURRENT_WINDOW':
            return{
                id: action.id,
                payload: action.payload
            };
        default:
            return state
    }
};

export default window;