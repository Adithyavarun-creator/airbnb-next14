"use client"

import { categoryItems } from "@/app/lib/categoryItems"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

const MapFilterItems = () => {
    const pathName = usePathname()

    const searchParams = useSearchParams()
    const search = searchParams.get('filter')

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

        return params.toString()
    }, [searchParams])

    return (
        <div className="no-scrollbar flex flex-row items-center gap-x-10 mt-5 w-full overflow-x-scroll">
            {
                categoryItems.map((item) => (
                    <Link
                        key={item.id} href={
                            pathName + "?" + createQueryString('filter', item.name)
                        }
                        className={cn(
                            search === item.name ?
                                "border-b-2 border-black p-2 flex-shrink-0" :
                                "opacity-70 flex-shrink-0", "flex flex-col gap-y-3 items-center"
                        )}>
                        <div className="relative h-6 w-6">
                            <Image
                                alt="category"
                                src={item.imageUrl}
                                className="h-6 w-6"
                                width={24}
                                height={24}
                            />
                        </div>
                        <p className="text-xs font-medium">{item.title}</p>
                    </Link>
                ))
            }
        </div >
    )
}

export default MapFilterItems