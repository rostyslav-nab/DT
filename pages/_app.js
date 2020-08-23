import '../styles/main.css'
import NextNprogress from 'nextjs-progressbar'
import {Provider} from "react-redux"
import {useStore} from "../redux/store"


export default function MyApp({Component, pageProps}) {
    const store = useStore(pageProps.initialReduxState)
    return (
        <Provider store={store}>
            <NextNprogress
                color="#29D"
                startPosition="0.3"
                stopDelayMs="200"
                height="3"
            />
            <Component {...pageProps} />
        </Provider>
    )
}






