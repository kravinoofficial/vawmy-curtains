import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          borderBottom: scrolled ? '2px solid rgba(164, 214, 94, 0.3)' : '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center">
          <a 
            href="/#" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src="/logo-removebg-preview.png" alt="Vawmy Curtains & Decor" className="h-12 sm:h-14 md:h-16 w-auto" />
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#collections" className="text-gray-700 hover:text-[#A4D65E] transition-colors font-medium">Collections</a>
            <Link to="/blog" className="text-gray-700 hover:text-[#A4D65E] transition-colors font-medium">Blog</Link>
            <a href="/#about-us" className="text-gray-700 hover:text-[#A4D65E] transition-colors font-medium">About</a>
            <a href="/#contact" className="text-gray-700 hover:text-[#A4D65E] transition-colors font-medium">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-64 max-w-[80vw] bg-white z-40 shadow-2xl md:hidden border-l-2 border-[#A4D65E]"
          >
            <div className="p-6 border-b border-gray-200">
              <img src="/logo-removebg-preview.png" alt="Vawmy" className="h-12 w-auto" />
            </div>
            <nav className="flex flex-col p-6 space-y-6">
              <a 
                href="/#collections" 
                className="text-gray-700 hover:text-[#A4D65E] transition-colors font-medium text-lg"
                onClick={handleLinkClick}
              >
                Collections
              </a>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-[#A4D65E] transition-colors font-medium text-lg"
                onClick={handleLinkClick}
              >
                Blog
              </Link>
              <a 
                href="/#about-us" 
                className="text-gray-700 hover:text-[#A4D65E] transition-colors font-medium text-lg"
                onClick={handleLinkClick}
              >
                About
              </a>
              <a 
                href="/#contact" 
                className="text-gray-700 hover:text-[#A4D65E] transition-colors font-medium text-lg"
                onClick={handleLinkClick}
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;