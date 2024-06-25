import { MenuIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { Button } from "./ui/button";
import { createAirbnbHome } from "@/app/actions";



const UserNav = async () => {

    const { getUser } = getKindeServerSession()

    const user = await getUser()



    const createHomeWithId = createAirbnbHome.bind(null, {
        userId: user?.id as string
    })

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

                    <img
                        src=
                        {
                            user?.picture ?? "https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"
                        }
                        alt="default"
                        className="rounded-full w-8 h-8 hidden lg:block" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {
                    user ? <>
                        <DropdownMenuItem>
                            <form action={createHomeWithId} className="w-full" >
                                <button type="submit" className="w-full text-start">
                                    Airbnb your home
                                </button>
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/my-homes" className="w-full">My Listings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/favorites" className="w-full">My Favorites</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/reservations" className="w-full">My Reservations</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogoutLink>Logout</LogoutLink>
                        </DropdownMenuItem></> : <>
                        <DropdownMenuItem>
                            <RegisterLink>Register</RegisterLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LoginLink>Login</LoginLink>
                        </DropdownMenuItem></>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserNav