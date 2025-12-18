import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-4">About ScholarStream</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Connecting students with life-changing scholarship opportunities
              worldwide
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                ScholarStream was founded with a simple yet powerful mission: to
                make quality education accessible to everyone, regardless of
                their financial background.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that talent is universal, but opportunity is not.
                That's why we've created a platform that connects deserving
                students with scholarship opportunities from around the world.
              </p>
              <p className="text-gray-600">
                Our platform streamlines the entire scholarship application
                process, making it easier for students to find, apply for, and
                secure funding for their education.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-8"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700">
                  To become the world's most trusted scholarship platform,
                  helping millions of students achieve their academic dreams.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1,247", label: "Scholarships" },
              { number: "10K+", label: "Students" },
              { number: "$2.4M", label: "Funding" },
              { number: "50+", label: "Countries" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: "Accessibility",
                description:
                  "Making education opportunities available to everyone, everywhere.",
              },
              {
                icon: "🔒",
                title: "Trust",
                description:
                  "Secure, transparent processes that students and institutions can rely on.",
              },
              {
                icon: "💡",
                title: "Innovation",
                description:
                  "Constantly improving our platform to serve students better.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students finding their perfect scholarship
            opportunities
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-white text-purple-700 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
