import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom"

export const VerifyEmailOtpForm = () => {
  const [value, setValue] = useState("");
  const [verifying, setVerifying] = useState(false)
  const authToken = Cookies.get("verifyEmailToken")
  const navigate = useNavigate()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setVerifying(true)
    try {
        const sendReq = await fetch("http://localhost:3333/api/v1/verifyemailotp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${authToken}`
            },
            body: JSON.stringify({otp: value}),
            credentials: "include"
        })
        const apiRes = await sendReq.json()
        setVerifying(false)
        if (apiRes.success === true) {
          navigate("/profile")
        }
        Cookies.remove("verifyEmailToken")
        console.log(apiRes);
        
    } catch (error) {
        console.log(error);
        
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6 flex flex-col justify-center items-center min-h-screen">
        <h2 className="text-3xl">Enter otp sent to your email</h2>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      <div>
        {verifying ? (<Button disabled><Loader2 className="mr-2 h-4 animate-spin"/> Please wait...</Button>) : (<Button variant={"secondary"} className="w-36">Verify</Button>)}
        
      </div>
      </div>
    </form>
  );
};
