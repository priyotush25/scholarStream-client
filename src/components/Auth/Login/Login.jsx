import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import GLogin from "../SocialLogin/GLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
    const [show,setShow]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn,resetPass } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSignIn = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        toast.success("login successful");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error("login failed");
        console.log(error);
      });
    };
    const handleShow = () => {
        setShow(!show)
    }

    const handleResetPass = async () => {
        const { value: email } = await Swal.fire({
          title: "Input email address",
          input: "email",
          inputLabel: "Your email address",
          inputPlaceholder: "Enter your email address",
        });
        if (email) {
          resetPass(email)
            .then(() => {
              Swal.fire(`Reset link has been sent to: ${email}`);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm my-5 shrink-0 py-5 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome Back</h3>
      <form onSubmit={handleSubmit(handleSignIn)} className="card-body">
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email Required" })}
            className="input"
            placeholder="Email"
          />

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          {/* password */}
          <div className="relative">
            <label className="label">Password</label>
            <input
              type={show? 'text': 'password'}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(.{6,})/,
                  message:
                    "Password must be 6+ characters, include a uppercase,a lowercase, a number and a special character.",
                },
              })}
              className="input"
              placeholder="Password"
                      />
                      <div onClick={handleShow} className="absolute top-8 right-7 hover:cursor-pointer">
                          {
                              show ? <FaEyeSlash/> :<FaEye/>
                          }
                      </div>

            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password Must Be 6 digit</p>
            )}
          </div>

          <div>
            <p onClick={handleResetPass} className="link link-hover">Forgot password?</p>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>
          New Here?{" "}
          <Link
            state={location?.state}
            className="link link-hover"
            to={"/register"}
          >
            Register Now!
          </Link>
        </p>
      </form>
      <GLogin />
    </div>
  );
};

export default Login;
