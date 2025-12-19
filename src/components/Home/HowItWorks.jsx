import React from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaFileAlt,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      icon: <FaSearch />,
      title: "Discover Opportunities",
      description:
        "Explore thousands of scholarships matched to your academic goals, skills, and interests.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      id: "02",
      icon: <FaFileAlt />,
      title: "Apply Seamlessly",
      description:
        "Submit applications directly through our platform with a fast and hassle-free process.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "03",
      icon: <FaGraduationCap />,
      title: "Achieve Your Goals",
      description:
        "Receive funding, track progress, and focus fully on your academic success.",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">

        {/* ================= HEADER ================= */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-5"
          >
            <span className="px-6 py-2 rounded-full text-sm font-semibold text-white
              bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
              3 Simple Steps
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6"
          >
            How ScholarStream Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            A modern scholarship platform designed to guide you from discovery
            to success — faster and smarter.
          </motion.p>
        </div>

        {/* ================= STEPS ================= */}
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              {/* Glass Card */}
              <div className="relative h-full rounded-3xl p-8 bg-white/70 backdrop-blur-xl
                border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300">

                {/* Step Number */}
                <span className="absolute top-6 right-6 text-6xl font-extrabold text-gray-200 select-none">
                  {step.id}
                </span>

                {/* Icon */}
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl
                  bg-gradient-to-br ${step.gradient} shadow-lg
                  group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                  bg-gradient-to-br ${step.gradient} blur-2xl transition-opacity duration-300 -z-10`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;
