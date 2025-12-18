/**
 * All Scholarships Page
 *
 * Displays paginated list of scholarships with search, filter, and sort capabilities.
 * Fetches data from backend API with query parameters for dynamic filtering.
 *
 * @component
 */

import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import ScholarshipCard from "../components/common/ScholarshipCard";
import CardSkeleton from "../components/common/CardSkeleton";
import {
  FaSearch,
  FaFolder,
  FaGlobe,
  FaChartBar,
  FaFilter,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const AllScholarships = () => {
  const { user } = useContext(AuthContext);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userApplications, setUserApplications] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const limit = 6; // Items per page

  /**
   * Fetch scholarships whenever search, filter, sort, or page changes
   * Sends query parameters to backend for server-side filtering
   */
  useEffect(() => {
    setLoading(true);
    const params = {
      search,
      category: filterCategory,
      country: filterCountry,
      page,
      limit,
    };

    // Map sort values to server-expected parameters
    if (sort === "asc" || sort === "desc") {
      params.sortFees = sort;
    } else if (sort === "date") {
      params.sortDate = "newest";
    }

    axios
      .get("/scholarships/all", { params })
      .then((res) => {
        setScholarships(res.data.scholarships);
        setTotalPages(Math.ceil(res.data.totalScholarships / limit));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [search, filterCategory, filterCountry, sort, page]);

  // Fetch user's applications to check which scholarships they've applied to
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/applications/user/${user.email}`)
        .then((res) => setUserApplications(res.data))
        .catch((err) => console.error("Error fetching applications:", err));
    }
  }, [user?.email]);

  // Fetch all reviews to display on cards
 useEffect(() => {
  axios
    .get("/reviews/all") // API endpoint যেখানে reviews fetch হবে
    .then((res) => setAllReviews(res.data))
    .catch((err) => console.error("Error fetching reviews:", err));
}, []);

  /**
   * Handle search input change
   * Resets to page 1 when search term changes
   */
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  /**
   * Handle filter category change
   * Resets to page 1 when filter changes
   */
  const handleFilter = (e) => {
    setFilterCategory(e.target.value);
    setPage(1);
  };

  /**
   * Handle filter country change
   * Resets to page 1 when filter changes
   */
  const handleCountryFilter = (e) => {
    setFilterCountry(e.target.value);
    setPage(1);
  };

  /**
   * Handle sort option change
   * Resets to page 1 when sort changes
   */
  const handleSort = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Explore Scholarships
        </h1>
        <p className="text-lg text-gray-600">
          Find the perfect scholarship opportunity for your academic journey
        </p>
      </div>

      {/* Search, Filter, and Sort Controls */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaSearch /> Search
              </span>
            </label>
            <input
              type="text"
              placeholder="Search by name, university, or degree..."
              className="input input-bordered w-full"
              value={search}
              onChange={handleSearch}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaFolder /> Category
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filterCategory}
              onChange={handleFilter}
            >
              <option value="">All Categories</option>
              <option value="Full Fund">Full Fund</option>
              <option value="Partial">Partial</option>
              <option value="Self-fund">Self-fund</option>
            </select>
          </div>

          {/* Country Filter */}
          <div>
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaGlobe /> Country
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filterCountry}
              onChange={handleCountryFilter}
            >
              <option value="">All Countries</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
            </select>
          </div>

          {/* Sort Dropdown - Full Width on New Row */}
          <div className="lg:col-span-4">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaChartBar /> Sort By
              </span>
            </label>
            <select
              className="select select-bordered w-full md:w-64"
              value={sort}
              onChange={handleSort}
            >
              <option value="">Default Order</option>
              <option value="asc">Fees: Low to High</option>
              <option value="desc">Fees: High to Low</option>
              <option value="date">Newest First</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(search || filterCategory || filterCountry || sort) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {search && (
                <span className="badge badge-primary badge-lg">
                  Search: "{search}"
                </span>
              )}
              {filterCategory && (
                <span className="badge badge-secondary badge-lg">
                  Category: {filterCategory}
                </span>
              )}
              {filterCountry && (
                <span className="badge badge-accent badge-lg">
                  Country: {filterCountry}
                </span>
              )}
              {sort && (
                <span className="badge badge-info badge-lg">
                  Sort:{" "}
                  {sort === "asc"
                    ? "Low to High"
                    : sort === "desc"
                    ? "High to Low"
                    : "Newest"}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Scholarship Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : scholarships.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((scholarship) => {
              const hasApplied = userApplications.some(
                (app) => app.scholarshipId === scholarship._id
              );
              // Filter reviews for this scholarship
              const scholarshipReviews = allReviews.filter(
                (review) => review.scholarshipId === scholarship._id
              );
              return (
                <ScholarshipCard
                  key={scholarship._id}
                  scholarship={scholarship}
                  hasApplied={hasApplied}
                  reviews={scholarshipReviews}
                />
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="text-sm text-gray-600">
              Showing page{" "}
              <span className="font-bold text-gray-800">{page}</span> of{" "}
              <span className="font-bold text-gray-800">{totalPages}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                ← Previous
              </button>
              <div className="flex items-center px-4 bg-gray-100 rounded-lg">
                <span className="font-semibold text-gray-700">
                  {page} / {totalPages}
                </span>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-md p-16 text-center">
          <div className="text-7xl mb-6 text-purple-500">
            <FaSearch className="mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No Scholarships Found
          </h3>
          <p className="text-gray-600 text-lg mb-6">
            Try adjusting your filters or search terms to find more
            opportunities
          </p>
          <button
            onClick={() => {
              setSearch("");
              setFilterCategory("");
              setFilterCountry("");
              setSort("");
              setPage(1);
            }}
            className="btn btn-primary btn-lg"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
