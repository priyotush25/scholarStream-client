import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const FormDivWrapper = ({ children, className = "" }) => {
    const baseClasses = "form-control flex flex-col";
    return <div className={`${baseClasses} ${className}`}>{children}</div>;
};
const AddScholarship = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const scholarshipData = {
            ...data,
            applicationFees: parseFloat(data.applicationFees),
            serviceCharge: parseFloat(data.serviceCharge),
            tuitionFees: data.tuitionFees ? parseFloat(data.tuitionFees) : 0,
            worldRank: parseInt(data.worldRank),
            scholarshipPostDate: new Date(),
            senderEmail: user.email,
            senderName: user.displayName,
            senderImage: user.photoURL
        };
        console.log(scholarshipData);


        axiosSecure.post('/scholarships', scholarshipData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire("Success", "Scholarship added successfully!", "success");
                    reset();
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire("Error", "Failed to add scholarship.", "error");
            });
    };



    return (
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-8 justify-center">
            Add New Scholarship
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Scholarship Name */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">Scholarship Name</span>
              </label>
              <input
                type="text"
                {...register("scholarshipName", { required: true })}
                className="input input-bordered w-full"
                placeholder="e.g. Fullbright Scholarship"
              />
              {errors.scholarshipName && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* University Name */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">University Name</span>
              </label>
              <input
                type="text"
                {...register("universityName", { required: true })}
                className="input input-bordered w-full"
                placeholder="e.g. Harvard University"
              />
              {errors.universityName && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* University Image */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">University Image URL</span>
              </label>
              <input
                type="url"
                {...register("universityImage", { required: true })}
                className="input input-bordered w-full"
                placeholder="https://..."
              />
              {errors.universityImage && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* University Country */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">University Country</span>
              </label>
              <input
                type="text"
                {...register("universityCountry", { required: true })}
                className="input input-bordered w-full"
                placeholder="e.g. USA"
              />
              {errors.universityCountry && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* University City */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">University City</span>
              </label>
              <input
                type="text"
                {...register("universityCity", { required: true })}
                className="input input-bordered w-full"
                placeholder="e.g. Cambridge"
              />
              {errors.universityCity && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* World Rank */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">World Rank</span>
              </label>
              <input
                type="number"
                {...register("worldRank", { required: true })}
                className="input input-bordered w-full"
                placeholder="e.g. 1"
              />
              {errors.worldRank && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* Subject Category */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">Subject Category</span>
              </label>
              <select
                {...register("subjectCategory", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Category</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
                <option value="Arts">Arts</option>
                <option value="Business">Business</option>
                <option value="Science">Science</option>
              </select>
              {errors.subjectCategory && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* Scholarship Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Scholarship Category</span>
              </label>
              <select
                {...register("scholarshipCategory", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Category</option>
                <option value="Full Fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self Fund">Self Fund</option>
              </select>
              {errors.scholarshipCategory && (
                <span className="text-error text-sm">Required</span>
              )}
            </div>

            {/* Degree */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Degree</span>
              </label>
              <select
                {...register("degree", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
              {errors.degree && (
                <span className="text-error text-sm">Required</span>
              )}
            </div>

            {/* Tuition Fees */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">Tuition Fees (Optional)</span>
              </label>
              <input
                type="number"
                {...register("tuitionFees")}
                className="input input-bordered w-full"
                placeholder="e.g. 50000"
              />
            </FormDivWrapper>

            {/* Application Fees */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">Application Fees ($)</span>
              </label>
              <input
                type="number"
                {...register("applicationFees", { required: true })}
                className="input input-bordered w-full"
                placeholder="e.g. 50"
              />
              {errors.applicationFees && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* Service Charge */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">Service Charge ($)</span>
              </label>
              <input
                type="number"
                {...register("serviceCharge", { required: true })}
                className="input input-bordered w-full"
                placeholder="e.g. 10"
              />
              {errors.serviceCharge && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* Deadline */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">Application Deadline</span>
              </label>
              <input
                type="date"
                {...register("applicationDeadline", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.applicationDeadline && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* Description */}
            <FormDivWrapper>
              <label className="label">
                <span className="label-text">Scholarship Description</span>
              </label>
              <textarea
                {...register("scholarshipDescription", { required: true })}
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Scholarship details..."
              ></textarea>
              {errors.scholarshipDescription && (
                <span className="text-error text-sm">Required</span>
              )}
            </FormDivWrapper>

            {/* Submit */}
            <div className="form-control flex justify-center mt-6 col-span-1 md:col-span-2">
              <button type="submit" className="btn btn-primary">
                Add Scholarship
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default AddScholarship;
