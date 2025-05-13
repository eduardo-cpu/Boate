import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaCalendar } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const currentDate = new Date();
    const birthDate = new Date(formData.birthdate);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    
    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    if (!formData.birthdate) {
      newErrors.birthdate = 'Data de nascimento é obrigatória';
    } else if (isNaN(birthDate.getTime())) {
      newErrors.birthdate = 'Data inválida';
    } else if (age < 18) {
      newErrors.birthdate = 'Você deve ter pelo menos 18 anos';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Você deve aceitar os termos e condições';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Aqui você implementaria a chamada para sua API de registro
      // Por enquanto simulamos um registro bem-sucedido após um delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular registro bem-sucedido e redirecionamento para login
      navigate('/login', { state: { registered: true } });
    } catch (error) {
      setErrors({ submit: 'Falha no cadastro. Por favor, tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-black bg-opacity-95 px-4 py-12"
      style={{
        backgroundImage: "url('/assets/images/bg-register.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="w-full max-w-lg">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black bg-opacity-80 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            <span className="text-[#ffcc00]">CADASTRO</span> <span className="text-white">VIP</span>
          </h2>
          
          {errors.submit && (
            <div className="mb-6 p-3 bg-red-900/40 border border-red-800 rounded text-red-200 text-sm">
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <div className="relative">
                <FaUser className="absolute top-3.5 left-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome completo"
                  className={`w-full bg-gray-900/70 border ${
                    errors.name ? 'border-red-500' : 'border-gray-700'
                  } rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ffcc00]`}
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs pl-2">{errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`w-full bg-gray-900/70 border ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  } rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ffcc00]`}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs pl-2">{errors.email}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Senha"
                    className={`w-full bg-gray-900/70 border ${
                      errors.password ? 'border-red-500' : 'border-gray-700'
                    } rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ffcc00]`}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs pl-2">{errors.password}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <FaLock className="absolute top-3.5 left-3 text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirmar senha"
                    className={`w-full bg-gray-900/70 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-700'
                    } rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ffcc00]`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs pl-2">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <FaCalendar className="absolute top-3.5 left-3 text-gray-400" />
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  className={`w-full bg-gray-900/70 border ${
                    errors.birthdate ? 'border-red-500' : 'border-gray-700'
                  } rounded-md py-3 pl-10 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ffcc00]`}
                />
              </div>
              {errors.birthdate && (
                <p className="text-red-400 text-xs pl-2">{errors.birthdate}</p>
              )}
              <p className="text-gray-500 text-xs">Você deve ter pelo menos 18 anos para se cadastrar</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#ffcc00]"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-400">
                    Li e aceito os <Link to="/termos" className="text-[#ffcc00] hover:text-[#ffda44]">termos e condições</Link> e a <Link to="/privacidade" className="text-[#ffcc00] hover:text-[#ffda44]">política de privacidade</Link>
                  </label>
                </div>
              </div>
              {errors.termsAccepted && (
                <p className="text-red-400 text-xs pl-2">{errors.termsAccepted}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-300 ${
                loading
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#ffcc00] to-[#ff9500] hover:from-[#ffda44] hover:to-[#ffae3d]'
              }`}
            >
              {loading ? 'Processando...' : 'CRIAR CONTA'}
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm text-gray-400">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-[#ffcc00] hover:text-[#ffda44] transition-colors font-medium">
              Faça login
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;