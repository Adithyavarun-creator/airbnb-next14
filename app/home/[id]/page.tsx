import { createReservation } from "@/app/actions"
import prisma from "@/app/lib/db"
import { useCountries } from "@/app/lib/getCountries"
import CategoryShowcase from "@/components/CategoryShowcase"
import HomeMap from "@/components/HomeMap"
import SelectCalendar from "@/components/SelectCalendar"
import { ReservationSubmitButton } from "@/components/SubmitButtons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { unstable_noStore as noStore } from "next/cache";

async function getListing(homeId: string) {
    noStore()
    const data = await prisma.home.findUnique({
        where: {
            id: homeId
        },
        select: {
            price: true,
            photo: true,
            guests: true,
            bathrooms: true,
            description: true,
            categoryName: true,
            title: true,
            bedrooms: true,
            country: true,
            Reservation: {
                // select: {
                //     startDate: true,
                //     endDate: true
                // }
                where: {
                    homeId: homeId
                }
            },
            User: {
                select: {
                    profileImage: true,
                    firstName: true
                }
            }
        }
    })

    return data
}


const HomeDetail = async ({ params }: { params: { id: string } }) => {

    const { getUser } = getKindeServerSession()
    const user = await getUser()
    const data = await getListing(params?.id)

    const { getCountryByValue } = useCountries()
    const country = getCountryByValue(data?.country as string)

    return (
        <div className="w-[75%] mx-auto mt-10 mb-12">
            <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
            <div className="relative h-[550px]">
                <Image
                    alt="Image of Home"
                    src={`https://mzdnxnvamlhfwimkgjkn.supabase.co/storage/v1/object/public/images/${data?.photo}`}
                    fill
                    className="rounded-lg h-full object-cover w-full"
                />
            </div>

            <div className="flex justify-between gap-x-24 mt-8">
                <div className="w-2/3">
                    <h3 className="text-xl font-medium">
                        {country?.flag} {country?.label} / {country?.region}
                    </h3>

                    <div className="flex gap-x-2 text-muted-foreground">
                        <p className="">{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> * <p>{data?.bathrooms} Bathrooms</p>
                    </div>


                    <div className="flex items-center mt-6">
                        <img
                            src={data?.User?.profileImage ?? "https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"}
                            alt="userprofile"
                            className="w-11 h-11 rounded-full"
                        />

                        <div className="flex flex-col ml-4">
                            <h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
                            <p className="text-sm text-muted-foreground">Host since 2020</p>
                        </div>
                    </div>

                    <Separator className="my-7" />

                    <CategoryShowcase categoryName={data?.categoryName as string} />

                    <Separator className="my-7" />

                    <p className="text-muted-foreground">{data?.description}</p>

                    <Separator className="my-7" />

                    <HomeMap location={country?.value as string} />

                </div>
                <form action={createReservation}>
                    <input type="hidden" name="homeId" value={params.id} />
                    <input type="hidden" name="userId" value={user?.id} />
                    <SelectCalendar
                        reservation={data?.Reservation}
                    />

                    {user?.id ?
                        <ReservationSubmitButton />
                        :
                        <Button className="w-full" asChild>
                            <Link href="/api/auth/login">
                                Make a Reservation</Link>
                        </Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default HomeDetail