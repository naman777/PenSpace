import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar.tsx"
import { ProfileComp } from "../components/ProfileComp.tsx"
import axios from "axios"
import { BACKEND_URL } from "../config.ts"

export const  Profile = () =>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [about, setAbout] = useState("")


    const token = localStorage.getItem("token")
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await axios.get(`${BACKEND_URL}/api/v1/user/profile`, {
                headers: {
                    "Authorization":"Bearer " + token
                }
            })

            setName(response.data.name)
            setEmail(response.data.email)
            setFollowing(response.data.followingCount)
            setFollowers(response.data.followersCount)
            setAbout(response.data.about)

        }

        fetchData()
    })


    return(
        <div>
            <Appbar/>
            <div  className="flex  justify-start">
                <ProfileComp  userEmail={email} userName={name} followers={followers} following={following}  about={about}/> 
            </div>
        </div>
    )
}


