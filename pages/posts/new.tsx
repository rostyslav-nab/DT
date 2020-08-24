import axios from 'axios'
import {AppWrapper} from "../../components/AppWrapper"
import classes from '../../styles/newPost.module.scss'
import { useDispatch } from 'react-redux'
import {useState} from "react";

const ADD_TITLE = 'ADD_TITLE'
const ADD_TEXT = 'ADD_TEXT'

const useCreatePost = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const titleHandler = (e) => {
        const text = e.target.value
        setTitle(text)
        dispatch({
            type: ADD_TITLE,
            formTitle: text
        })
    }

    const textHandler = (e) => {
        const text = e.target.value
        setText(text)
        dispatch({
            type: ADD_TEXT,
            formText: text
        })
    }

    const submitFormHandler = (e): void => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'https://simple-blog-api.crew.red/posts',
            data: {
                title: title,
                body: text
            }
        });
    }
    return {titleHandler, textHandler, submitFormHandler}
}
export default function CreateNewPost() {
    const {titleHandler, textHandler, submitFormHandler} = useCreatePost()
    return (
        <AppWrapper>
            <h1>Create new post</h1>
            <form onSubmit={submitFormHandler}>
                <div className="form-group">
                    <label htmlFor="title">Title of Post</label>
                    <input type="text" onChange={titleHandler} className="form-control" id="title"
                           aria-describedby="title"/>
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
