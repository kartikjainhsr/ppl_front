const intialState = {
    username : '',
    password : '', 
    email : '' , 
    fname : '', 
    lname : ''
}

const register_reducer = (state = intialState , action) => {
    return {
        ...state,
        [action.type] : action.value
    };
}

export default register_reducer;