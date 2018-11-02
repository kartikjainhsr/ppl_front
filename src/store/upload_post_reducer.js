const intialState = {
    selectedImage : '',
    caption : '',
    category : ''
}

const upload_post_reducer = (state = intialState , action) => {
    return {
        ...state,
        [action.type] : action.value
    };
}

export default upload_post_reducer;