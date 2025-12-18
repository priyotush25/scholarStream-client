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
      id: 1,
      icon: <FaSearch className="text-4xl text-blue-500" />,
      title: "Discover Opportunities",
      description:
        "Browse our extensive database of scholarships tailored to your academic profile and interests.",
      color: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      id: 2,
      icon: <FaFileAlt className="text-4xl text-purple-500" />,
      title: "Apply with Ease",
      description:
        "Submit your applications directly through our streamlined platform with just a few clicks.",
      color: "bg-purple-50",
      borderColor: "border-purple-100",
    },
    {
      id: 3,
      icon: <FaGraduationCap className="text-4xl text-green-500" />,
      title: "Get Funded",
      description:
        "Secure the funding you need to pursue your dreams and focus on your education.",
      color: "bg-green-50",
      borderColor: "border-green-100",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold uppercase tracking-wider text-sm"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4"
          >
            How ScholarStream Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            We've simplified the scholarship journey into three easy steps to
            help you succeed.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className={`relative rounded-2xl p-8 border ${step.borderColor} ${step.color} hover:shadow-xl transition-all duration-300 group`}
            >
              {/* Step Number */}
              <div className="absolute top-6 right-8 text-6xl font-black opacity-10 select-none font-sans">
                {step.id}
              </div>

              {/* Icon */}
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                {step.description}
              </p>

              {/* Connector Line (Desktop only, except last item) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-gray-200 transform -translate-y-1/2 z-0"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            to="/scholarships"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition hover:shadow-lg transform hover:-translate-y-1"
          >
            Start Your Journey <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
