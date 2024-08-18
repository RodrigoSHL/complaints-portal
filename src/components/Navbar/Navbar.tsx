import Image from "next/image";

import Logo from "@/assets/logo.png"
import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="bg-transparent py-4 px-6 fixed w-full top-0 left-0 flex justify-between items-center">
            <Link href='/dashboard/form-fields'>
                <Image src={Logo} alt="logo" height={70} width={70} />
            </Link>
        </nav>)
}