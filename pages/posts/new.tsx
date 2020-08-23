import axios from 'axios'
import { useState } from "react"
import {AppWrapper} from "../../components/AppWrapper"
import classes from '../../styles/newPost.module.scss'

export default function CreateNewPost() {

    const [formTitle, setFormTitle] = useState('')
    const [formText, setFormText] = useState('')

    const submitFormHandler = (e) => {
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

    const titleHandler = (e) => {
        const text = e.target.value
        setFormTitle(text)
    }

    const textHandler = (e) => {
        const text = e.target.value
        setFormText(text)
    }
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

