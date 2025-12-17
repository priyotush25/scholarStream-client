import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import GLogin from "../SocialLogin/GLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Register = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { register: registerUser, updateUser, resetPass } = useAuth();
  const handleRegister = (data) => {
    const profileImage = data.photo[0];
    registerUser(data.email, data.password).then(() => {
      /// store the img
      const fromData = new FormData();
      fromData.append("image", profileImage);

      const imageAPI = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host
      }`;

      axios.post(imageAPI, fromData).then((res) => {
        const photoURL = res.data.data.display_url;

        //create user in db
        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success("Successfully Registered");
          }
        });

        ///update user
        const userProfile = {
          displayName: data.name,
          photoURL: photoURL,
        };
        updateUser(userProfile)
          .then(() => {
            navigate(location?.state || "/");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  };
  const handleShow = () => {
    setShow(!show);
  };

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
    <div className="card mt-5 py-5 bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome To ScholarStream</h3>
      <form onSubmit={handleSubmit(handleRegister)} className="card-body">
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          {/* photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: "Your Photo is Required" })}
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.photo && (
            <p className="text-red-500">{errors.photo.message}</p>
          )}

          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email required" })}
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
              type={show ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(.{6,})/,
                  message:
                    "Password must be 6+ characters, include a uppercase,a lowercase, a number and a special character.",
                },
              })}
              className="input"
              placeholder="Password"
            />
            <div
              onClick={handleShow}
              className="absolute top-8 right-7 hover:cursor-pointer"
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </div>

            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <p onClick={handleResetPass} className="link link-hover">
              Forgot password?
            </p>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Have an account?{" "}
          <Link
            state={location.state}
            className="link link-hover"
            to={"/login"}
          >
            Login Now!
          </Link>
        </p>
      </form>
      <GLogin />
    </div>
  );
};

export default Register;
