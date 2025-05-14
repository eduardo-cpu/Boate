import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Gallery from './pages/Gallery';
import Vip from './pages/Vip';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberArea from './pages/MemberArea';
import MyTickets from './pages/MyTickets';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Contextos
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { TicketProvider } from './contexts/TicketContext';

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
    <AuthProvider>
      <CartProvider>
        <TicketProvider>
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
                className="min-h-screen flex flex-col bg-dark text-white"
              >
                <Navbar />
                
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/eventos" element={<Events />} />
                    <Route path="/eventos/:eventId" element={<EventDetail />} />
                    <Route path="/galeria" element={<Gallery />} />
                    <Route path="/vip" element={<Vip />} />
                    <Route path="/contato" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route 
                      path="/area-vip" 
                      element={
                        <ProtectedRoute>
                          <MemberArea />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/meus-ingressos" 
                      element={
                        <ProtectedRoute>
                          <MyTickets />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="/carrinho" element={<Cart />} />
                    <Route 
                      path="/checkout" 
                      element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </main>
                
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </TicketProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;