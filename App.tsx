import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CollectionDetailPage from './components/CollectionDetailPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminCollections from './components/admin/Collections';
import AdminContact from './components/admin/Contact';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-brown-50 text-brown-900 min-h-screen font-sans antialiased">
    <Header />
    <main>{children}</main>
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
      </Route>

      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/collection/:id" element={<PublicLayout><CollectionDetailPage /></PublicLayout>} />
    </Routes>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
