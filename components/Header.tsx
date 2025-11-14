import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      style={{
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        backgroundColor: scrolled ? 'rgba(247, 246, 242, 0.8)' : 'transparent'
      }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-brown-800 hover:text-brown-600 transition-colors">
          Vawmy Curtains
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-brown-700 hover:text-brown-950 transition-colors font-medium">Home</Link>
          <a href="/#collections" className="text-brown-700 hover:text-brown-950 transition-colors font-medium">Collections</a>
          <a href="/#about-us" className="text-brown-700 hover:text-brown-950 transition-colors font-medium">About</a>
          <a href="/#contact" className="text-brown-700 hover:text-brown-950 transition-colors font-medium">Contact</a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;