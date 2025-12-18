import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
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

const UpdateScholarship = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    axios
      .get(`/scholarships/${id}`)
      .then((res) => {
        setScholarship(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Failed to load scholarship");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const updatedScholarship = {
      scholarshipName: form.scholarshipName.value,
      universityName: form.universityName.value,
      universityImage: form.universityImage.value,
      universityCountry: form.universityCountry.value,
      universityCity: form.universityCity.value,
      universityWorldRank: parseInt(form.universityWorldRank.value),
      subjectCategory: form.subjectCategory.value,
      scholarshipCategory: form.scholarshipCategory.value,
      degree: form.degree.value,
      tuitionFees: parseInt(form.tuitionFees.value || 0),
      applicationFees: parseInt(form.applicationFees.value),
      serviceCharge: parseInt(form.serviceCharge.value),
      applicationDeadline: form.applicationDeadline.value,
    };

    try {
      const res = await axios.patch(`/scholarships/${id}`, updatedScholarship);
      alert("Scholarship updated successfully");
      navigate("/dashboard/manage-scholarships");
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      alert(`Failed to update scholarship: ${errorMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!scholarship) return <div>Scholarship not found</div>;

  // Format date for input (YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Update Scholarship</h2>
          <p className="opacity-90">
            Edit scholarship details and requirements
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-8">
          {/* General Information */}
          <section>
            <SectionHeader icon={FaBookOpen} title="Scholarship Information" />
            <div className="grid grid-cols-1 gap-6">
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  Scholarship Name
                </label>
                <input
                  type="text"
                  name="scholarshipName"
                  defaultValue={scholarship.scholarshipName}
                  placeholder="e.g. Global Excellence Scholarship"
                  className="input input-bordered focus:input-primary h-12"
                  required
                />
              </div>
            </div>
          </section>

          {/* University Details */}
          <section>
            <SectionHeader icon={FaUniversity} title="University Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaUniversity className="text-gray-400" /> University Name
                  </span>
                </label>
                <input
                  type="text"
                  name="universityName"
                  defaultValue={scholarship.universityName}
                  placeholder="e.g. Harvard University"
                  className="input input-bordered focus:input-primary h-12"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaImage className="text-gray-400" /> University Image URL
                  </span>
                </label>
                <input
                  type="text"
                  name="universityImage"
                  defaultValue={scholarship.universityImage}
                  placeholder="https://..."
                  className="input input-bordered focus:input-primary h-12"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaGlobe className="text-gray-400" /> Country
                  </span>
                </label>
                <input
                  type="text"
                  name="universityCountry"
                  defaultValue={scholarship.universityCountry}
                  placeholder="e.g. USA"
                  className="input input-bordered focus:input-primary h-12"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" /> City
                  </span>
                </label>
                <input
                  type="text"
                  name="universityCity"
                  defaultValue={scholarship.universityCity}
                  placeholder="e.g. Cambridge"
                  className="input input-bordered focus:input-primary h-12"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaGraduationCap className="text-gray-400" /> World Rank
                  </span>
                </label>
                <input
                  type="number"
                  name="universityWorldRank"
                  defaultValue={scholarship.universityWorldRank}
                  placeholder="e.g. 1"
                  className="input input-bordered focus:input-primary h-12"
                  required
                />
              </div>
            </div>
          </section>

          {/* Academic & Financial */}
          <section>
            <SectionHeader
              icon={FaGraduationCap}
              title="Academic & Financial"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  Subject Category
                </label>
                <select
                  name="subjectCategory"
                  defaultValue={scholarship.subjectCategory}
                  className="select select-bordered focus:select-primary h-12"
                  required
                >
                  <option value="Agriculture">Agriculture</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  Scholarship Category
                </label>
                <select
                  name="scholarshipCategory"
                  defaultValue={scholarship.scholarshipCategory}
                  className="select select-bordered focus:select-primary h-12"
                  required
                >
                  <option value="Full Fund">Full Fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self-fund">Self-fund</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  Degree
                </label>
                <select
                  name="degree"
                  defaultValue={scholarship.degree}
                  className="select select-bordered focus:select-primary h-12"
                  required
                >
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  <span className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-gray-400" /> Tuition Fees
                  </span>
                </label>
                <input
                  type="number"
                  name="tuitionFees"
                  defaultValue={scholarship.tuitionFees}
                  placeholder="Optional"
                  className="input input-bordered focus:input-primary h-12"
                />
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  Application Fees
                </label>
                <input
                  type="number"
                  name="applicationFees"
                  defaultValue={scholarship.applicationFees}
                  placeholder="e.g. 50"
                  className="input input-bordered focus:input-primary h-12"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  Service Charge
                </label>
                <input
                  type="number"
                  name="serviceCharge"
                  defaultValue={scholarship.serviceCharge}
                  placeholder="e.g. 10"
                  className="input input-bordered focus:input-primary h-12"
                  required
                />
              </div>
            </div>
          </section>

          {/* Dates */}
          <section>
            <SectionHeader icon={FaCalendarAlt} title="Deadlines" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-medium text-gray-700">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  defaultValue={formatDate(scholarship.applicationDeadline)}
                  className="input input-bordered focus:input-primary h-12"
                  required
                />
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
              className={`btn btn-primary px-8 ${submitting ? "loading" : ""}`}
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update Scholarship"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateScholarship;
