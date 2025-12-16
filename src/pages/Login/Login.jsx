import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { loginHandle, googleLogin } = useAuth();

  const onSubmit = (data) => {
    console.log(data);

    loginHandle(data.email, data.password)
      .then(() => {
        console.log("login successfully");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Login successful");
        navigate("/");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to continue to ScholarStream
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="input input-bordered w-full focus:border-blue-500"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="input input-bordered w-full focus:border-blue-500"
            />
          </div>

          <button className="btn btn-primary w-full mt-2">Login</button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline btn-primary w-full"
        >
          Login with Google
        </button>

        {/* Footer text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
