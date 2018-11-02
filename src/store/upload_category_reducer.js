const intialState = {
    selectedImage : '',
    category : ''
}

const upload_category_reducer = (state = intialState , action) => {
    return {
        ...state,
        [action.type] : action.value
    };
}

export default upload_category_reducer;