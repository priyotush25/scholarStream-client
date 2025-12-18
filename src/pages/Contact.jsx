import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdEmail, MdPhone, MdLocationOn, MdChat } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Have questions? We're here to help you on your scholarship journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Subject</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full textarea textarea-bordered h-32"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  We're here to answer any questions you may have about
                  scholarships, applications, or our platform. Reach out to us
                  and we'll respond as soon as we can.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
                  <MdEmail className="text-3xl text-purple-600" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">support@scholarstream.com</p>
                    <p className="text-sm text-gray-500">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
                  <MdPhone className="text-3xl text-purple-600" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">
                      Mon-Fri, 9AM-5PM EST
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
                  <MdLocationOn className="text-3xl text-purple-600" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Office</h3>
                    <p className="text-gray-600">123 Education Street</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-start gap-4">
                  <MdChat className="text-3xl text-purple-600" />
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Live Chat</h3>
                    <p className="text-gray-600">Available on our website</p>
                    <p className="text-sm text-gray-500">Click the chat icon</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-3xl text-blue-600 hover:scale-110 transition">
                    <FaFacebook />
                  </a>
                  <a href="#" className="text-3xl text-sky-400 hover:scale-110 transition">
                    <FaTwitter />
                  </a>
                  <a href="#" className="text-3xl text-pink-500 hover:scale-110 transition">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-3xl text-blue-800 hover:scale-110 transition">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
