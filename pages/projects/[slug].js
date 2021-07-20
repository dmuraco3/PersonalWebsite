import {useRouter} from "next/router"
import Navigation from '../../components/navbar'

export default function Project() {
    const router = useRouter()
    const { slug } =  router.query
    return (
        <main>
            <Navigation />
            <h1>{slug} </h1>

        </main>
    )
}