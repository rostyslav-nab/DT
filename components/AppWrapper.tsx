import Link from "next/link"
import Head from "next/head"
import classes from "../styles/AppWrapper.module.scss"

export function AppWrapper({children, title = 'Next | App'}) {
    return (
        <div className={'container'}>
            <Head>
                <title>{title}</title>
            </Head>
            <nav className={classes.navigation}>
                <Link href={'/'}><a>Latest Post</a></Link>
                <Link href={'/posts'}><a>Posts</a></Link>
            </nav>

            <main className={'col-12'}>
                {children}
            </main>
        </div>
    )
}