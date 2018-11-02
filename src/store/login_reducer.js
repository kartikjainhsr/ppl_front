const intialState = {
    password : '', 
    email : ''
}

const login_reducer = (state = intialState , action) => {
    return {
        ...state,
        [action.type] : action.value
    };
}

export default login_reducer;