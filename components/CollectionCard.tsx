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
      <Link to={`/collection/${collection.id}`} className="block group overflow-hidden rounded-lg shadow-md">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src={collection.cover_image} 
            alt={collection.name} 
            className="w-full h-96 object-cover transition-transform duration-500 ease-in-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-3xl font-serif">{collection.name}</h3>
            <p className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">View Collection &rarr;</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CollectionCard;