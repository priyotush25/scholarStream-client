import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const SuccessStories = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jen",
      location: "San Francisco, USA",
      university: "Stanford University",
      image: "https://randomuser.me/api/portraits/women/76.jpg",
      quote:
        "ScholarStream simplified the overwhelming search process. I found a full-ride scholarship that I wouldn't have discovered otherwise!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      university: "University of Toronto",
      image: "https://randomuser.me/api/portraits/men/47.jpg",
      quote:
        "The application tracking tools are a lifesaver. I managed multiple applications effortlessly and secured funding for my Master's.",
      rating: 5,
    },
    {
      id: 3,
      name: "Amara Okonkwo",
      location: "London, UK",
      university: "Imperial College London",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      quote:
        "I was close to giving up on studying abroad. ScholarStream connected me with a niche engineering grant that changed everything.",
      rating: 4,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">

      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 rounded-full text-sm font-semibold text-white
              bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md">
              Student Success
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-5"
          >
            Real Stories. Real Impact.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            Thousands of students worldwide trust ScholarStream to unlock
            life-changing scholarship opportunities.
          </motion.p>
        </div>

        {/* ================= TESTIMONIALS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              {/* Glass Card */}
              <div className="h-full rounded-3xl p-8 bg-white/70 backdrop-blur-xl
                border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300 relative">

                {/* Quote Icon */}
                <FaQuoteLeft className="text-4xl text-indigo-100 mb-6" />

                {/* Quote */}
                <p className="text-gray-700 italic leading-relaxed mb-8">
                  “{testimonial.quote}”
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-indigo-600 font-semibold">
                      {testimonial.university}
                    </p>
                    <p className="text-xs text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br
                  from-indigo-300 to-purple-300 opacity-0 group-hover:opacity-20
                  blur-2xl transition-opacity -z-10"></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessStories;
