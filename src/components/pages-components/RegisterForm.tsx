import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
useNavigate;

interface formFields {
  username: string;
  email: string;
  password: string;
}
export const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<formFields>();

  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameAvailable(false)
    // grab the username
    const username = e.target.value;
    console.log(username);
    // set username to react hook form register
    setValue("username", username);
    // check the length
    if (username.length < 4) {
      setError("username", {
        message: "Should be minimum 4 character long.",
      });
      return;
    } else {
      // clear the error if > 4
      clearErrors("username");
    }
    // send api req
    try {
      console.log("hitting");
      const apiReq = await fetch(
        "http://localhost:3333/api/v1/checkusernameUnique",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
          credentials: "include",
        }
      );
      const apiRes = await apiReq.json();
      if (apiRes.success === false) {
        setError("username", {message: "Username is not available"})
      }
      setUsernameAvailable(true)
      console.log(apiRes);
    } catch (error) {
      console.log(error);
    }
  };


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
        navigate("/verify-otp");
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
          <label className="flex">Username</label>
          <Input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: { value: true, message: "Username id is required" },
              minLength: {
                value: 4,
                message: "Username should be 4 minimun characters.",
              },
            })}
            className="w-96 focus:bg-zinc-950  focus:border-none transition-all"
            onChange={handleUsernameChange}
          />
          {errors.username && (
            <p className="text-red-500 font-semibold">
              {errors.username.message}
            </p>
          )}
          {usernameAvailable && (
            <p className="text-green-600 text-sm font-semibold">Username available!!</p>
          )}
        </div>
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
