import React from "react";

const Faq = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Frequently Asked Questions
        </h2>
        <div className="join join-vertical w-full bg-white shadow-sm rounded-xl border border-gray-100">
          <div className="collapse collapse-arrow join-item border-b border-gray-100 last:border-0">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium text-gray-800">
              How can I apply for a scholarship?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                Simply create an account on ScholarStream, browse the available
                scholarships, select one that matches your eligibility, and
                click the 'Apply' button to pay the fees and submit your
                application.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-b border-gray-100 last:border-0">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium text-gray-800">
              Is there an application fee?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                Yes, each university sets its own application fee. Additionally,
                there may be a small service charge for processing the
                application through our platform.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-b border-gray-100 last:border-0">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium text-gray-800">
              Can I track my application status?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                Absolutely! Once you've applied, you can track the real-time
                status of your application (Pending, Processing, Completed) from
                your Student Dashboard.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-b border-gray-100 last:border-0">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium text-gray-800">
              What documents do I need to apply?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                Generally, you'll need your academic transcripts, a statement of
                purpose, recommendation letters, and identification documents.
                Specific requirements vary by scholarship.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-b border-gray-100 last:border-0">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium text-gray-800">
              Can I apply for multiple scholarships?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                Yes! You can apply to as many scholarships as you are eligible
                for. We encourage you to maximize your opportunities.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-b border-gray-100 last:border-0">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium text-gray-800">
              How do I contact support?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                You can reach our support team 24/7 via the help chat button on
                the bottom right or email us at support@scholarstream.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
