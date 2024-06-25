import Image from "next/image"
import Link from "next/link"
import DesktopLogo from '.././public/airbnb-desktop.png'
import MobileLogo from '.././public/airbnb-mobile.webp'
import UserNav from "./UserNav"
import SearchComponent from "./SearchComponent"

const Navbar = () => {
    return (
        <nav className="w-full border-b">
            <div className="flex justify-between items-center mx-auto px-5 lg:px-10 py-5">
                <Link href="/">
                    <Image
                        src={DesktopLogo}
                        className="w-32 hidden lg:block"
                        alt="Desktop logo"
                    />

                    <Image
                        src={MobileLogo}
                        className="w-12 block lg:hidden"
                        alt="Mobile logo"
                    />
                </Link>

                <SearchComponent />
                <UserNav />
            </div>
        </nav>
    )
}

export default Navbar