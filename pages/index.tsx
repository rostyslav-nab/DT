import {AppWrapper} from "../components/AppWrapper"
import Link from "next/link"


export default function Home() {
  return (
      <AppWrapper title={'Home Page'}>
        <h1>Next JS</h1>
          <Link href={'/posts'}><a>Posts</a></Link>
      </AppWrapper>
  )
}
