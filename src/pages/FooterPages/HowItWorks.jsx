import React from 'react';
import { PiUserPlus, PiMagnifyingGlass, PiNotePencil, PiStudent } from 'react-icons/pi';

const HowItWorks = () => {
    const steps = [
        {
            icon: <PiUserPlus className="w-8 h-8" />,
            title: "Create Your Profile",
            description: "Sign up and complete your student profile. The more details you provide, the better we can match you with relevant scholarships."
        },
        {
            icon: <PiMagnifyingGlass className="w-8 h-8" />,
            title: "Find Scholarships",
            description: "Browse our extensive database or let our smart matching system find the perfect opportunities for your academic goals."
        },
        {
            icon: <PiNotePencil className="w-8 h-8" />,
            title: "Apply Easily",
            description: "Submit applications directly through our platform. We help you track deadlines and requirements so you never miss an opportunity."
        },
        {
            icon: <PiStudent className="w-8 h-8" />,
            title: "Get Funded",
            description: "Receive updates on your application status. Once awarded, we guide you through the acceptance and funding process."
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 py-12 px-6">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">How It Works</h1>
                    <p className="text-xl text-base-content/70">Your journey to academic success in four simple steps.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                    {step.icon}
                                </div>
                                <h2 className="card-title text-2xl mb-2">{step.title}</h2>
                                <p className="text-base-content/70">{step.description}</p>
                                <div className="badge badge-lg badge-outline mt-4 opacity-50">Step {index + 1}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
