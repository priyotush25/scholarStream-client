import React from 'react';

const LearnMore = () => {
    const faqs = [
        {
            question: "What is ScholarStream?",
            answer: "ScholarStream is a platform designed to connect students with scholarship opportunities that match their profile and academic goals. We streamline the search and application process to make funding education easier."
        },
        {
            question: "Is it free for students to use?",
            answer: "Yes! ScholarStream is completely free for students. Our mission is to make education accessible to everyone, so we don't charge students fees to search or apply for scholarships through our platform."
        },
        {
            question: "How does the application process work?",
            answer: "Once you create an account, you can browse available scholarships properly matched to your profile. When you find one you like, simply click 'View Details' and follow the application instructions. Some scholarships allow direct application through our portal!"
        },
        {
            question: "Can I apply to multiple scholarships?",
            answer: "Absolutely. We encourage you to apply to as many scholarships as you are eligible for. There is no limit to the number of applications you can submit."
        },
        {
            question: "How are scholarship winners selected?",
            answer: "Winners are selected by the scholarship providers or their designated committees based on the specific criteria outlined for each award (e.g., academic merit, financial need, essay quality)."
        },
        {
            question: "How do I contact support?",
            answer: "If you have any issues or questions, you can reach out to our support team via the 'Contact Us' page or email us directly at support@scholarstream.com."
        }
    ];

    return (
        <div className="py-16 bg-base-200">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h2>
                    <p className="text-lg text-base-content/70">
                        Have questions? We're here to help. browse through our most common questions below.
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="collapse collapse-plus bg-base-100 border border-base-300 rounded-box">
                            <input type="radio" name="my-accordion-3" defaultChecked={index === 0} />
                            <div className="collapse-title text-xl font-medium">
                                {faq.question}
                            </div>
                            <div className="collapse-content text-base-content/80">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearnMore;
