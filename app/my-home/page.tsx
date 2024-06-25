import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import prisma from "../lib/db"
import { redirect } from "next/navigation"
import NoItems from "@/components/NoItems"
import ListingCard from "@/components/ListingCard"
import { unstable_noStore as noStore } from "next/cache";


async function getData(userId: string) {
    noStore()
    const data = await prisma.home.findMany({
        where: {
            userId: userId,
            addedCategory: true,
            addedDescription: true,
            addedLocation: true
        },
        select: {
            id: true,
            country: true,
            price: true,
            description: true,
            photo: true,
            Favorite: {
                where: {
                    userId: userId
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return data
}


const ListingsPage = async () => {

    const { getUser } = getKindeServerSession()

    const user = await getUser()

    if (!user) {
        return redirect('/')
    }

    const data = await getData(user?.id as string)

    //console.log(data);


    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">
                Your Homes
            </h2>

            {
                data.length === 0 ?
                    <NoItems
                        title="You do not have any homes listed"
                        description="Please list a home on Airbnb , so you can see it here"
                    /> :
                    <>
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-9">
                            {
                                data.map((item) => (
                                    <ListingCard
                                        key={item.id}
                                        description={item.description as string}
                                        imagePath={item.photo as string}
                                        price={item.price as number}
                                        location={item.country as string}
                                        userId={user?.id as string}
                                        isInFavoriteList={item.Favorite.length > 0 ? true : false}
                                        favoriteId={item.Favorite[0]?.id as string}
                                        homeId={item.id as string}
                                        pathname="/my-home"

                                    />
                                ))
                            }
                        </div></>
            }
        </section>
    )
}

export default ListingsPage