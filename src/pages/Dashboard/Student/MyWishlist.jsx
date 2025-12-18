import React, { useEffect, useState, useContext } from "react";
import axios from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";
import ScholarshipCard from "../../../components/common/ScholarshipCard";
import { FaTrash, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = () => {
    setLoading(true);
    axios
      .get(`/users/wishlist/${user.email}`)
      .then((res) => {
        setWishlist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const removeFromWishlist = async (id) => {
    try {
      await axios.put("/users/wishlist/remove", {
        email: user.email,
        scholarshipId: id,
      });
      // Optimistic update or refetch
      setWishlist((prev) => prev.filter((item) => item._id !== id));
      // Optionally show toast
    } catch (err) {
      console.error("Failed to remove from wishlist", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">My Wishlist 💖</h2>
      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-lg">
          <p className="text-xl text-gray-500 mb-4">
            Your wishlist is empty. Start exploring!
          </p>
          <Link to="/scholarships" className="btn btn-primary">
            Browse Scholarships
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((scholarship) => (
            <div key={scholarship._id} className="relative group">
              <ScholarshipCard scholarship={scholarship} />
              <button
                onClick={() => removeFromWishlist(scholarship._id)}
                className="absolute top-4 right-4 btn btn-circle btn-error btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove from Wishlist"
              >
                <FaTrash className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
