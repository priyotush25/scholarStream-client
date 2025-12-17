import React from 'react';
import Hero from '../../components/LandingPage/Hero';
import Testimonials from '../../components/LandingPage/Testimonials';
import TopScholarships from '../../components/LandingPage/TopScholarships';
import { Link } from 'react-router';

const HomeLayout = () => {


    return (
        <div className="min-h-screen bg-base-100">
            <Hero />
            <TopScholarships />

            {/* Features Section */}
            <section className="py-10 bg-base-100">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                            Why Choose <span className="gradient-text">ScholarStream</span>?
                        </h2>
                        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                            We make finding and applying for scholarships easier than ever before
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card bg-base-200 hover-lift">
                            <div className="card-body">
                                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-2xl mb-2">Smart Matching</h3>
                                <p className="text-base-content/70">
                                    Our AI-powered algorithm finds scholarships perfectly suited to your profile, interests, and goals.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="card bg-base-200 hover-lift" style={{ animationDelay: '0.1s' }}>
                            <div className="card-body">
                                <div className="w-16 h-16 rounded-full gradient-secondary flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-2xl mb-2">Easy Applications</h3>
                                <p className="text-base-content/70">
                                    Streamlined application process with saved profiles and one-click submissions to multiple scholarships.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="card bg-base-200 hover-lift" style={{ animationDelay: '0.2s' }}>
                            <div className="card-body">
                                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-2xl mb-2">Real-Time Updates</h3>
                                <p className="text-base-content/70">
                                    Get instant notifications about new scholarships, deadlines, and application status updates.
                                </p>
                            </div>
                        </div>

                        {/* Feature 4 */}
                        <div className="card bg-base-200 hover-lift" style={{ animationDelay: '0.3s' }}>
                            <div className="card-body">
                                <div className="w-16 h-16 rounded-full gradient-secondary flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-2xl mb-2">Expert Guidance</h3>
                                <p className="text-base-content/70">
                                    Access tips, essay examples, and expert advice to strengthen your scholarship applications.
                                </p>
                            </div>
                        </div>

                        {/* Feature 5 */}
                        <div className="card bg-base-200 hover-lift" style={{ animationDelay: '0.4s' }}>
                            <div className="card-body">
                                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-2xl mb-2">Secure & Private</h3>
                                <p className="text-base-content/70">
                                    Your personal information is protected with bank-level encryption and privacy standards.
                                </p>
                            </div>
                        </div>

                        {/* Feature 6 */}
                        <div className="card bg-base-200 hover-lift" style={{ animationDelay: '0.5s' }}>
                            <div className="card-body">
                                <div className="w-16 h-16 rounded-full gradient-secondary flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-2xl mb-2">Community Support</h3>
                                <p className="text-base-content/70">
                                    Join a thriving community of students sharing experiences, tips, and success stories.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials />

            {/* FAQ Section */}
            <section className="py-20 bg-base-200/50">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Frequently Asked <span className="gradient-text">Questions</span></h2>
                        <p className="text-base-content/60">Got questions? We've got answers.</p>
                    </div>
                    <div className="join join-vertical w-full bg-base-100 shadow-xl rounded-2xl border border-base-200">
                        <div className="collapse collapse-plus join-item border-b border-base-200">
                            <input type="radio" name="my-accordion-4" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                                How do I apply for a scholarship?
                            </div>
                            <div className="collapse-content">
                                <p className="opacity-70">Simply create an account, browse our extensive list of scholarships, select the one that fits you, and click 'Apply'. You'll need to pay any application fees via our secure payment gateway.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border-b border-base-200">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">
                                What documents are required?
                            </div>
                            <div className="collapse-content">
                                <p className="opacity-70">Usually, you'll need academic transcripts, a statement of purpose, and identification. Specific requirements vary by scholarship and university.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border-b border-base-200">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">
                                Is ScholarStream free to use?
                            </div>
                            <div className="collapse-content">
                                <p className="opacity-70">Browsing is free! Some scholarships have application processing fees which are clearly listed on the details page. We ensure transparent pricing.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">
                                Can I edit my application after submission?
                            </div>
                            <div className="collapse-content">
                                <p className="opacity-70">You can edit your application details only while it is in 'Pending' status. Once a moderator starts processing it, it cannot be modified to ensure integrity.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 gradient-primary relative overflow-hidden mt-10 rounded-md">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of students who are already on their path to academic success.
                        Create your free account today and discover scholarships waiting for you.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to={'/register'} className="btn btn-lg bg-white text-purple-600 hover:bg-white/90 border-none px-8">
                            Create Free Account
                        </Link>
                        <Link to='/faq' className="btn btn-lg glass-card text-white border-white/30 hover:bg-white/20 px-8">
                            Learn More
                        </Link>
                    </div>

                    <div className="mt-12 text-white/80">
                        <p className="text-sm">No credit card required • Free forever</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HomeLayout;