import Image from "next/image";
import { IoPeopleCircleSharp, IoLogoReact } from "react-icons/io5";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { FaWpforms } from "react-icons/fa6";
import { GrDomain } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { PiTextAUnderlineFill } from "react-icons/pi";
import Link from "next/link";
import Logo from "@/assets/logo.png"

export const Sidebar = () => {

    const functionalityItems = [
        {
            path: "/dashboard/main",
            icon: <RxDashboard size={40} />,
            title: "Dashboard",
            subtitle: "Control panel"
        },
        {
            path: "/dashboard/complaints",
            icon: <GrDomain size={40} />,
            title: "Complain Channel",
            subtitle: "Complaints List"
        }
    ];

    const configurationItems = [
        {
            path: "/dashboard/form-fields",
            icon: <FaWpforms size={40} />,
            title: "Forms",
            subtitle: "Form Configuration"
        },
        {
            path: "/dashboard/text-fields",
            icon: <PiTextAUnderlineFill size={40} />,
            title: "Texts",
            subtitle: "Text Configuration"
        },
        {
            path: "/dashboard/users-configuration",
            icon: <IoPeopleCircleSharp size={40} />,
            title: "Users",
            subtitle: "Users Configuration"
        }
    ];

    return (
        <div id="menu"
            style={{ width: '400px' }}
            className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 overflow-y-scroll">
            <div id="logo" className="my-4 px-6">
                <Link href={'/portal'}>
                    <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
                        <Image src={Logo} alt="logo" height={30} width={30} />
                        <span>Atom</span>
                        <span className="text-cyan-500">Dev</span>
                    </h1>
                </Link>
                <p className="text-slate-500 text-sm">Manage your actions and complaints</p>
            </div>
            <div id="profile" className="px-6 py-10">
                <p className="text-slate-500">Welcome back,</p>
                <a href="#" className="inline-flex space-x-2 items-center">
                    <span>
                        <Image className="rounded-full w-8 h-8"
                            src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
                            alt="user avatar"
                            width={50}
                            height={50} />
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        Rodrigo Catalán
                    </span>
                </a>
            </div>
            <div id="nav" className="w-full px-6">
                <div className="mb-4">
                    <h2 className="text-sm font-semibold text-slate-500 uppercase">Functionality</h2>
                    {functionalityItems.map(item => (
                        <SidebarMenuItem key={item.path} {...item} />
                    ))}
                </div>

                <div className="mt-8">
                    <h2 className="text-sm font-semibold text-slate-500 uppercase">Configuration</h2>
                    {configurationItems.map(item => (
                        <SidebarMenuItem key={item.path} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};
