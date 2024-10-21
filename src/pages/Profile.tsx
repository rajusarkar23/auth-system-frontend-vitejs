import Cookies from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


const Profile = () => {

  const authToken = Cookies.get("sessionToken")
  console.log(authToken);
  const navigate = useNavigate()
  

  useEffect(() => {
    const checkValidUser = async () => {
      try {
        const sendReq = await fetch("http://localhost:3333/api/v1/checkvalidjwt", {
          method: "POST",
          headers: {
            Authorization: `${authToken}`
          },
          credentials: "include"
        })

        const apiRes = await sendReq.json()
        if (apiRes.success === false) {
          navigate("/login")
        }
        
      } catch (error) {
        console.log(error);
      }
    }

    checkValidUser()
  }, [navigate])

  return (
    <div>Profile</div>
  )
}

export default Profile