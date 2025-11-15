import React from 'react';
import { Link } from 'react-router-dom';
// FIX: Import Variants type from framer-motion to explicitly type animation variants.
import { motion, Variants } from 'framer-motion';
import { Collection } from '../types';

interface CollectionCardProps {
  collection: Collection;
}

// FIX: Explicitly type cardVariants with the Variants type to ensure compatibility with framer-motion's expected props.
const cardVariants: Variants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
    >
      <Link to={`/collection/${collection.id}`} className="block group overflow-hidden rounded-lg shadow-lg border-2 border-transparent hover:border-[#A4D65E] transition-all duration-300">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src={collection.cover_image} 
            alt={collection.name} 
            className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-500 ease-in-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A4A4A]/80 via-[#4A4A4A]/20 to-transparent transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{collection.name}</h3>
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-sm sm:text-base text-[#A4D65E] font-semibold">View Collection</span>
              <span className="text-[#A4D65E]">&rarr;</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CollectionCard;