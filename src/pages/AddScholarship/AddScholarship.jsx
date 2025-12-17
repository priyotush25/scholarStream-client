import React from 'react';
import { useForm } from "react-hook-form";
import axiosInstance from '../../api/axiosInstance';


const AddScholarship = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Convert number fields
      data.tuitionFees = data.tuitionFees ? Number(data.tuitionFees) : 0;
      data.applicationFees = Number(data.applicationFees);
      data.serviceCharge = Number(data.serviceCharge);
      data.universityWorldRank = Number(data.universityWorldRank);

      // Axios instance দিয়ে POST request
      const response = await axiosInstance.post("/scholarships", data);

      if (response.status === 201) {
        alert("Scholarship Added Successfully!");
        reset(); // Reset form
      }
    } catch (err) {
      console.error("Error adding scholarship:", err);
      alert("Failed to add scholarship.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Scholarship</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Scholarship Name */}
        <div>
          <label>Scholarship Name</label>
          <input
            {...register("scholarshipName", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter Scholarship Name"
          />
          {errors.scholarshipName && <p className="text-red-500">This field is required</p>}
        </div>

        {/* University Name */}
        <div>
          <label>University Name</label>
          <input
            {...register("universityName", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter University Name"
          />
          {errors.universityName && <p className="text-red-500">This field is required</p>}
        </div>

        {/* University Image */}
        <div>
          <label>University Image URL</label>
          <input
            {...register("universityImage", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter Image URL"
          />
          {errors.universityImage && <p className="text-red-500">This field is required</p>}
        </div>

        {/* Country & City */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label>Country</label>
            <input
              {...register("universityCountry", { required: true })}
              className="w-full border p-2 rounded"
              placeholder="Enter Country"
            />
            {errors.universityCountry && <p className="text-red-500">This field is required</p>}
          </div>
          <div className="flex-1">
            <label>City</label>
            <input
              {...register("universityCity", { required: true })}
              className="w-full border p-2 rounded"
              placeholder="Enter City"
            />
            {errors.universityCity && <p className="text-red-500">This field is required</p>}
          </div>
        </div>

        {/* Remaining Fields */}
        {/* World Rank, Subject Category, Scholarship Category, Degree, Tuition, Application Fees, Service Charge, Dates, Posted Email */}
        {/* একইভাবে register + validation add করতে হবে */}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
