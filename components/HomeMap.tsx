import dynamic from "next/dynamic"
import { Skeleton } from "./ui/skeleton"

const HomeMap = ({ location }: { location: string }) => {

    const LazyMap = dynamic(() => import('@/components/Map'), {
        ssr: false,
        loading: () => <Skeleton className="h-[50vh] w-full" />
    })

    return (
        <LazyMap location={location} />
    )
}

export default HomeMap