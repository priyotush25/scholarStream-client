import React from 'react';

const Blog = () => {
    const posts = [
        {
            title: "10 Tips for Writing a Winning Scholarship Essay",
            excerpt: "Make your application stand out with these proven strategies from scholarship winners.",
            date: "Dec 10, 2024",
            category: "Tips & Tricks"
        },
        {
            title: "Understanding Financial Aid vs. Scholarships",
            excerpt: "Learn the key differences and how to maximize your funding options for college.",
            date: "Dec 05, 2024",
            category: "Financial Planning"
        },
        {
            title: "Top 5 Scholarships for International Students",
            excerpt: "A curated list of the best opportunities available for students studying abroad this year.",
            date: "Nov 28, 2024",
            category: "Opportunities"
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 py-12 px-6">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">ScholarStream Blog</h1>
                    <p className="text-xl text-base-content/70">Insights, advice, and news for your academic journey.</p>
                </div>

                <div className="space-y-8">
                    {posts.map((post, index) => (
                        <div key={index} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="card-body">
                                <div className="flex items-center gap-4 text-sm text-base-content/60 mb-2">
                                    <span className="badge badge-ghost">{post.category}</span>
                                    <span>{post.date}</span>
                                </div>
                                <h2 className="card-title text-2xl mb-2">{post.title}</h2>
                                <p className="text-base-content/70 mb-4">{post.excerpt}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary btn-sm btn-outline">Read More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
