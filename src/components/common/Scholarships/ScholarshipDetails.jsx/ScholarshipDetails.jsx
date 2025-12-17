import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../Loader/Loader";
import dayjs from "dayjs";
import useAuth from "../../../../hooks/useAuth";
import { PiNoteThin } from "react-icons/pi";
import Swal from "sweetalert2";
import { PiStarFill } from 'react-icons/pi';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth()
  // const navigate = useNavigate()


  const { data: scholarship = [], isLoading } = useQuery({
    queryKey: ["scholarship-details"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });



  const {
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    scholarshipCategory,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    scholarshipPostDate,
    subjectCategory,
    appliedScholarshipNumber,
    scholarshipDescription,
    degree,
    tuitionFees,
    stipend,
    postGraduationWorkPermit,
  } = scholarship;

  const { data: hasApplied, refetch } = useQuery({
    queryKey: ['user-applied', id, user?.email],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const appliedRes = await axiosSecure.get(`/applied-scholarships/${user?.email}`);
      return appliedRes.data.some(application => application.scholarshipId === id);
    }
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/scholarship/${id}`);
      return res.data;
    }
  });

  console.log(reviews);

  if (isLoading) {
    return <Loader />;
  }


  const handlePayment = async () => {
    const applicationData = {
      scholarshipId: id,
      userName: user.displayName,
      userEmail: user.email,
      universityName: universityName,
      universityCountry: universityCountry,
      scholarshipCategory: scholarshipCategory,
      degree: degree,
      applicationFees: applicationFees + serviceCharge,
      applicationStatus: "pending",
      paymentStatus: "unpaid",
    };
    Swal.fire({
      title: `Apply to ${universityName}`,
      text: `Are You sure want to apply here! Total Cost $${applicationFees + serviceCharge
        }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/apply-scholarships", applicationData)
          .then(async (res) => {
            if (res.data.insertedId) {
              refetch();
              const paymentInfo = {
                charge: applicationFees + serviceCharge,
                universityName: universityName,
                studentEmail: user.email,
                scholarshipId: id,
                applicationId: res.data.insertedId,
              };
              const paymentRes = await axiosSecure.post(
                "/scholarship-payment-checkout",
                paymentInfo
              );
              window.location.assign(paymentRes.data.url);
            }
          });
      }
    });
  }


  const formatFees = (fee) => {
    if (fee === undefined || fee === null) return "N/A";
    return fee === 0 ? "Free" : `$${fee.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    // if (!dateString) return "Not specified";
    return dayjs(dateString).format("DD MMMM YYYY")
  };




  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/all-scholarships" className="btn btn-ghost btn-sm gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Scholarships
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  {/* University Logo */}
                  <div className="avatar">
                    <div className="w-20 h-20 rounded-lg ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          universityImage || "https://via.placeholder.com/150"
                        }
                        alt={universityName}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Title and University Info */}
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                      {scholarshipName}
                    </h1>
                    <div className="flex flex-wrap gap-2 items-center text-base-content/70">
                      <div className="badge badge-primary badge-lg">
                        {universityName}
                      </div>
                      {universityCountry && (
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{universityCountry}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="stat bg-base-300 rounded-lg p-4">
                    <div className="stat-title text-xs">Application Fee</div>
                    <div className="stat-value text-lg gradient-text">
                      {formatFees(applicationFees)}
                    </div>
                  </div>
                  <div className="stat bg-base-300 rounded-lg p-4">
                    <div className="stat-title text-xs">Service Charge</div>
                    <div className="stat-value text-lg gradient-text">
                      {formatFees(serviceCharge)}
                    </div>
                  </div>
                  <div className="stat bg-base-300 rounded-lg p-4">
                    <div className="stat-title text-xs">Applicants</div>
                    <div className="stat-value text-lg">
                      {appliedScholarshipNumber || 0}
                    </div>
                  </div>
                  <div className="stat bg-base-300 rounded-lg p-4">
                    <div className="stat-title text-xs">Degree</div>
                    <div className="stat-value text-lg">{degree || "N/A"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  About This Scholarship
                </h2>
                <p className="text-base-content/80 leading-relaxed whitespace-pre-line">
                  {scholarshipDescription || "No description available."}
                </p>
              </div>
            </div>

            {/* Financial Details */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Financial Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-base-300 rounded-lg">
                    <div className="text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">
                        Tuition Fees
                      </p>
                      <p className="text-lg font-bold">
                        {formatFees(tuitionFees || 0)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-base-300 rounded-lg">
                    <div className="text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">Stipend</p>
                      <p className="text-lg font-bold">
                        {stipend || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Reviews Section */}
            <div className="card bg-base-200 shadow-xl mt-6">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">Student Reviews ({reviews.length})</h2>
                {reviews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviews.map((review) => (
                      <div key={review._id} className="card bg-base-100 p-4 shadow-sm border border-base-300">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={review.userImage} alt={review.userName} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <h4 className="font-bold text-sm">{review.userName}</h4>
                            <p className="text-xs opacity-60">{dayjs(review.createdAt).format('DD MMM YYYY')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <PiStarFill key={i} className={`text-sm ${i < review.ratingPoint ? 'text-yellow-500' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-sm opacity-80 line-clamp-4">"{review.reviewComment}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="opacity-60 italic">No reviews yet for this scholarship.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Application Info Card */}
            <div className="card bg-base-200 shadow-xl sticky top-4">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Application Details</h3>

                <div className="space-y-4">
                  {/* Deadline */}
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-error mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-base-content/60">Deadline</p>
                      <p className="font-semibold">
                        {formatDate(applicationDeadline)}
                      </p>
                    </div>
                  </div>

                  {/* Posted Date */}
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-base-content/60">Posted</p>
                      <p className="font-semibold">
                        {formatDate(scholarshipPostDate)}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-base-content/60">Category</p>
                      <p className="font-semibold">{scholarshipCategory}</p>
                    </div>
                  </div>

                  {/* Subject */}
                  {subjectCategory && (
                    <div className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <div>
                        <p className="text-sm text-base-content/60">Subject</p>
                        <p className="font-semibold">{subjectCategory}</p>
                      </div>
                    </div>
                  )}

                  {/* Work Permit */}
                  {postGraduationWorkPermit && (
                    <div className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-success mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm text-base-content/60">
                          Work Permit
                        </p>
                        <p className="font-semibold">
                          {postGraduationWorkPermit}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="divider"></div>

                {/* Apply Button */}
                {hasApplied ? (
                  <button
                    className="btn py-7 flex flex-col text-white btn-block btn-lg"
                    disabled
                  >
                    <span className="text-md">Already applied</span>
                    <span className="text-xs">
                      visit dashboard for more info
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => handlePayment()}
                    className="btn btn-primary btn-block btn-lg"
                  >
                    <PiNoteThin />
                    Apply Now
                  </button>
                )}

                <p className="text-xs text-center text-base-content/60 mt-2">
                  {appliedScholarshipNumber || 0} students have applied
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
