import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api';
import { BlogPost } from '../types';
import AnimatedPage from './AnimatedPage';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex items-center justify-center bg-white pt-20">
          <div className="text-center">
            <img src="/logo-removebg-preview.png" alt="Vawmy" className="h-20 mx-auto mb-6 opacity-50" />
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#A4D65E] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading blog posts...</p>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="bg-white min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white py-16 border-b-2 border-[#A4D65E]">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A4A4A] mb-6">
                Our Blog
              </h1>
              <div className="w-24 h-1 bg-[#A4D65E] mx-auto mb-6"></div>
              <p className="text-lg text-gray-600">
                Discover tips, trends, and inspiration for your home decor journey
              </p>
            </motion.div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="container mx-auto px-4 sm:px-6 py-16">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <FiCalendar size={14} />
                          <span>{formatDate(post.published_date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiUser size={14} />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <h2 className="text-xl font-bold text-[#4A4A4A] mb-3 hover:text-[#A4D65E] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-[#A4D65E] font-semibold group">
                        <span>Read More</span>
                        <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default BlogPage;
