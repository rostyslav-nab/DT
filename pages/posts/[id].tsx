import {useState, useEffect} from 'react'
import {AppWrapper} from "../../components/AppWrapper"
import {useRouter} from "next/router"
import {NextPageContext} from "next"
import {MyPost} from "../../interfaces/post"
import axios from 'axios'


export default function Post(posts: MyPost) {

    const [postId, setPostId] = useState(null)
    const [comment, setComment] = useState(null)
    const [serverComment, setServerComment] = useState([])
    const [post, setPost] = useState(posts)
    const router = useRouter()


    useEffect(() => {
        const load = () => {
            axios.get<MyPost>(`https://simple-blog-api.crew.red/posts/${router.query.id}`)
                .then(res => setPost(res.data))
        }
        setPostId(router.query.id)
        load()
    }, [])

    // const addComment = () => {
    //     axios({
    //         method: 'post',
    //         url: 'https://simple-blog-api.crew.red/comments',
    //         data: {
    //             postId,
    //             body: comment
    //         }
    //     });
    // }
    //
    // useEffect(() => {
    //     axios.post(`https://simple-blog-api.crew.red/comments/${postId}`)
    //         .then(res => setServerComment(res.data))
    // }, [addComment])
    //
    //
    // const commentHandler = (e) => {
    //     setComment(e.target.value)
    // }

    return (
        <AppWrapper>
            <h1>{post.title}</h1>
            <hr/>
            <p>{post.body}</p>
            {/*<form onSubmit={addComment}>*/}
            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="comment">Comment</label>*/}
            {/*        <input type="text" className="form-control" id="comment" aria-describedby="emailHelp"*/}
            {/*               onChange={commentHandler}/>*/}
            {/*    </div>*/}
            {/*    <button type="submit" className="btn btn-primary">Submit</button>*/}
            {/*</form>*/}

            {/*<p>{serverComment}</p>*/}
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