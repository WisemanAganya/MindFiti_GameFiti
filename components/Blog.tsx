import React, { useState, useEffect } from 'react';
import { api } from '../services/apiService';
import { BlogPost } from '../types';

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const FALLBACK_POSTS: BlogPost[] = [
        {
            slug: 'mindful-breathing-technique',
            imgSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', // Breathing/Yoga
            category: 'Practice',
            title: 'A Simple Mindful Breathing Technique',
            author: 'Dr. Maria Lopez',
            content: 'A short guide to a breathing exercise you can use anytime to ground yourself.',
            published_at: '2025-10-01',
            created_at: new Date().toISOString()
        },
        {
            slug: 'building-resilience',
            imgSrc: '/assets/merch/img/portfolio/wellness.PNG', // Resilience/Support
            category: 'Wellness',
            title: 'Building Resilience Through Small Habits',
            author: 'Team Mindstrong',
            content: 'Practical steps to create small, repeatable habits that build emotional resilience.',
            published_at: '2025-09-15',
            created_at: new Date().toISOString()
        },
        {
            slug: 'how-to-support-someone',
            imgSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80', // Support/Counseling
            category: 'Community',
            title: 'How to Support Someone You Care About',
            author: 'Community Contributor',
            content: 'Guidance on compassionate listening and supporting mental well-being for others.',
            published_at: '2025-08-30',
            created_at: new Date().toISOString()
        }
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await api.getBlogPosts();
                if (Array.isArray(data) && data.length > 0) {
                    setPosts(data);
                } else {
                    console.warn('Blog API returned no posts, using fallback posts.');
                    setPosts(FALLBACK_POSTS);
                }
            } catch (err) {
                console.error(err);
                setError(null);
                setPosts(FALLBACK_POSTS);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <section id="blog" className="py-20 bg-neutral-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase font-montserrat text-primary">Our Latest Insights</h2>
                    <h3 className="text-md md:text-lg text-neutral-500 italic mt-2">Stories, Resources, and Reflections</h3>
                </div>

                {loading && <div className="text-center"><p>Loading posts...</p></div>}
                {error && <div className="text-center"><p className="text-red-500">{error}</p></div>}
                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {posts.map((post, index) => (
                                <a href={`#/blog/${post.id || post.slug}`} key={index} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden border border-gray-100">
                                    <div className="relative h-56 overflow-hidden">
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder while loading */}
                                        <img src={post.imgSrc} alt={post.title} className="relative w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-sm border border-gray-100">
                                            {post.category}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-3 text-xs text-gray-400 font-medium uppercase tracking-wide">
                                            <span>{post.published_at}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span>{post.author}</span>
                                        </div>

                                        <h3 className="text-xl font-bold font-montserrat text-white mb-3 leading-snug group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">{post.content}</p>

                                        <div className="mt-auto flex items-center text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
                                            Read Article <i className="fas fa-arrow-right ml-2 text-xs"></i>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <a href="#!" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
                                View All Posts
                            </a>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Blog;
