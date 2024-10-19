import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";



export const Oauth = () => {

  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    scope: "openid profile email",
    onSuccess: (tokenRes) => {
      console.log(tokenRes);
      
      fetch("http://localhost:3333/api/v1/googleauth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenRes.access_token }),
      })
      .then((response) => {
        if(!response){
          return Promise.reject(new Error("Failed to authenticate"))
        }
        return response.json()
      })
      .then((data) => {
        console.log(data);
        if (data.success === false) {
          console.log("Failed");
          return
        }
        const cookie  = data.jwt_token
        Cookies.set("sessionToken",cookie)
        console.log(cookie);
        
        navigate("/profile")
      })
      .catch((error) => {
        console.error("Error", error)
      })
    },
    onError: (errorRes) => console.log(errorRes),
  });

  return (
    <>
      <div>
        <Button onClick={() => googleLogin()} type="button" className="w-96">
          Continue with Google
        </Button>
      </div>
    </>
  );
};
