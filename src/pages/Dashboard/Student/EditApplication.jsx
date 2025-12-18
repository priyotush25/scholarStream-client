import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const EditApplication = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the application to edit
    axios
      .get(`/applications/${id}`)
      .then((res) => {
        const app = res.data;
        // Verify the application belongs to the current user and is pending
        if (app.userEmail !== user.email) {
          alert("You can only edit your own applications");
          navigate("/dashboard/my-applications");
          return;
        }
        if (app.applicationStatus !== "pending") {
          alert("You can only edit pending applications");
          navigate("/dashboard/my-applications");
          return;
        }
        setApplication(app);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load application");
        navigate("/dashboard/my-applications");
      });
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedApplication = {
      userName: form.userName.value,
      // You can add more editable fields here if needed
    };

    try {
      await axios.patch(`/applications/${id}`, updatedApplication);
      alert("Application updated successfully");
      navigate("/dashboard/my-applications");
    } catch (error) {
      console.error(error);
      alert("Failed to update application");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!application) return <div>Application not found</div>;

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6">Edit Application</h2>

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl">
        {/* Application Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-lg mb-2">
            {application.scholarshipName}
          </h3>
          <p className="text-sm text-gray-600">{application.universityName}</p>
          <div className="mt-2 flex gap-2">
            <span className="badge badge-info">{application.degree}</span>
            <span className="badge badge-secondary">
              {application.subjectCategory}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="userName"
              defaultValue={application.userName}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email (Cannot be changed)</span>
            </label>
            <input
              type="email"
              defaultValue={application.userEmail}
              className="input input-bordered"
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">University</span>
            </label>
            <input
              type="text"
              defaultValue={application.universityName}
              className="input input-bordered"
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Application Fees</span>
            </label>
            <input
              type="text"
              defaultValue={`$${application.applicationFees}`}
              className="input input-bordered"
              disabled
            />
          </div>

          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-sm">
              Only your name can be edited at this time. Other details are
              locked after submission.
            </span>
          </div>

          <div className="flex gap-4 mt-6">
            <button type="submit" className="btn btn-primary flex-1">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-applications")}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplication;
