
import React, { useState, useEffect } from 'react';
import { FiFacebook, FiInstagram, FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { api } from '../api';
import { SocialMedia, ContactInfo } from '../types';

const Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMedia[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [socialData, contactData] = await Promise.all([
          api.getVisibleSocialMedia(),
          api.getContact()
        ]);
        setSocialLinks(socialData);
        setContactInfo(contactData);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchData();
  }, []);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      facebook: FiFacebook,
      instagram: FiInstagram,
      twitter: FiTwitter,
      linkedin: FiLinkedin,
      youtube: FiYoutube,
      pinterest: null
    };

    const Icon = icons[iconName.toLowerCase()];
    
    if (Icon) {
      return <Icon />;
    }
    
    // Pinterest SVG
    if (iconName.toLowerCase() === 'pinterest') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      );
    }

    return null;
  };

  return (
    <footer id="footer" className="bg-white border-t-4 border-[#A4D65E]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <img 
              src="/logo-removebg-preview.png" 
              alt="Vawmy Curtains & Decor" 
              className="h-20 mb-6" 
            />
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-md">
              Transform your space with premium curtains and decor. Quality craftsmanship meets timeless design.
            </p>
            <div className="flex space-x-4">
              {socialLinks.length > 0 ? (
                socialLinks.map(link => (
                  <a 
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#A4D65E] hover:text-white transition-all duration-300 group"
                    aria-label={link.platform}
                  >
                    <div className="text-xl text-gray-700 group-hover:text-white">
                      {getIcon(link.icon_name)}
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-sm text-gray-500">No social media links available</p>
              )}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#A4D65E]"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 hover:text-[#A4D65E] transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#A4D65E] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/#collections" className="text-gray-600 hover:text-[#A4D65E] transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#A4D65E] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Collections
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-[#A4D65E] transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#A4D65E] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Blog
                </a>
              </li>
              <li>
                <a href="/#about-us" className="text-gray-600 hover:text-[#A4D65E] transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#A4D65E] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-gray-600 hover:text-[#A4D65E] transition-colors flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#A4D65E] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-[#4A4A4A] mb-6 relative inline-block">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#A4D65E]"></span>
            </h3>
            <ul className="space-y-4">
              {contactInfo ? (
                <>
                  <li className="flex items-start space-x-3 text-gray-600">
                    <div className="text-[#A4D65E] mt-1 flex-shrink-0">
                      <FiMapPin />
                    </div>
                    <span className="text-sm">{contactInfo.address}</span>
                  </li>
                  <li className="flex items-start space-x-3 text-gray-600">
                    <div className="text-[#A4D65E] mt-1 flex-shrink-0">
                      <FiPhone />
                    </div>
                    <a href={`tel:${contactInfo.phone}`} className="text-sm hover:text-[#A4D65E] transition-colors">
                      {contactInfo.phone}
                    </a>
                  </li>
                  <li className="flex items-start space-x-3 text-gray-600">
                    <div className="text-[#A4D65E] mt-1 flex-shrink-0">
                      <FiMail />
                    </div>
                    <a href={`mailto:${contactInfo.email}`} className="text-sm hover:text-[#A4D65E] transition-colors">
                      {contactInfo.email}
                    </a>
                  </li>
                </>
              ) : (
                <li className="text-sm text-gray-500">Loading contact info...</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 space-y-2">
              <p>&copy; 2025 <span className="text-[#A4D65E] font-semibold">Vawmy Curtains & Decor</span>. All Rights Reserved.</p>
              <p className="text-xs">
                Website by <a href="https://touchpointe.digital/" target="_blank" rel="noopener noreferrer" className="text-[#A4D65E] hover:underline font-semibold">Touchpointe Digital</a>
              </p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-[#A4D65E] transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-[#A4D65E] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;