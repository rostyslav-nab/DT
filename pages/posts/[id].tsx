import {useState, useEffect} from 'react'
import {AppWrapper} from "../../components/AppWrapper"
import {useRouter} from "next/router"
import {useDispatch} from 'react-redux'
import {NextPageContext} from "next"
import {MyPost} from "../../interfaces/post"
import axios from 'axios'
import classes from '../../styles/id.module.scss'

const ADD_COMMENT = "ADD_COMMENT"

const useAddComment = () => {
    const [commentBody, setCommentBody] = useState('')
    const dispatch = useDispatch()
    const router = useRouter()
    const id = router.query.id
    const addCommentHandler = (e): void => {
        setCommentBody(e.target.value)
        dispatch({
            type: ADD_COMMENT,
            payload: {
                body: commentBody,
                postId: id
            }
        })
    }

    const submitFormHandler = (e) => {
        if(!commentBody){
            return null
        }
        axios({
            method: 'post',
            url: 'https://simple-blog-api.crew.red/comments',
            data: {
                body: commentBody,
                postId: id
            }
        });
    }

    // комментарий для поста добавлен на сервер

    return {addCommentHandler, submitFormHandler}
}

export default function Post(posts: MyPost) {
    const {addCommentHandler, submitFormHandler} = useAddComment()
    const [post, setPost] = useState(posts)
    const [commentData, setCommentData] = useState([])
    const router = useRouter()
    useEffect(() => {
        const load = () => {
            axios.get<MyPost>(`https://simple-blog-api.crew.red/posts/${router.query.id}`)
                .then(res => {
                    setPost(res.data)
                })
        }
        load()
    }, [])


    const downloadComment = async () => {
        await axios({
            method: 'get',
            url: `https://simple-blog-api.crew.red/comments/?postId=${router.query.id}`,
        }).then(res => setCommentData(res.data))
    }


    return (
        <AppWrapper>
            <h1>{post.title}</h1>
            <hr/>
            <p>{post.body}</p>
            <form onSubmit={submitFormHandler}>
                <div className="form-group">
                    <label htmlFor="comment">Add comment</label>
                    <input type="text" onChange={addCommentHandler} className="form-control" id="comment"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className={classes.button}>
                <button onClick={downloadComment} className={'btn btn-info'}>Download comment</button>
            </div>
            <div className={classes.commentBlock}>
                {commentData.map(elem => {
                    if(typeof elem['body'] === "undefined"){
                        return null
                    }
                    return (
                        <div className={classes.comment}>{elem.body}</div>
                    )
                })}
            </div>
        </AppWrapper>
    )
}

interface PostNextPageContext extends NextPageContext {
    query: {
        id: string
    }
}

export const getServerSideProps = async ({query, req}: PostNextPageContext) => {
    const response = await axios.get<MyPost>(`https://simple-blog-api.crew.red/posts/${query.id}`)
        .then(res => res.data)
    const posts: MyPost = response
    return {
        props: posts
    }
}