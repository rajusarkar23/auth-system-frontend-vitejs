import { app } from "@/firebase"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { Button } from "../ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router"
export const Oauth = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    setIsSubmitting(true)
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      console.log(result);
      
      const apiReq = await fetch("http://localhost:3333/api/v1/googleauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        })
      })
      console.log(result.user.email);
      
      const apiRes = await apiReq.json()
      setIsSubmitting(false)

      if (apiRes.success === true) {
        navigate("/profile")
      } else{
        console.log("Something went wrong");
        
      }

    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div>
      {
        isSubmitting ? (
          <Button type="button" className="w-96" disabled><Loader2 className="mr-2 h-4 animate-spin"/>Please wait...</Button>
        ) : ( <Button className="w-96" onClick={handleClick} type="button"> Continue with google</Button>)
      }
     
    </div>
  )
}