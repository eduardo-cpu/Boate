import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';

// Páginas
import Home from './pages/Home';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Vip from './pages/Vip';
import Contact from './pages/Contact';

const App = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulando carregamento de recursos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col"
        >
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/galeria" element={<Gallery />} />
              <Route path="/vip" element={<Vip />} />
              <Route path="/contato" element={<Contact />} />
            </Routes>
          </main>
          
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;