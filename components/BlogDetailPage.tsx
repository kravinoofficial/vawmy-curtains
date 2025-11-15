import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api';
import { BlogPost } from '../types';
import AnimatedPage from './AnimatedPage';
import { FiCalendar, FiUser, FiArrowLeft } from 'react-icons/fi';

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const data = await api.getBlogPost(slug);
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

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
            <p className="text-gray-600 font-medium">Loading post...</p>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  if (!post) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-6 pt-20 sm:pt-24 bg-white">
          <img src="/logo-removebg-preview.png" alt="Vawmy" className="h-24 mx-auto mb-6 opacity-30" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-4">Post Not Found</h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg px-4 text-gray-600">We couldn't find the blog post you were looking for.</p>
          <Link to="/blog" className="bg-[#A4D65E] text-[#4A4A4A] font-bold py-3 px-6 text-sm sm:text-base rounded-full hover:bg-[#8BC34A] transition-colors shadow-lg">
            Back to Blog
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <article className="bg-white min-h-screen pt-20 pb-16">
        {/* Hero Image */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 -mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <Link
              to="/blog"
              className="inline-flex items-center text-white hover:text-[#A4D65E] transition-colors mb-6 group"
            >
              <FiArrowLeft className="mr-2 group-hover:-translate-x-2 transition-transform" />
              Back to Blog
            </Link>

            {/* Title Card */}
            <div className="bg-white rounded-lg shadow-xl p-8 sm:p-12 mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A4A4A] mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center space-x-2">
                  <FiCalendar />
                  <span>{formatDate(post.published_date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FiUser />
                  <span>{post.author}</span>
                </div>
              </div>
              <div className="w-24 h-1 bg-[#A4D65E]"></div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-[#4A4A4A] prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-[#A4D65E] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-[#4A4A4A]
                  prose-ul:my-6 prose-li:text-gray-700
                  prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Back to Blog Button */}
            <div className="text-center mt-12">
              <Link
                to="/blog"
                className="inline-block bg-[#A4D65E] text-[#4A4A4A] font-bold py-3 px-8 rounded-full hover:bg-[#8BC34A] transition-all duration-300 shadow-lg"
              >
                ← Back to All Posts
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </AnimatedPage>
  );
};

export default BlogDetailPage;
