const ADD_COMMENT = "ADD_COMMENT"

const initialState = {
    body: '',
    postId: ''
}

export const addCommentReducer = (state = initialState, { type, payload }) => {
    if(type === ADD_COMMENT) {
        return {
            body: payload.ts,
            postId: !!payload.light,
        }
    }

    return state
}