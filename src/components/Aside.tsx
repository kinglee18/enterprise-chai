'use client';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { FaUser, FaRocket, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { logout } from "@/actions/account";

export default function Aside() {
    //get the current route
    const currentRoute = usePathname()
    const routes = [
        {route: '/home/csm', icon: <FaRocket/>, name: 'CSM Companion'},
        {route: '/home/materials', icon: <FaFileAlt/>, name: 'Reference Materials'},
        {route: '/home/customers', icon: <FaUser/>, name: 'Customers'}
    ]

    const handleLogout = async () => {
        await logout()
    }


    return <aside className="bg-customGradient p-1 flex flex-col h-full w-full sm:w-64 border-r border-gray-200">
        <a className="flex mt-4 p-x-1.5 justify-center" href={'/home/csm'}>
            <span className={'text-primarySmall text-base font-medium'}>Enterprise</span>
            <Image src="/cup_logo.svg" alt="Logo" width={26} height={16} className={'mx-1'}/>
            <span className={'text-primarySmall  text-base font-bold'}>CH</span>
            <span className={'text-greenLogo text-base font-bold'}>AI</span>
        </a>
        {/* stretch */}
        <div className="flex flex-col mt-16 px-3 flex-grow">
            {routes.map((route, index) => (
                <a
                    className={`btn-dashboard ${
                        currentRoute === route.route ? ' text-primarySmall' : ''
                    } whitespace-nowrap`}
                    href={route.route}
                    key={index}>
                    <div>
                        {route.icon}
                    </div>
                    {route.name}
                </a>
            ))}
        </div>

        <div className="flex flex-col px-3 mb-4">
            <button
                    className={`btn-dashboard whitespace-nowrap`}
                    onClick={handleLogout}
                    key={'logout'}>
                    <div>
                        <FaSignOutAlt/>
                    </div>
                    {'Logout'}
            </button>
        </div>

    </aside>
}
