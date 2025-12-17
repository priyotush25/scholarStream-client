import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";


const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axiosInstance.get("/scholarships");
        setScholarships(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch scholarships.");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {scholarships.map((sch) => (
        <div
          key={sch._id}
          className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
        >
          <img
            src={sch.universityImage}
            alt={sch.universityName}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-xl font-bold mt-2">{sch.scholarshipName}</h2>
          <p className="text-gray-600">{sch.universityName} - {sch.universityCity}</p>
          <p className="text-sm mt-1">{sch.scholarshipCategory} | {sch.degree}</p>
          <p className="text-sm mt-1">Application Fee: ${sch.applicationFees}</p>
          <button className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllScholarships;
