import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  
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
    setShowUserMenu(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark/80 backdrop-blur-lg shadow-lg' 
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
          
          {/* Área de autenticação (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated() ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <FaUser className="text-dark" />
                  </div>
                  <span className="text-white hidden lg:block">
                    {user?.name || 'Membro'}
                  </span>
                </button>
                
                {/* Menu do usuário */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark/90 backdrop-blur-lg border border-gray-light/20 rounded-md shadow-xl z-50">
                    <Link 
                      to="/area-vip" 
                      className="block px-4 py-3 text-white hover:bg-gray-dark transition-colors"
                    >
                      Área VIP
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left px-4 py-3 text-white hover:bg-gray-dark transition-colors flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-primary transition-colors font-medium">
                  Login
                </Link>
                <Link 
                  to="/cadastro"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary text-dark px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Cadastrar
                </Link>
              </>
            )}
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
            className="fixed inset-0 bg-darker/95 backdrop-blur-lg flex flex-col items-center justify-center z-40"
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
                
                {isAuthenticated() ? (
                  <>
                    <MobileNavItem to="/area-vip" label="Área VIP" />
                    <li>
                      <button 
                        onClick={handleLogout}
                        className="text-2xl font-bold text-white flex items-center"
                      >
                        <FaSignOutAlt className="mr-2" /> Sair
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <MobileNavItem to="/login" label="Login" />
                    <MobileNavItem to="/cadastro" label="Cadastrar" />
                  </>
                )}
              </ul>
            </nav>
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
        className={`nav-link ${isActive ? 'active text-primary' : 'text-white hover:text-primary'} transition-colors`}
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
        className={`text-2xl font-bold ${isActive ? 'text-primary' : 'text-white'}`}
      >
        {label}
      </Link>
    </motion.li>
  );
};

export default Navbar;