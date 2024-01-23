import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="bg-white p-4 border-b border-primary">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Image src="/logo.png" alt="Logo"   width={190}  height={260}/>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a>
                    <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
                </div>

                <div className="hidden md:flex items-center">
                    <a href="#" className="text-gray-600 hover:text-gray-800 mr-4">Log in</a>
                    <button className="bg-primary text-white px-4 py-2">
                        Get Started for Free
                    </button>
                </div>
            </div>
        </nav>
    )
}
