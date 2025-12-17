import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-base-100 py-12 px-6">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-sm text-base-content/60 mb-8">Last updated: December 10, 2024</p>

                <div className="prose prose-lg max-w-none">
                    <h3>1. Introduction</h3>
                    <p>
                        Welcome to ScholarStream. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website
                        and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h3>2. Data We Collect</h3>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul>
                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                        <li><strong>Financial Data:</strong> includes bank account and payment card details (processed securely by our payment providers).</li>
                    </ul>

                    <h3>3. How We Use Your Data</h3>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul>
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                    </ul>

                    <h3>4. Data Security</h3>
                    <p>
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                    </p>

                    <h3>5. Contact Us</h3>
                    <p>
                        If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@scholarstream.com.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
