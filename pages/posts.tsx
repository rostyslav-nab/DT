import {AppWrapper} from "../components/AppWrapper"
import Link from "next/link"
import {MyPost} from "../interfaces/post"
import {NextPageContext} from "next"
import axios from 'axios'

interface PostsPageProps {
    posts: MyPost[]
}

export default function Posts({posts}: PostsPageProps) {
    return (
        <AppWrapper title={'Post Page'}>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}><Link href={`/posts/[id]`} as={`/posts/${post.id}`}><a>{post.title}</a></Link></li>
                ))}
            </ul>
            <button className={'btn btn-dark'}>
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

// export const getServerSideProps = async ({req}: NextPageContext) => {
//     const response = await axios.get('https://simple-blog-api.crew.red/posts')
//         .then(res => res.data)
//     const posts: MyPost[] = response
//     return {
//         props: posts
//     }
// }
