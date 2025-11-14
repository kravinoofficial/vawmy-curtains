
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-brown-950 text-brown-200 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif mb-4">Vawmy Curtains</h2>
        <p className="max-w-xl mx-auto mb-6 text-brown-300">
          Crafting bespoke curtains to bring warmth, elegance, and personality to your space.
        </p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Pinterest</a>
        </div>
        <div className="mt-10 border-t border-brown-800 pt-6 text-sm text-brown-400">
          <p>&copy; {new Date().getFullYear()} Vawmy Curtains. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;