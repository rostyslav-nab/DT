import axios from 'axios'
import {AppWrapper} from "../../components/AppWrapper"
import classes from '../../styles/newPost.module.scss'
import { useSelector, useDispatch } from 'react-redux'
const ADD_TITLE = 'ADD_TITLE'
const ADD_TEXT = 'ADD_TEXT'

const useCreatePost = () => {
    const formTitle = useSelector((state) => state.formTitle)
    const formText = useSelector((state) => state.formText)
    const dispatch = useDispatch()
    const titleHandler = (e):void => {
        const text = e.target.value
        dispatch({
            type: ADD_TITLE,
            formTitle: text
        })
    }
    const textHandler = (e):void => {
        const text = e.target.value
        dispatch({
            type: ADD_TEXT,
            formText: text
        })
    }

    const submitFormHandler = (e):void => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'https://simple-blog-api.crew.red/posts',
            data: {
                title: formTitle,
                body: formText
            }
        });
    }


    return { titleHandler, textHandler, submitFormHandler }
}

export default function CreateNewPost() {
    const { titleHandler, textHandler, submitFormHandler } = useCreatePost()
    return (
        <AppWrapper>
            <h1>Create new post</h1>
            <form onSubmit={submitFormHandler}>
                <div className="form-group">
                    <label htmlFor="title">Title of Post</label>
                    <input type="text" onChange={titleHandler} className="form-control" id="title" aria-describedby="title"/>
                    <small id="title" className="form-text text-muted">Please enter the text</small>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Text of the Post</label>
                    <input type="text" onChange={textHandler} className="form-control" aria-describedby="body"/>
                </div>
                <button className={classes.newPostButton}>Add Post</button>
            </form>
        </AppWrapper>
    )
}

