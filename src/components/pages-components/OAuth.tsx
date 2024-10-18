import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";

export const Oauth = () => {

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
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
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
