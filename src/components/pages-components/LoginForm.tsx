import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie";

interface formFields {
    usernameOrEmail: string;
    password: string;
}

export const LoginForm = () => {
    const [isDubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate() 
    const {register, handleSubmit, formState: {errors}} = useForm<formFields>()

    const onSubmit: SubmitHandler<formFields> = async (data) => {
      setIsSubmitting(true)
        try {
            const apiReq = await fetch("http://localhost:3333/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })

            const apiRes = await apiReq.json()
            setIsSubmitting(false)
            console.log(apiRes);
            if (apiRes.success === true) {
              navigate("/profile")
              const jwt = apiRes.jwt_token
              Cookies.set("sessionToken",jwt)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center min-h-screen space-y-3">
        <h2  className="text-3xl font-semibold">Login</h2>
        <div>
          <label className="flex">Email</label>
          <Input
            type="text"
            placeholder="Username or email"
            {...register("usernameOrEmail", {required: {value: true, message: "Email is required"}}) }
            className="w-96 focus:bg-zinc-950  focus:border-none transition-all"
          />
          {errors.usernameOrEmail && <p className="text-red-500 font-semibold">{errors.usernameOrEmail.message}</p>}
        </div>
        <div>
          <label className="flex">Password</label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {required: {value: true, message: "Password is required"}, minLength: {value: 6, message:"Password should be 6 characters"}})}
            className="w-96 focus:bg-zinc-950  focus:border-none transition-all"
          />
          {errors.password && <p className="text-red-500 font-semibold">{errors.password.message}</p>}
        </div>
        <div>
            {isDubmitting ? (<Button disabled className="w-96"><Loader2 className="mr-2 h-4 animate-spin"/> Please wait...</Button>) : (<Button className="w-96" variant={"secondary"}>Login</Button>)}
        </div>
      </div>
    </form>
  );
};
