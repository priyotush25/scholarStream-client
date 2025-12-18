import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SimpleBanner = () => {
  return (
    <section className="relative bg-linear-to-r from-blue-700 to-purple-700 text-white min-h-[400px] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center my-20 space-y-6">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
        >
          <p>Find the Perfect</p>
      
          <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-red-400">
            Scholarship
          </span>
          for Your Future
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
        >
          Discover opportunities worldwide. Connect with scholarships that match
          your academic profile.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/scholarships"
            className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:bg-yellow-500 transition"
          >
            Find Scholarships
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/30 transition"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleBanner;
