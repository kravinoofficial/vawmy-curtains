import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api';
import { Collection } from '../types';
import AnimatedPage from './AnimatedPage';

const CollectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadCollection();
  }, [id]);

  const loadCollection = async () => {
    try {
      const data = await api.getCollection(id!);
      setCollection(data);
    } catch (error) {
      console.error('Error loading collection:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#A4D65E] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading collection...</p>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  if (!collection) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Collection not found</h2>
            <Link to="/" className="text-[#A4D65E] hover:underline">Go back home</Link>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Back Button */}
          <Link 
            to="/#collections" 
            className="inline-flex items-center text-[#A4D65E] hover:text-[#8BC34A] mb-8 font-semibold"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/#collections';
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Collections
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A4A4A] mb-4">
              {collection.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {collection.description}
            </p>
          </motion.div>

          {/* Video Section */}
          {collection.video_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <div className="max-w-5xl mx-auto flex justify-center">
                <video 
                  autoPlay
                  loop
                  playsInline
                  controls 
                  className="rounded-2xl shadow-2xl max-h-[70vh] w-auto max-w-full"
                  poster={collection.cover_image}
                >
                  <source src={collection.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          )}

          {/* Subcategories */}
          {collection.subcategories && collection.subcategories.length > 0 ? (
            <div className="space-y-16">
              {collection.subcategories.map((subcategory, index) => (
                <motion.div
                  key={subcategory.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-8 pb-4 border-b-2 border-[#A4D65E]">
                    {subcategory.name}
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategory.images.map((image, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        whileHover={{ scale: 1.05 }}
                        className="relative overflow-hidden rounded-xl shadow-md cursor-pointer group"
                        onClick={() => setSelectedImage(image)}
                      >
                        <img 
                          src={image}
                          alt={`${subcategory.name} ${imgIndex + 1}`}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No subcategories available yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-[#A4D65E] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img 
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </AnimatedPage>
  );
};

export default CollectionDetailPage;
