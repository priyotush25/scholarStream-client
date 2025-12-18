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
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      quote:
        "ScholarStream simplified the overwhelming search process. I found a full-ride scholarship that I wouldn't have discovered otherwise!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      university: "University of Toronto",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      quote:
        "The application tracking tools are a lifesaver. I managed 15 applications effortlessly and secured funding for my Master's.",
      rating: 5,
    },
    {
      id: 3,
      name: "Amara Okonkwo",
      location: "London, UK",
      university: "Imperial College London",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      quote:
        "I was about to give up on my study abroad dreams due to funding. ScholarStream connected me with a niche grant for engineering students.",
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-600 font-bold uppercase tracking-wider text-sm"
          >
            Student Voices
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-gray-800 mt-2 mb-4"
          >
            Real Stories, Real Success
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Join the community of students who have transformed their academic
            futures through ScholarStream.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Quote Icon */}
              <div className="mb-6 text-blue-100">
                <FaQuoteLeft className="text-4xl" />
              </div>

              {/* Quote Text */}
              <p className="text-gray-600 italic mb-6 flex-grow leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
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

              {/* User Profile */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`;
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-blue-600 font-semibold mb-0.5">
                    {testimonial.university}
                  </p>
                  <p className="text-xs text-gray-400">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
