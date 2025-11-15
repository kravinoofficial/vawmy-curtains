import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../api';
import { Collection, ContactInfo } from '../types';
import AnimatedPage from './AnimatedPage';
import CollectionCard from './CollectionCard';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const HomePage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collectionsData, contactData] = await Promise.all([
          api.getCollections(),
          api.getContact()
        ]);
        setCollections(collectionsData);
        setContactInfo(contactData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <img src="/logo-removebg-preview.png" alt="Vawmy" className="h-20 mx-auto mb-6 opacity-50" />
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#A4D65E] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      {/* Hero Section - Sharp Fixed Background Image */}
      <div 
        className="h-[65vh] min-h-[650px] flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=2400&q=100')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Very light overlay for text contrast only */}
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <img src="/logo-removebg-preview.png" alt="Vawmy Curtains & Decor" className="h-32 sm:h-40 md:h-48 lg:h-56 mx-auto" />
            </motion.div>
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Elegance, Redefined
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto text-black mb-4 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Handcrafted curtains and decor from boutique Indian artisans
            </motion.p>
            <motion.div
              className="flex justify-center items-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.a
                href="#collections"
                className="px-12 py-4 bg-[#A4D65E] text-white font-bold rounded-lg hover:bg-[#8BC34A] transition-all duration-300 shadow-lg text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Collections
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Collections Section */}
      <section id="collections" className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A4D65E]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A4D65E]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.3 }}
             transition={{ duration: 0.8 }}
             className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A4A4A] tracking-tight mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Collections
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-[#A4D65E] mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <CollectionCard collection={collection} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20 sm:py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.3 }}
             transition={{ duration: 0.8 }}
             className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A4A4A] tracking-tight mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About Vawmy Curtains
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-[#A4D65E] mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative space-y-6"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-[#A4D65E]/10 rounded-2xl blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80" 
                  alt="Elegant curtains in a modern home" 
                  className="rounded-2xl shadow-2xl w-full relative z-10 border-4 border-white" 
                />
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#A4D65E]/10 rounded-2xl blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&q=80" 
                  alt="Beautiful curtain designs" 
                  className="rounded-2xl shadow-2xl w-full relative z-10 border-4 border-white" 
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-gray-700"
            >
              <motion.p 
                className="text-base sm:text-lg mb-8 leading-relaxed font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Crafting stylish and comfortable curtains in India, blending style with functionality for every home.
              </motion.p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <motion.div 
                  className="text-center p-6 bg-gradient-to-br from-[#A4D65E]/10 to-[#A4D65E]/5 rounded-xl border border-[#A4D65E]/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(164, 214, 94, 0.2)" }}
                >
                  <div className="text-4xl font-bold text-[#A4D65E]">150+</div>
                  <div className="text-sm text-gray-600 mt-2">Since 2010</div>
                </motion.div>
                <motion.div 
                  className="text-center p-6 bg-gradient-to-br from-[#A4D65E]/10 to-[#A4D65E]/5 rounded-xl border border-[#A4D65E]/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(164, 214, 94, 0.2)" }}
                >
                  <div className="text-4xl font-bold text-[#A4D65E]">15</div>
                  <div className="text-sm text-gray-600 mt-2">Installed Locally</div>
                </motion.div>
              </div>
              
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.7 }}
             className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A4A4A]">Get In Touch</h2>
            <div className="w-24 h-1 bg-[#A4D65E] mx-auto mt-4 mb-6"></div>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Have a question or want to schedule a consultation? We'd love to hear from you.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-3 sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm border-l-4 border-[#A4D65E]">
                <div className="text-2xl sm:text-3xl text-[#A4D65E] mt-1 flex-shrink-0">
                  <FiMapPin />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#4A4A4A]">Our Showroom</h3>
                  <p className="text-sm sm:text-base text-gray-600">{contactInfo?.address || 'Loading...'}</p>
                </div>
              </div>
               <div className="flex items-start space-x-3 sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm border-l-4 border-[#A4D65E]">
                <div className="text-2xl sm:text-3xl text-[#A4D65E] mt-1 flex-shrink-0">
                  <FiPhone />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#4A4A4A]">Phone</h3>
                  <p className="text-sm sm:text-base text-gray-600">{contactInfo?.phone || 'Loading...'}</p>
                </div>
              </div>
               <div className="flex items-start space-x-3 sm:space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm border-l-4 border-[#A4D65E]">
                <div className="text-2xl sm:text-3xl text-[#A4D65E] mt-1 flex-shrink-0">
                  <FiMail />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#4A4A4A]">Email</h3>
                  <p className="text-sm sm:text-base text-gray-600">{contactInfo?.email || 'Loading...'}</p>
                </div>
              </div>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 bg-gray-50 p-6 sm:p-8 rounded-lg shadow-sm"
            >
              <input type="text" placeholder="Your Name" className="w-full p-3 text-sm sm:text-base rounded-md border border-gray-300 focus:ring-2 focus:ring-[#A4D65E] focus:border-[#A4D65E] focus:outline-none bg-white"/>
              <input type="email" placeholder="Your Email" className="w-full p-3 text-sm sm:text-base rounded-md border border-gray-300 focus:ring-2 focus:ring-[#A4D65E] focus:border-[#A4D65E] focus:outline-none bg-white"/>
              <textarea placeholder="Your Message" rows={5} className="w-full p-3 text-sm sm:text-base rounded-md border border-gray-300 focus:ring-2 focus:ring-[#A4D65E] focus:border-[#A4D65E] focus:outline-none bg-white"></textarea>
              <button type="submit" className="w-full bg-[#A4D65E] text-[#4A4A4A] font-bold py-3 px-6 rounded-md hover:bg-[#8BC34A] transition-colors text-sm sm:text-base shadow-md">Send Message</button>
            </motion.form>
          </div>
        </div>
      </section>

    </AnimatedPage>
  );
};

export default HomePage;