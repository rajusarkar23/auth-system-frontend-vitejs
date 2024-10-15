import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <main className="flex items-center justify-center mt-24">
      <div className="space-x-3">
        <Link to={"/register"}><Button className="w-28 text-xl">Register</Button></Link>
        <Link to={"/login"}><Button className="w-28 text-xl">Login</Button></Link>
      </div>
    </main>
  )
}

export default Home