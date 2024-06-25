import ListingCard from "@/components/ListingCard";
import MapFilterItems from "@/components/MapFilterItems";
import prisma from "./lib/db";
import { Suspense } from "react";
import SkeletonCard from "@/components/SkeletonCard";
import NoItems from "@/components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData({ searchParams, userId }: {
  userId: string | undefined,
  searchParams?: {
    filter?: string,
    country?: string,
    guest?: string,
    room?: string,
    bathroom?: string
  }
}) {
  noStore()
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      title: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined
        }
      }
    },

  })

  return data
}

export default function Home({ searchParams }: {
  searchParams?: {
    filter?: string,
    country?: string,
    guest?: string,
    room?: string,
    bathroom?: string
  }
}) {

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}


async function ShowItems({ searchParams, }: {

  searchParams?: {
    filter?: string,
    country?: string,
    guest?: string,
    room?: string,
    bathroom?: string
  }
}) {

  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData({ searchParams: searchParams, userId: user?.id })

  return (
    <>
      {
        data.length === 0 ? <>
          <NoItems title="Sorry no listings found for this category found"
            description="Please check other category or create your new listing" />
        </> :
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {
              data.map((item) => (
                <ListingCard key={item.id}
                  description={item.description as string}
                  imagePath={item.photo as string}
                  price={item.price as number}
                  location={item.country as string}
                  userId={user?.id as string}
                  isInFavoriteList={item.Favorite.length > 0 ? true : false}
                  favoriteId={item.Favorite[0]?.id as string}
                  homeId={item.id as string}
                  pathname="/"
                />

              ))
            }
          </div>
      }
    </>
  )
}


async function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8" >
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

//PoX4dbp3OLP6BQ3F