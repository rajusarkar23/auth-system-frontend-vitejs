import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {useNavigate} from "react-router-dom"
useNavigate

interface formFields {
  email: string;
  password: string;
}
export const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formFields>();

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    setIsSubmitting(true);
    try {
      const sendReq = await fetch("http://localhost:3333/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      reset();
      setIsSubmitting(false);
      const apiResponse = await sendReq.json();
      console.log(apiResponse);
      if (apiResponse.success === true) {
        navigate("/verify-otp")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center min-h-screen space-y-3">
        <h2 className="text-3xl font-semibold">Register</h2>
        <div>
          <label className="flex">Email</label>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "Email id is required" },
            })}
            className="w-96 focus:bg-zinc-950  focus:border-none transition-all"
          />
          {errors.email && (
            <p className="text-red-500 font-semibold">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="flex">Password</label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 6,
                message: "Password should be 6 character long",
              },
            })}
            className="w-96 focus:bg-zinc-950  focus:border-none transition-all"
          />
          {errors.password && (
            <p className="text-red-500 font-semibold">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          {isSubmitting ? (
            <Button disabled className="w-96" variant={"default"}>
              <Loader2 className="mr-2 h-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button variant={"secondary"} className="w-96">
              Register
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};
