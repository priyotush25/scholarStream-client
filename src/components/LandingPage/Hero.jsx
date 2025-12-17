import React from 'react';
import heroImage from "../../assets/hero_illustration.png";
import { Link } from 'react-router';

const Hero = () => {
    return (
            <section className="relative md:h-[70vh] py-5 md:py-10 flex items-center justify-center overflow-hidden gradient-hero mt-10 rounded-md">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Content */}
                        <div className="text-white animate-fade-in-up">
                            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                                Your Journey to
                                <span className="block mt-2">Academic Success</span>
                            </h1>
                            <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
                                Discover thousands of scholarships tailored to your dreams.
                                ScholarStream connects ambitious students with life-changing opportunities.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to={'/register'} className="btn btn-lg btn-gradient hover-glow px-8">
                                    Get Started Free
                                </Link>
                                <Link to={'/all-scholarships'} className="btn btn-lg glass-card text-white border-white/30 hover:bg-white/20 px-8">
                                    Browse Scholarships
                                </Link>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="animate-scale-in hidden lg:block">
                            <div className="relative">
                                <img
                                    src={heroImage}
                                    alt="Students celebrating success"
                                    className="w-full h-auto animate-float"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-0 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>
    );
};

export default Hero;