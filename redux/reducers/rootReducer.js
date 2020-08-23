import {postReducer} from "./postReducer"
import {addCommentReducer} from "./addCommentReducer"
import {combineReducers} from "redux"

const reducers = {
    addPost: postReducer,
    addComment: addCommentReducer
}

export default combineReducers(reducers)
