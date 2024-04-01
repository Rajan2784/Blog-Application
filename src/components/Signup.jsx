import React, { useState } from "react";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import Input from "./Input";
import Button from "./Button";
import Loading from "./Loading";

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setLoading(true);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUserData = await authService.getCurrentUser();
        if (currentUserData) {
          dispatch(login(currentUserData));
          setLoading(false);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`mx-auto w-full max-w-lg dark:bg-zinc-800 bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center relative">
            <span className="inline-block w-full max-w-[100px] dark:text-white">
              LOGO
            </span>
            <span
              onClick={() => navigate("/")}
              className="absolute right-0 text-2xl font-semibold top-[-20px] cursor-pointer text-red-600"
            >
              X
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60 dark:text-white">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-300 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="Full Name: "
                placeholder="Enter your full name "
                {...register("name", {
                  required: true,
                })}
              />

              <Input
                label="Email: "
                placeholder="Enter your email: "
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />

              <Input
                label="Password: (8 characters required)"
                type="password"
                placeholder="Enter your password "
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
