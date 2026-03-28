import { SignInButton, UserButton } from "@clerk/clerk-react"
import { ArrowRightIcon, Book, BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react"
import { use } from "react"
import { Link, useLocation } from "react-router"

function Navbar() {
    const { pathname } = useLocation()
    const isActive = (path) => {
        return pathname === path;
    }
    return (
        <nav className=" bg-base-100/80 backdrop-blur-md border-b border-primary/20 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
                    <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
                        <SparklesIcon className="size-6 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black bg-gradient-to-br from-primary via-secondary to-accent
            bg-clip-text text-transparent font-mono tracking-wider">Talent IQ</span>
                        <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
                    </div>

                </Link>
                <div className="flex items-center gap-1">
                    <Link to={'/problems'} className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive('/problems') ? "bg-primary text-primary-content" : 'hover:bg-base-200 text-base-content/70 hover:text-base-content'}`}>
                        <div className="flex items-center gap-x-2.5">
                            <BookOpenIcon className="size-4" />
                            <span className="hidden sm:inline font-medium">Problems</span>
                        </div>
                    </Link>
                    <Link to={'/dashboard'} className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive('/dashboard') ? "bg-primary text-primary-content" : 'hover:bg-base-200 text-base-content/70 hover:text-base-content'}`}>
                        <div className="flex items-center gap-x-2.5">
                            <LayoutDashboardIcon className="size-4" />
                            <span className=" hidden sm:inline font-medium">Dashboard</span>
                        </div>
                    </Link>
                    <div className="ml-4 mt-2">
                        <UserButton />

                    </div>
                </div>


            </div>
        </nav>
    )
}

export default Navbar
