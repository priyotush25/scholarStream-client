import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  const fetchScholarships = () => {
    axios
      .get("/scholarships/all?limit=1000") // Set high limit for admin view
      .then((res) => setScholarships(res.data.scholarships))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this scholarship?")) {
      axios
        .delete(`/scholarships/${id}`)
        .then((res) => {
          if (res.data._id || res.data) {
            alert("Deleted successfully");
            fetchScholarships();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6">Manage Scholarships</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Scholarship Name</th>
              <th>University</th>
              <th>Subject</th>
              <th>Degree</th>
              <th>App Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.scholarshipName}</td>
                <td>{item.universityName}</td>
                <td>{item.subjectCategory}</td>
                <td>{item.degree}</td>
                <td>${item.applicationFees}</td>
                <td className="flex gap-2">
                  <Link
                    to={`/dashboard/update-scholarship/${item._id}`}
                    className="btn btn-xs btn-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
