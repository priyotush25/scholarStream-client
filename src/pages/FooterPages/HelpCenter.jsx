import React from 'react';
import { PiMagnifyingGlass, PiUserGear, PiFiles, PiCreditCard, PiWrench } from 'react-icons/pi';

const HelpCenter = () => {
    const categories = [
        { icon: <PiUserGear className="w-8 h-8" />, title: "Account & Profile", desc: "Managing your account settings" },
        { icon: <PiFiles className="w-8 h-8" />, title: "Applications", desc: "Submitting and tracking applications" },
        { icon: <PiCreditCard className="w-8 h-8" />, title: "Payments", desc: "Billing and scholarship fees" },
        { icon: <PiWrench className="w-8 h-8" />, title: "Technical Support", desc: "Troubleshooting and bug reports" }
    ];

    return (
        <div className="min-h-screen bg-base-100 py-12 px-6">
            <div className="container mx-auto max-w-5xl">
                {/* Hero Search */}
                <div className="text-center mb-16 space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-bold gradient-text">How can we help?</h1>

                    <div className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for articles..."
                            className="input input-lg input-bordered w-full pl-12 shadow-lg"
                        />
                        <PiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-50" />
                    </div>
                </div>

                {/* Categories */}
                <div className="grid md:grid-cols-2 gap-6">
                    {categories.map((cat, index) => (
                        <div key={index} className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer border border-transparent hover:border-primary/20">
                            <div className="card-body flex-row items-center gap-4">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{cat.title}</h3>
                                    <p className="text-sm text-base-content/60">{cat.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Help */}
                <div className="mt-16 text-center">
                    <h3 className="text-xl font-bold mb-4">Still need help?</h3>
                    <p className="text-base-content/70 mb-6">Our support team is available Mon-Fri, 9am-5pm EST.</p>
                    <button className="btn btn-primary">Contact Support</button>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
