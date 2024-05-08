import { Avatar } from "./BlogCard.tsx"
import { Link, useNavigate } from "react-router-dom"

export const Appbar = () => {
    const navigate = useNavigate()
    const email = localStorage.getItem('email');
    return <div className="border-b flex justify-between px-10 py-2 ">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                PenSpace
        </Link>
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            
            <Link to={`/myblogs`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">My Blogs</button>
            </Link>
            <button onClick={()=>{
                localStorage.removeItem('token')
                navigate("/")
            }  } className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Log Out</button>

            <Avatar size={"big"} name={email?.toUpperCase()}  onClick={()=>{
                navigate("/profile")
            }}/>
        </div>
    </div>
}