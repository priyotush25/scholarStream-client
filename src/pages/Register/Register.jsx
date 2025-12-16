import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { registerHandle } = useAuth();
  const navigate = useNavigate();

  // password show / hide state (default: hidden)
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    registerHandle(data.email, data.password)
      .then((res) => {
        return updateProfile(res.user, {
          displayName: data.name,
          photoURL: data.photoURL,
        });
      })
      .then(() => {
        toast.success("Registration successful");
        navigate("/");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
    // Firebase Google Auth logic add করবে
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join ScholarStream today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your full name"
              autoComplete="name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <input
              type="url"
              {...register("photoURL")}
              placeholder="https://"
              className="input input-bordered w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              autoComplete="email"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password with Icon */}
          <div className="relative">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Create a strong password"
              autoComplete="new-password"
              className="input input-bordered w-full pr-12"
              required
              minLength={6}
            />

            {/* Eye Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 cursor-pointer text-gray-500 hover:text-blue-600"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          {/* Register Button */}
          <button className="btn btn-primary w-full mt-2">
            Register
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Register */}
        <button
          onClick={handleGoogleRegister}
          className="btn btn-outline btn-primary w-full"
        >
          Register with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
