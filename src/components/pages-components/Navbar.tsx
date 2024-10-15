import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="bg-zinc-950 h-16 flex items-center justify-center">
            <Link to={"/"}><h2 className="text-3xl text-gray-300 font-semibold">User registration and login.</h2></Link>
            
        </nav>
    )
}