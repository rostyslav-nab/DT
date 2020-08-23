const ADD_TITLE = "ADD_TITLE"
const ADD_TEXT = "ADD_TEXT"

const initialState = {
    formTitle: '',
    formText: ''
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TEXT:
            return {...state, formText: action.formText}
        case ADD_TITLE:
            return {...state, formTitle: action.formTitle}
        default:
            return state
    }
}