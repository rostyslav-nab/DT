import Link from "next/link"
import Head from "next/head"
import classes from "../styles/AppWrapper.module.scss"

export function AppWrapper({children, title = 'Next | App'}) {
    return (
        <div className={classes.appWrapper}>
            <Head>
                <title>{title}</title>
            </Head>
            <nav className={classes.navigation}>
                <div className={classes.menu}>
                    <Link href={'/'}><a>Home</a></Link>
                    <Link href={'/posts'}><a>Posts</a></Link>
                </div>

                <div>
                    <h1>Next Blog</h1>
                </div>
            </nav>
            <div className={"container"}>
                <main className={'col-12'}>
                    <div className={classes.mainLogo}>
                        <img src="https://cdn.svgporn.com/logos/nextjs.svg" alt="mailLogo"/>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    )
}