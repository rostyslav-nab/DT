import {useState, useEffect} from 'react'
import {AppWrapper} from "../../components/AppWrapper"
import {useRouter} from "next/router"
import {NextPageContext} from "next"
import {MyPost} from "../../interfaces/post"
import axios from 'axios'

export default function Post(posts: MyPost) {

    const [post, setPost] = useState(posts)
    const router = useRouter()
    useEffect(() => {
        const load = () => {
            axios.get<MyPost>(`https://simple-blog-api.crew.red/posts/${router.query.id}`)
                .then(res => setPost(res.data))
        }
        load()
    }, [])


    return (
        <AppWrapper>
            <h1>{post.title}</h1>
            <hr/>
            <p>{post.body}</p>
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