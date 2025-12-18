import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Make sure framer-motion is installed
import {
  FaSearch,
  FaArrowRight,
  FaUserGraduate,
  FaUniversity,
} from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-hidden min-h-[600px] flex items-center">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-sm font-semibold tracking-wide text-blue-200 uppercase">
                🚀 Unlock Your Potential
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Find the Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Scholarship
              </span>{" "}
              for Your Future
            </h1>

            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover thousands of opportunities tailored to your academic
              profile. We connect ambitious students with the funding they need
              to succeed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/scholarships"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 group"
              >
                <span>Find Scholarships</span>
                <FaSearch className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link
                to="/scholarships"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore All</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-white/10 pt-8">
              <div className="text-left">
                <p className="text-3xl font-bold text-white">1000+</p>
                <p className="text-sm text-gray-400">Scholarships</p>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div className="text-left">
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-sm text-gray-400">Universities</p>
              </div>
              <div className="w-px h-10 bg-white/20"></div>
              <div className="text-left">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-sm text-gray-400">Support</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content / Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Main Image Container */}
            <div className="relative z-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl p-1 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="bg-gray-900 rounded-[22px] overflow-hidden aspect-[4/3] relative">
                {/* Abstract Representation of Success */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-60 hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4">
                    <div className="bg-green-500/20 p-3 rounded-lg text-green-400">
                      <FaUserGraduate className="text-2xl" />
                    </div>
                    <div>
                      <p className="font-bold text-white">
                        Scholarship Approved
                      </p>
                      <p className="text-sm text-gray-300">
                        Just now • $15,000 granted
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 bg-white text-gray-900 p-4 rounded-2xl shadow-xl z-20 max-w-[180px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <FaUniversity />
                </div>
                <span className="font-bold text-sm">Top Universities</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-4/5 bg-blue-500 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
