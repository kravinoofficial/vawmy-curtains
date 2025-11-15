import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api';
import { Collection } from '../types';
import AnimatedPage from './AnimatedPage';
import { FiX } from 'react-icons/fi';

const CollectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      if (!id) return;
      
      try {
        const data = await api.getCollection(id);
        setCollection(data);
      } catch (error) {
        console.error('Error fetching collection:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  if (loading) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <img src="/logo-removebg-preview.png" alt="Vawmy" className="h-20 mx-auto mb-6 opacity-50" />
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#A4D65E] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading collection...</p>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  if (!collection) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-6 pt-20 sm:pt-24 bg-white">
          <img src="/logo-removebg-preview.png" alt="Vawmy" className="h-24 mx-auto mb-6 opacity-30" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#4A4A4A] mb-4">Collection Not Found</h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg px-4 text-gray-600">We couldn't find the collection you were looking for.</p>
          <Link to="/" className="bg-[#A4D65E] text-[#4A4A4A] font-bold py-3 px-6 text-sm sm:text-base rounded-full hover:bg-[#8BC34A] transition-colors shadow-lg">
            Back to Home
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32 bg-white min-h-screen">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A4A4A]">{collection.name}</h1>
          <div className="w-24 h-1 bg-[#A4D65E] mx-auto mt-4 mb-6"></div>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 px-4">
            {collection.description}
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 md:gap-8 space-y-4 sm:space-y-6 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {collection.images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer break-inside-avoid border-2 border-transparent hover:border-[#A4D65E] transition-all duration-300"
              onClick={() => setSelectedImg(image)}
            >
              <motion.img
                src={image}
                alt={`${collection.name} image ${index + 1}`}
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Back to Collections Link */}
        <div className="text-center mt-12 sm:mt-16">
          <Link to="/" className="inline-block bg-[#A4D65E] text-[#4A4A4A] font-bold py-3 px-6 sm:px-8 text-sm sm:text-base rounded-full hover:bg-[#8BC34A] transition-all duration-300 transform hover:scale-105 shadow-lg">
            &larr; Back to Collections
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selectedImg}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0 }}
              className="absolute top-5 right-5 text-white text-4xl hover:text-[#A4D65E] transition-colors bg-[#4A4A4A]/50 rounded-full p-2"
              onClick={() => setSelectedImg(null)}
              aria-label="Close image view"
            >
              <FiX />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
};

export default CollectionDetailPage;
