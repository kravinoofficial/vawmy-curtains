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
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brown-800 mx-auto mb-4"></div>
            <p className="text-brown-600">Loading...</p>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <div 
        className="h-screen bg-cover bg-center bg-fixed flex items-center justify-center text-white" 
        style={{backgroundImage: "url('https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}
      >
        <div className="absolute inset-0 bg-brown-950 bg-opacity-50"></div>
        <motion.div 
          className="relative text-center p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-4 drop-shadow-lg">Elegance, Redefined</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-brown-100 drop-shadow-md">
            Discover our curated collections of premium curtains, designed to transform your house into a home.
          </p>
        </motion.div>
      </div>

      {/* Collections Section */}
      <section id="collections" className="py-20 bg-brown-50">
        <div className="container mx-auto px-6">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.7 }}
             className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brown-900">Our Collections</h2>
            <p className="mt-4 text-lg text-brown-600 max-w-2xl mx-auto">
              Each collection is a testament to quality craftsmanship and timeless design. Find the perfect style for your space.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-20 bg-white">
        <div className="container mx-auto px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.7 }}
             className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brown-900">About Vawmy</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
            >
              <img src="https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Interior of a modern home" className="rounded-lg shadow-xl" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="text-brown-700"
            >
              <p className="text-lg mb-4">
                At Vawmy Curtains, we believe that windows are the soul of a room. For over a decade, we have dedicated ourselves to crafting exquisite, high-quality window treatments that do more than just cover a window—they transform a space.
              </p>
              <p className="text-lg">
                Our passion for design and commitment to craftsmanship are woven into every fabric we select and every stitch we make. We work with the finest materials to create curtains and shades that are not only beautiful but also durable and functional.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-brown-50">
        <div className="container mx-auto px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, amount: 0.5 }}
             transition={{ duration: 0.7 }}
             className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brown-900">Get In Touch</h2>
            <p className="mt-4 text-lg text-brown-600 max-w-2xl mx-auto">
              Have a question or want to schedule a consultation? We'd love to hear from you.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <FiMapPin className="text-3xl text-brown-600 mt-1"/>
                <div>
                  <h3 className="text-xl font-semibold text-brown-800">Our Showroom</h3>
                  <p className="text-brown-600">{contactInfo?.address || 'Loading...'}</p>
                </div>
              </div>
               <div className="flex items-start space-x-4">
                <FiPhone className="text-3xl text-brown-600 mt-1"/>
                <div>
                  <h3 className="text-xl font-semibold text-brown-800">Phone</h3>
                  <p className="text-brown-600">{contactInfo?.phone || 'Loading...'}</p>
                </div>
              </div>
               <div className="flex items-start space-x-4">
                <FiMail className="text-3xl text-brown-600 mt-1"/>
                <div>
                  <h3 className="text-xl font-semibold text-brown-800">Email</h3>
                  <p className="text-brown-600">{contactInfo?.email || 'Loading...'}</p>
                </div>
              </div>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <input type="text" placeholder="Your Name" className="w-full p-3 rounded-md border border-brown-200 focus:ring-2 focus:ring-brown-400 focus:outline-none bg-white"/>
              <input type="email" placeholder="Your Email" className="w-full p-3 rounded-md border border-brown-200 focus:ring-2 focus:ring-brown-400 focus:outline-none bg-white"/>
              <textarea placeholder="Your Message" rows={5} className="w-full p-3 rounded-md border border-brown-200 focus:ring-2 focus:ring-brown-400 focus:outline-none bg-white"></textarea>
              <button type="submit" className="w-full bg-brown-800 text-white font-bold py-3 px-6 rounded-md hover:bg-brown-700 transition-colors">Send Message</button>
            </motion.form>
          </div>
        </div>
      </section>

    </AnimatedPage>
  );
};

export default HomePage;