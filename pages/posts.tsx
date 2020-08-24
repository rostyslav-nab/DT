import {AppWrapper} from "../components/AppWrapper"
import Link from "next/link"
import {MyPost} from "../interfaces/post"
import {NextPageContext} from "next"
import classes from '../styles/Posts.module.scss'
import axios from 'axios'
import Router from 'next/router'

interface PostsPageProps {
    posts: MyPost[]
}

export default function Posts({posts}: PostsPageProps) {

    const deletePostHandler = (postId) => {
        axios.delete(`https://simple-blog-api.crew.red/posts/${postId}`)
        Router.push('/')
    }

    return (
        <AppWrapper title={'Post Page'}>
            <h1 className={classes.mainTitle}>Posts</h1>
            <div className={classes.postList}>
                {posts.map(post => (
                    <div className="card">
                        <div className="card-body">
                            <p key={post.id}><Link href={`/posts/[id]`} as={`/posts/${post.id}`}><a>{post.title}</a></Link></p>
                            <button onClick={() => deletePostHandler(post.id)} className={'btn btn-danger'}>Delete Post</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className={classes.newPostButton}>
                <Link href={'/posts/new'}>
                    <a>Create New Post</a>
                </Link>
            </button>
        </AppWrapper>
    )
}

Posts.getInitialProps = async ({req}: NextPageContext) => {
    const response = await axios.get('https://simple-blog-api.crew.red/posts')
        .then(res => res.data)
    const posts: MyPost[] = response
    return {
        posts
    }
}