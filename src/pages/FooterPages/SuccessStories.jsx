import React from 'react';
import { PiStudentFill } from 'react-icons/pi';

const SuccessStories = () => {
    const stories = [
        {
            name: "Sarah Chen",
            university: "Stanford University",
            award: "$25,000",
            image: "https://i.pravatar.cc/150?u=sarah",
            quote: "ScholarStream made it impossible to miss deadlines. I applied to 5 scholarships and won the one that covered my entire tuition!"
        },
        {
            name: "James Wilson",
            university: "MIT",
            award: "$15,000",
            image: "https://i.pravatar.cc/150?u=james",
            quote: "The matching algorithm is a game changer. It found a niche engineering scholarship I would never have found on my own."
        },
        {
            name: "Maria Rodriguez",
            university: "University of Toronto",
            award: "$10,000",
            image: "https://i.pravatar.cc/150?u=maria",
            quote: "Simple, fast, and effective. The dashboard helped me organize all my applications in one place."
        },
        {
            name: "David Kim",
            university: "Oxford University",
            award: "Full Ride",
            image: "https://i.pravatar.cc/150?u=david",
            quote: "I was skeptical at first, but the results speak for themselves. Highly recommended for any serious student."
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 py-12 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">Success Stories</h1>
                    <p className="text-xl text-base-content/70">Meet the students who turned their dreams into reality.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {stories.map((story, index) => (
                        <div key={index} className="card lg:card-side bg-base-200 shadow-xl">
                            <figure className="lg:w-1/3">
                                <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                            </figure>
                            <div className="card-body lg:w-2/3">
                                <h2 className="card-title text-2xl">{story.name}</h2>
                                <div className="flex items-center gap-2 text-primary text-sm mb-2">
                                    <PiStudentFill />
                                    <span>{story.university}</span>
                                </div>
                                <div className="badge badge-secondary mb-4">Unlocked {story.award}</div>
                                <p className="italic text-base-content/80">"{story.quote}"</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;
