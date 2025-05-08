import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Verifica se o usuário fez scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fecha o menu mobile quando mudar a rota
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="z-50">
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                LUXE
              </span>
            </h1>
          </Link>
          
          {/* Menu desktop */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <NavItem to="/" label="Início" />
              <NavItem to="/eventos" label="Eventos" />
              <NavItem to="/galeria" label="Galeria" />
              <NavItem to="/vip" label="VIP" />
              <NavItem to="/contato" label="Contato" />
            </ul>
          </nav>
          
          {/* Botão de reserva (desktop) */}
          <div className="hidden md:block">
            <motion.button
              className="btn-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Reservar Agora
            </motion.button>
          </div>
          
          {/* Botão do menu mobile */}
          <button
            className="md:hidden text-white z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? (
              <HiX size={28} className="text-white" />
            ) : (
              <HiMenu size={28} className="text-white" />
            )}
          </button>
        </div>
      </div>
      
      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-dark/95 backdrop-blur-lg flex flex-col items-center justify-center z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="w-full mb-8">
              <ul className="flex flex-col items-center space-y-6">
                <MobileNavItem to="/" label="Início" />
                <MobileNavItem to="/eventos" label="Eventos" />
                <MobileNavItem to="/galeria" label="Galeria" />
                <MobileNavItem to="/vip" label="VIP" />
                <MobileNavItem to="/contato" label="Contato" />
              </ul>
            </nav>
            
            <motion.button
              className="btn-glow mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Reservar Agora
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Componentes para itens de navegação
const NavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to !== '/' && location.pathname.startsWith(to));
                  
  return (
    <li>
      <Link 
        to={to} 
        className={`nav-link ${isActive ? 'active' : ''}`}
      >
        {label}
      </Link>
    </li>
  );
};

const MobileNavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
                  (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <motion.li
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        to={to} 
        className={`text-2xl font-bold ${isActive ? 'text-primary' : 'text-light'}`}
      >
        {label}
      </Link>
    </motion.li>
  );
};

export default Navbar;