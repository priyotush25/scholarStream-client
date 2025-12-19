import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const ScholarshipInfo = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistActive, setWishlistActive] = useState(false);
  const [applied, setApplied] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const resScholar = await axios.get(`/scholarships/${id}`);
        setData(resScholar.data);

        const category = resScholar.data.scholarshipCategory;

        // Reviews fetch
        try {
          const resReviews = await axios.get(`/reviews/scholarship/${id}`);
          setReviews(resReviews.data);
        } catch {
          setReviews([]);
        }

        // User specific
        if (user?.email) {
          try {
            const apps = await axios.get(`/applications/user/${user.email}`);
            const existing = apps.data.find((a) => a.scholarshipId === id);
            if (existing) {
              setApplied(true);
              setCurrentApplication(existing);
            }

            const wishlistRes = await axios.get(`/users/wishlist/${user.email}`);
            const inList = wishlistRes.data.some((w) => w._id === id);
            setWishlistActive(inList);
          } catch {}
        }

        // Related
        try {
          const allRes = await axios.get("/scholarships/all");
          const filtered = allRes.data.scholarships
            .filter((s) => s.scholarshipCategory === category && s._id !== id)
            .slice(0, 3);
          setRelated(filtered);
        } catch {
          setRelated([]);
        }

        setLoading(false);
      } catch {
        setData(null);
        setLoading(false);
      }
    };

    loadData();
  }, [id, user?.email]);

  const toggleWishlist = async () => {
    if (!user) {
      alert("Login required to modify wishlist!");
      return;
    }

    try {
      if (wishlistActive) {
        await axios.put("/users/wishlist/remove", { email: user.email, scholarshipId: id });
        setWishlistActive(false);
      } else {
        await axios.put("/users/wishlist/add", { email: user.email, scholarshipId: id });
        setWishlistActive(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!data)
    return (
      <div className="text-center py-20 text-xl font-semibold">Scholarship not available</div>
    );

  const {
    scholarshipName: title,
    universityName,
    universityImage,
    universityCity,
    universityCountry,
    degree,
    subjectCategory,
    applicationFees,
    tuitionFees,
    serviceCharge,
    scholarshipCategory,
    scholarshipPostDate,
    applicationDeadline,
    universityWorldRank,
  } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full lg:w-1/2 h-80 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
          <h2 className="text-xl text-gray-600">
            {universityName} {universityWorldRank && <span className="badge badge-info">#{universityWorldRank}</span>}
          </h2>
          <p><strong>Location:</strong> {universityCity}, {universityCountry}</p>
          <p>
            <strong>Degree:</strong> {degree} | <strong>Subject:</strong> {subjectCategory}
          </p>
          <p><strong>Deadline:</strong> {new Date(applicationDeadline).toLocaleDateString()}</p>

          <div className="flex gap-4 mt-4 items-center">
            <div className="badge badge-lg badge-accent">{scholarshipCategory}</div>
            <div className="font-bold text-lg">App Fee: ${applicationFees}</div>
          </div>

          <div className="flex gap-4 mt-6 items-center">
            {applied ? (
              <div className="flex-1 flex flex-col gap-2">
                <div className="alert alert-info">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">ℹ️</span>
                    <span>You have already applied. Status: {currentApplication?.applicationStatus}</span>
                  </div>
                </div>
                <Link to="/dashboard/my-applications" className="btn btn-outline btn-primary w-full">View Applications</Link>
              </div>
            ) : (
              <Link to={`/checkout/${id}`} className="btn btn-primary flex-grow">Apply Now</Link>
            )}

            <button
              onClick={toggleWishlist}
              className={`btn btn-circle ${wishlistActive ? "btn-error text-white" : "btn-outline btn-error"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={wishlistActive ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Financial & Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg shadow mb-10">
        <div>
          <h3 className="font-bold mb-2">Financial Info</h3>
          <p><strong>Tuition:</strong> ${tuitionFees || "N/A"}</p>
          <p><strong>Service Charge:</strong> ${serviceCharge}</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Important Dates</h3>
          <p><strong>Posted:</strong> {new Date(scholarshipPostDate).toLocaleDateString()}</p>
          <p><strong>Deadline:</strong> {new Date(applicationDeadline).toLocaleDateString()}</p>
        </div>
      </div>

      {/* About */}
      <div className="mb-10">
        <h3 className="font-bold text-2xl mb-3">About This Scholarship</h3>
        <p className="text-gray-700 leading-relaxed">
          This scholarship is for students pursuing {degree} in {subjectCategory}. Details can be enriched with description and requirements.
        </p>
      </div>

      {/* Reviews */}
      <div className="mb-12">
        <h3 className="font-bold text-2xl mb-4">Reviews ({reviews.length})</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">{r.userName.charAt(0)}</div>
                  <div>
                    <div className="font-semibold">{r.userName}</div>
                    <div className="text-xs text-gray-500">{new Date(r.reviewDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className={`text-orange-400 ${idx < r.ratingPoint ? "" : "opacity-30"}`}>★</span>
                  ))}
                </div>
                <p className="italic text-gray-700">"{r.reviewComment}"</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Scholarships */}
      <div className="pt-10 border-t">
        <h3 className="font-bold text-2xl mb-6">You Might Also Like</h3>
        {related.length === 0 ? (
          <p className="text-gray-500">No similar scholarships available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((s) => (
              <div key={s._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img src={s.universityImage} alt={s.universityName} className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" />
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{s.universityName}</h4>
                  <p className="text-sm font-medium truncate">{s.scholarshipName}</p>
                  <p className="text-xs text-gray-500">Subject: {s.subjectCategory}</p>
                  <p className="text-xs text-gray-500">Deadline: {new Date(s.applicationDeadline).toLocaleDateString()}</p>
                  <Link to={`/scholarship/${s._id}`} className="btn btn-sm btn-primary mt-2">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipInfo;
