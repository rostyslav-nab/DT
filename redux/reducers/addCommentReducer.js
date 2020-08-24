const ADD_COMMENT = "ADD_COMMENT"

const initialState = {
    body: '',
    postId: ''
}

export const addCommentReducer = (state = initialState, { type, payload }) => {
    if(type === ADD_COMMENT) {
        return {...state, body: payload.body, postId: payload.postId}
    }

    return state
}