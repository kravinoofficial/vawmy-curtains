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
      {/* Hero Section */}
      <div className="min-h-screen bg-white flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <img src="/logo-removebg-preview.png" alt="Vawmy Curtains & Decor" className="h-32 sm:h-40 md:h-48 lg:h-56 mx-auto" />
            </motion.div>
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#4A4A4A]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Elegance, Redefined
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Discover our curated collections of premium curtains, designed to transform your house into a home.
            </motion.p>
            <motion.a
              href="#collections"
              className="inline-block px-8 py-4 bg-[#A4D65E] text-[#4A4A4A] font-bold rounded-full hover:bg-[#8BC34A] transition-all duration-300 shadow-lg text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Explore Collections
            </motion.a>
            
            {/* Decorative Elements */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-3xl font-bold text-[#A4D65E]">10+</div>
                <div className="text-sm text-gray-600 mt-1">Years Experience</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <div className="text-3xl font-bold text-[#A4D65E]">500+</div>
                <div className="text-sm text-gray-600 mt-1">Happy Clients</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="text-3xl font-bold text-[#A4D65E]">100%</div>
                <div className="text-sm text-gray-600 mt-1">Quality Assured</div>
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="text-3xl font-bold text-[#A4D65E]">24/7</div>
                <div className="text-sm text-gray-600 mt-1">Support Available</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Collections Section */}
      <section id="collections" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.7 }}
             className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A4A4A]">Our Collections</h2>
            <div className="w-24 h-1 bg-[#A4D65E] mx-auto mt-4 mb-6"></div>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Each collection is a testament to quality craftsmanship and timeless design. Find the perfect style for your space.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {collections.map((collection, index) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.7 }}
             className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A4A4A]">About Vawmy</h2>
            <div className="w-24 h-1 bg-[#A4D65E] mx-auto mt-4"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <img src="https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Interior of a modern home" className="rounded-lg shadow-xl w-full border-4 border-[#A4D65E]/20" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-gray-700"
            >
              <p className="text-base sm:text-lg mb-4 leading-relaxed">
                At <span className="font-bold text-[#4A4A4A]">Vawmy Curtains & Decor</span>, we believe that windows are the soul of a room. For over a decade, we have dedicated ourselves to crafting exquisite, high-quality window treatments that do more than just cover a window—they transform a space.
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                Our passion for design and commitment to craftsmanship are woven into every fabric we select and every stitch we make. We work with the finest materials to create curtains and shades that are not only beautiful but also durable and functional.
              </p>
              <div className="mt-6 flex items-center space-x-2">
                <div className="w-12 h-1 bg-[#A4D65E]"></div>
                <span className="text-[#A4D65E] font-semibold">Quality • Style • Excellence</span>
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