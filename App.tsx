import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CollectionDetailPage from './components/CollectionDetailPage';
import BlogPage from './components/BlogPage';
import BlogDetailPage from './components/BlogDetailPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminCollections from './components/admin/Collections';
import AdminContact from './components/admin/Contact';
import AdminBlog from './components/admin/Blog';
import AdminSocialMedia from './components/admin/SocialMedia';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white text-gray-900 min-h-screen font-sans antialiased overflow-x-hidden w-full">
    <Header />
    <main className="w-full overflow-x-hidden">{children}</main>
    <Footer />
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminCollections />} />
        <Route path="collections" element={<AdminCollections />} />
        <Route path="contact" element={<AdminContact />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="social" element={<AdminSocialMedia />} />
      </Route>

      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/collection/:id" element={<PublicLayout><CollectionDetailPage /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
      <Route path="/blog/:slug" element={<PublicLayout><BlogDetailPage /></PublicLayout>} />
    </Routes>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
