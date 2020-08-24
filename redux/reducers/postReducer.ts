import {postState} from "../../interfaces/addPost"

const ADD_TITLE = "ADD_TITLE"
const ADD_TEXT = "ADD_TEXT"


const initialState: postState = {
    formTitle: '',
    formText: ''
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case typeof ADD_TEXT:
            return {...state, formText: action.formText}
        case typeof ADD_TITLE:
            return {...state, formTitle: action.formTitle}
        default:
            return state
    }
}