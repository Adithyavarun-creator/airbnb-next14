import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "../lib/db"
import { redirect } from "next/navigation"
import NoItems from "@/components/NoItems"
import ListingCard from "@/components/ListingCard"
import { unstable_noStore as noStore } from "next/cache";


async function getData(userId: string) {
    noStore()
    const data = await prisma.favorite.findMany({
        where: {
            userId: userId
        },
        select: {
            Home: {
                select: {
                    id: true,
                    photo: true,
                    Favorite: true,
                    country: true,
                    price: true,
                    description: true
                }
            }
        }
    })

    return data
}


const FavoritesPage = async () => {

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        return redirect('/')
    }

    const data = await getData(user?.id as string)



    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

            {
                data.length === 0 ? <NoItems
                    title="You do not have any favorite listings"
                    description="Please add a house that you like to book"
                /> :
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
                        {
                            data.map((item) => (
                                <ListingCard
                                    key={item.Home?.id}
                                    description={item.Home?.description as string}
                                    imagePath={item.Home?.photo as string}
                                    price={item.Home?.price as number}
                                    location={item.Home?.country as string}
                                    userId={user?.id as string}
                                    isInFavoriteList={(item.Home?.Favorite.length as number) > 0 ? true : false}
                                    favoriteId={item.Home?.Favorite[0]?.id as string}
                                    homeId={item.Home?.id as string}
                                    pathname="/favorites"
                                />
                            ))
                        }
                    </div>
            }
        </section>
    )
}

export default FavoritesPage