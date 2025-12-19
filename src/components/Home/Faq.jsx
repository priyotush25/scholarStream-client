import React from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

const Faq = () => {
  const faqs = [
    {
      q: "How can I apply for a scholarship?",
      a: "Create an account on ScholarStream, explore available scholarships, choose one that fits your eligibility, and submit your application by completing the payment process.",
    },
    {
      q: "Is there an application fee?",
      a: "Yes. Each university sets its own application fee, and a small service charge may apply for processing applications on our platform.",
    },
    {
      q: "Can I track my application status?",
      a: "Yes. You can monitor real-time application statuses such as Pending, Processing, or Completed directly from your Student Dashboard.",
    },
    {
      q: "What documents are required?",
      a: "Typically, academic transcripts, a statement of purpose, recommendation letters, and valid identification are required. Requirements may vary by scholarship.",
    },
    {
      q: "Can I apply for multiple scholarships?",
      a: "Absolutely. You are encouraged to apply to all scholarships that match your eligibility criteria.",
    },
    {
      q: "How do I contact support?",
      a: "Our support team is available 24/7 via live chat or by emailing support@scholarstream.com.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -top-24 left-1/4 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-4 rounded-full
              bg-gradient-to-r from-indigo-600 to-purple-600 text-white
              text-sm font-semibold shadow-md"
          >
            <FaQuestionCircle />
            Help Center
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-5"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Find quick answers to the most common questions about ScholarStream.
          </motion.p>
        </div>

        {/* ================= FAQ ACCORDION ================= */}
        <div className="join join-vertical w-full rounded-3xl
          bg-white/70 backdrop-blur-xl border border-white/40
          shadow-xl overflow-hidden">

          {faqs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="collapse collapse-arrow join-item border-b border-gray-100 last:border-0"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />

              <div className="collapse-title text-lg md:text-xl font-semibold text-gray-800">
                {item.q}
              </div>

              <div className="collapse-content">
                <p className="text-gray-600 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Faq;
