import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import ScholarshipCard from "../common/ScholarshipCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/scholarships/top")
      .then((res) => {
        setScholarships(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Decorative Blur */}
      <div className="absolute -top-32 left-1/3 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-32 right-1/3 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-6 py-2 rounded-full text-sm font-semibold
              bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
          >
            Featured Opportunities
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6"
          >
            Top Scholarships
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            Hand-picked scholarship opportunities with high success rates,
            trusted universities, and verified funding.
          </motion.p>
        </div>

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {scholarships.map((scholarship, index) => (
            <motion.div
              key={scholarship._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br
                from-indigo-300 to-purple-300 opacity-0 group-hover:opacity-25
                blur-2xl transition-opacity -z-10"></div>

              {/* Card Wrapper */}
              <div className="h-full rounded-3xl bg-white/70 backdrop-blur-xl
                border border-white/40 shadow-lg hover:shadow-2xl
                transition-all duration-300 hover:-translate-y-2">
                <ScholarshipCard scholarship={scholarship} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-20"
        >
          <Link
            to="/scholarships"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full
              bg-gradient-to-r from-indigo-600 to-purple-600
              text-white font-bold text-lg shadow-lg
              hover:shadow-2xl hover:scale-105 transition-all"
          >
            View All Scholarships
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopScholarships;
