import React from 'react';
import { PiEnvelope, PiPhone, PiMapPin } from 'react-icons/pi';

const ContactUs = () => {
    return (
      <div className="min-h-screen bg-base-100 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Information */}
            <div>
              <h1 className="text-4xl font-bold mb-6 gradient-text">
                Get in Touch
              </h1>
              <p className="text-lg text-base-content/70 mb-8">
                We'd love to hear from you. Our friendly team is always here to
                chat.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-primary">
                    <PiEnvelope className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-base-content/70">
                      support@scholarstream.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-primary">
                    <PiPhone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-base-content/70">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-primary">
                    <PiMapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Office</h3>
                    <p className="text-base-content/70">
                      123 Education Lane, Tech City, TC 90210
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Send us a message</h2>
                <form className="space-y-4 px-5">
                  <div className="form-control space-x-7">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered"
                    />
                  </div>

                  <div className="form-control space-x-8">
                    <label className="label ">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="input input-bordered"
                    />
                  </div>

                  <div className="form-control space-x-2">
                    <label className="label">
                      <span className="label-text">Message</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-32"
                      placeholder="How can we help?"
                    ></textarea>
                  </div>

                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ContactUs;
