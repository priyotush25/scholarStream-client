import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
      
      {/* Decorative Blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/3 -right-24 w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-20"></div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative container mx-auto px-4 min-h-[420px] md:min-h-[520px] flex items-center">
        <div className="text-center w-full py-24 md:py-32 space-y-8">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-extrabold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Unlock{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">
                Opportunities
              </span>
              <span className="absolute left-0 -bottom-2 w-full h-1 bg-gradient-to-r from-yellow-300 to-pink-400 rounded-full"></span>
            </span>
            <br className="hidden sm:block" />
            Shape Your Future
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-200"
          >
            Discover verified scholarship opportunities worldwide and connect
            with funding that matches your academic goals.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/scholarships"
              className="px-8 py-4 rounded-full font-semibold
                bg-gradient-to-r from-yellow-400 to-orange-400
                text-gray-900 shadow-lg hover:shadow-2xl
                hover:scale-105 transition-all"
            >
              Find Scholarships
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 rounded-full font-semibold
                bg-white/20 backdrop-blur-md border border-white/30
                hover:bg-white/30 transition-all"
            >
              Learn More
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
