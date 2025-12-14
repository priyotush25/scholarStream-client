import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
    // এখানে তুমি Firebase Google Auth logic add করবে
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-blue-600">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Join ScholarStream today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your full name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <input
              type="text"
              {...register("photoURL")}
              placeholder="https://"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Create a strong password"
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn btn-primary w-full mt-2">Register</button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Register Button */}
        <button
          onClick={handleGoogleRegister}
          className="btn btn-outline btn-primary w-full"
        >
          Register with Google
        </button>

        {/* Footer text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
