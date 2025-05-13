import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaFacebookF, FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!credentials.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!credentials.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Aqui você implementaria a chamada para sua API de autenticação
      // Por enquanto simulamos um login bem-sucedido após um delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular autenticação bem-sucedida
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ name: 'Membro VIP' }));
      
      // Redirecionar para área exclusiva
      navigate('/area-vip');
    } catch (error) {
      setErrors({ submit: 'Falha no login. Verifique seus dados e tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-darker bg-opacity-95 px-4"
      style={{
        backgroundImage: "url('/assets/images/bg-login.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-dark bg-opacity-80 backdrop-blur-md p-8 rounded-xl border border-gray-light/20 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            <span className="text-primary">LUXE</span> <span className="text-white">LOGIN</span>
          </h2>
          
          {errors.submit && (
            <div className="mb-6 p-3 bg-red-900/40 border border-red-800 rounded text-red-200 text-sm">
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <FaUser className="absolute top-3.5 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full bg-gray-dark/70 border ${
                    errors.email ? 'border-red-500' : 'border-gray-light/30'
                  } rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs pl-2">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Senha"
                  className={`w-full bg-gray-dark/70 border ${
                    errors.password ? 'border-red-500' : 'border-gray-light/30'
                  } rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary`}
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs pl-2">{errors.password}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Lembrar-me
                </label>
              </div>
              
              <div>
                <Link to="/recuperar-senha" className="text-sm text-primary hover:text-primary-light transition-colors">
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-dark font-medium transition-all duration-300 ${
                loading
                  ? 'bg-gray-700 cursor-not-allowed text-white'
                  : 'bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary'
              }`}
            >
              {loading ? 'Entrando...' : 'ENTRAR'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">ou entre com</p>
            
            <div className="mt-3 flex justify-center space-x-4">
              <button className="p-3 rounded-full bg-[#3b5998] text-white hover:bg-[#4c70ba] transition-colors">
                <FaFacebookF />
              </button>
              <button className="p-3 rounded-full bg-[#db4437] text-white hover:bg-[#e25d4e] transition-colors">
                <FaGoogle />
              </button>
            </div>
          </div>
          
          <p className="mt-8 text-center text-sm text-gray-400">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-primary hover:text-primary-light transition-colors font-medium">
              Cadastre-se
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;