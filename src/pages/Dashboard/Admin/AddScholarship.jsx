import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaGlobe,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBookOpen,
  FaImage,
} from "react-icons/fa";
import { toast } from "react-toastify";

const AddScholarship = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const scholarship = {
      ...data,
      universityWorldRank: parseInt(data.universityWorldRank),
      tuitionFees: parseInt(data.tuitionFees || 0),
      applicationFees: parseInt(data.applicationFees),
      serviceCharge: parseInt(data.serviceCharge),
      postedUserEmail: user.email,
      scholarshipPostDate: new Date(),
    };

    try {
      await axios.post("/scholarships", scholarship);
      toast.success("Scholarship added successfully")
      navigate("/dashboard/manage-scholarships");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;

         toast.success(`Failed to add scholarship: ${errorMsg}`)

    } finally {
      setLoading(false);
    }
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 text-gray-700">
      <Icon className="text-blue-600" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">


        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Create New Scholarship</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 lg:p-8 space-y-8">
          {/* Scholarship Information */}
          <section>
            <SectionHeader icon={FaBookOpen} title="Scholarship Information" />
            <div className="grid grid-cols-1 gap-6">
              <div className="form-control">
                <label className="label font-medium text-gray-700 mr-2">
                  Scholarship Name
                </label>
                <input
                  type="text"
                  {...register("scholarshipName", { required: "Scholarship name is required" })}
                  placeholder="e.g. Global Excellence Scholarship"
                  className={`input input-bordered focus:input-primary h-12 ${
                    errors.scholarshipName ? "border-red-500" : ""
                  }`}
                />
                {errors.scholarshipName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.scholarshipName.message}
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* University Details */}
          <section>
            <SectionHeader icon={FaUniversity} title="University Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-medium text-gray-700 flex items-center gap-2">
                  <FaUniversity className="text-gray-400" /> University Name
                </label>
                <input
                  type="text"
                  {...register("universityName", { required: "University name is required" })}
                  placeholder="e.g. Harvard University"
                  className={`input input-bordered focus:input-primary h-12 ${
                    errors.universityName ? "border-red-500" : ""
                  }`}
                />
                {errors.universityName && (
                  <span className="text-red-500 text-sm mt-1">{errors.universityName.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700 flex items-center gap-2">
                  <FaImage className="text-gray-400" /> University Image URL
                </label>
                <input
                  type="url"
                  {...register("universityImage", { required: "Image URL is required" })}
                  placeholder="https://..."
                  className={`input input-bordered focus:input-primary h-12 ${
                    errors.universityImage ? "border-red-500" : ""
                  }`}
                />
                {errors.universityImage && (
                  <span className="text-red-500 text-sm mt-1">{errors.universityImage.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700 flex items-center gap-2">
                  <FaGlobe className="text-gray-400" /> Country
                </label>
                <input
                  type="text"
                  {...register("universityCountry", { required: "Country is required" })}
                  placeholder="e.g. USA"
                  className={`input input-bordered focus:input-primary h-12 ${
                    errors.universityCountry ? "border-red-500" : ""
                  }`}
                />
                {errors.universityCountry && (
                  <span className="text-red-500 text-sm mt-1">{errors.universityCountry.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" /> City
                </label>
                <input
                  type="text"
                  {...register("universityCity", { required: "City is required" })}
                  placeholder="e.g. Cambridge"
                  className={`input input-bordered focus:input-primary h-12 ${
                    errors.universityCity ? "border-red-500" : ""
                  }`}
                />
                {errors.universityCity && (
                  <span className="text-red-500 text-sm mt-1">{errors.universityCity.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700 flex items-center gap-2">
                  <FaGraduationCap className="text-gray-400" /> World Rank
                </label>
                <input
                  type="number"
                  {...register("universityWorldRank", { required: "World rank is required" })}
                  placeholder="e.g. 1"
                  className={`input input-bordered focus:input-primary h-12 ${
                    errors.universityWorldRank ? "border-red-500" : ""
                  }`}
                />
                {errors.universityWorldRank && (
                  <span className="text-red-500 text-sm mt-1">{errors.universityWorldRank.message}</span>
                )}
              </div>
            </div>
          </section>

          {/* Academic & Financial */}
          <section>
            <SectionHeader icon={FaGraduationCap} title="Academic & Financial" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label font-medium text-gray-700">Subject Category</label>
                <select
                  {...register("subjectCategory", { required: "Select a subject" })}
                  className="select select-bordered focus:select-primary h-12"
                >
                  <option value="">Select Subject</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Doctor">Doctor</option>
                </select>
                {errors.subjectCategory && (
                  <span className="text-red-500 text-sm mt-1">{errors.subjectCategory.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">Scholarship Category</label>
                <select
                  {...register("scholarshipCategory", { required: "Select a category" })}
                  className="select select-bordered focus:select-primary h-12"
                >
                  <option value="">Select Category</option>
                  <option value="Full Fund">Full Fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self-fund">Self-fund</option>
                </select>
                {errors.scholarshipCategory && (
                  <span className="text-red-500 text-sm mt-1">{errors.scholarshipCategory.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">Degree</label>
                <select
                  {...register("degree", { required: "Select a degree" })}
                  className="select select-bordered focus:select-primary h-12"
                >
                  <option value="">Select Degree</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
                {errors.degree && (
                  <span className="text-red-500 text-sm mt-1">{errors.degree.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="form-control">
                <label className="label font-medium text-gray-700 flex items-center gap-2">
                  <FaMoneyBillWave className="text-gray-400" /> Tuition Fees
                </label>
                <input
                  type="number"
                  {...register("tuitionFees")}
                  placeholder="Optional"
                  className="input input-bordered focus:input-primary h-12"
                />
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">Application Fees</label>
                <input
                  type="number"
                  {...register("applicationFees", { required: "Application fee is required" })}
                  placeholder="e.g. 50"
                  className={`input input-bordered focus:input-primary h-12 ${
                    errors.applicationFees ? "border-red-500" : ""
                  }`}
                />
                {errors.applicationFees && (
                  <span className="text-red-500 text-sm mt-1">{errors.applicationFees.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">Service Charge</label>
                <input
                  type="number"
                  {...register("serviceCharge", { required: "Service charge is required" })}
                  placeholder="e.g. 10"
                  className={`input input-bordered focus:input-primary h-12 ${
                    errors.serviceCharge ? "border-red-500" : ""
                  }`}
                />
                {errors.serviceCharge && (
                  <span className="text-red-500 text-sm mt-1">{errors.serviceCharge.message}</span>
                )}
              </div>
            </div>
          </section>

          {/* Deadlines */}
          <section>
            <SectionHeader icon={FaCalendarAlt} title="Deadlines" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-medium text-gray-700">Application Deadline</label>
                <input
                  type="date"
                  {...register("applicationDeadline", { required: "Deadline is required" })}
                  className={`input input-bordered focus:input-primary h-12 ${
                    errors.applicationDeadline ? "border-red-500" : ""
                  }`}
                />
                {errors.applicationDeadline && (
                  <span className="text-red-500 text-sm mt-1">{errors.applicationDeadline.message}</span>
                )}
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate("/dashboard/manage-scholarships")}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary px-8 ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Publishing..." : "Add Scholarship"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
