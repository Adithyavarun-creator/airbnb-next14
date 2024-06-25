"use client"
import { useState } from "react"
import { useCountries } from "@/app/lib/getCountries"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"
import CreationBottomBar from "@/components/CreationBottomBar"
import { createLocation } from "@/app/actions"

const AddressPage = ({ params }: { params: { id: string } }) => {

    const { getAllCountries,
        getCountryByValue, } = useCountries()

    const [location, setLocation] = useState('')

    const LazyMap = dynamic(() => import('@/components/Map'), {
        ssr: false,
        loading: () => <Skeleton className="w-full h-[50vh]" />

    })

    return (
        <>
            <div className="w-3/5 mx-auto mb-5">
                <h2 className="text-3xl font-semibold tracking-tight transition-colors ,b-10">
                    Where is your house located ?
                </h2>
            </div>

            <form action={createLocation}>
                <input type="hidden" name='homeId' value={params.id} />
                <input type="hidden" name='countryValue' value={location} />
                <div className="w-3/5 mx-auto mb-36">
                    <div className="mb-5">
                        <Select required
                            onValueChange={(value) => setLocation(value)}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder='Select a Country' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Countries</SelectLabel>
                                    {
                                        getAllCountries().map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.flag} {item.label} / {item.region}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <LazyMap location={location} />
                </div>
                <CreationBottomBar />
            </form>
        </>
    )
}

export default AddressPage