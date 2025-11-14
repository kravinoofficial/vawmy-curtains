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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brown-800 mx-auto mb-4"></div>
            <p className="text-brown-600">Loading collection...</p>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  if (!collection) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 pt-24">
          <h2 className="text-4xl font-serif mb-4">Collection Not Found</h2>
          <p className="mb-8 text-lg">We couldn't find the collection you were looking for.</p>
          <Link to="/" className="bg-brown-800 text-white font-bold py-3 px-6 rounded hover:bg-brown-700 transition-colors">
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
      <div className="container mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-serif text-brown-900">{collection.name}</h1>
          <p className="mt-4 text-lg text-brown-600">
            {collection.description}
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {collection.images.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer break-inside-avoid"
              onClick={() => setSelectedImg(image)}
            >
              <motion.img
                src={image}
                alt={`${collection.name} image ${index + 1}`}
                className="w-full h-auto object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Back to Collections Link */}
        <div className="text-center mt-16">
          <Link to="/" className="inline-block bg-brown-800 text-white font-bold py-3 px-8 rounded-full hover:bg-brown-700 transition-all duration-300 transform hover:scale-105">
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
              className="absolute top-5 right-5 text-white text-4xl hover:text-brown-200 transition-colors"
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
