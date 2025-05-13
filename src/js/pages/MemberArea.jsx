import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaGlassMartini, FaTicketAlt, FaUserFriends, FaCocktail, FaCalendarAlt } from 'react-icons/fa';

const MemberArea = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const membershipBenefits = [
    {
      icon: <FaTicketAlt className="text-[#ffcc00] text-2xl" />,
      title: 'Entrada Prioritária',
      description: 'Acesso VIP sem filas em todos os eventos do LUXE'
    },
    {
      icon: <FaGlassMartini className="text-[#ffcc00] text-2xl" />,
      title: 'Drinks Exclusivos',
      description: 'Acesso a menu especial de coquetéis premium'
    },
    {
      icon: <FaUserFriends className="text-[#ffcc00] text-2xl" />,
      title: 'Convidados Especiais',
      description: 'Traga até 2 amigos com desconto de 50% na entrada'
    },
    {
      icon: <FaCocktail className="text-[#ffcc00] text-2xl" />,
      title: 'Open Bar Premium',
      description: 'Descontos em bebidas de primeira linha'
    },
    {
      icon: <FaCalendarAlt className="text-[#ffcc00] text-2xl" />,
      title: 'Eventos Exclusivos',
      description: 'Convites para eventos fechados com artistas especiais'
    }
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      name: 'DJ Night Exclusive',
      date: '20 de maio',
      status: 'Confirmado',
      exclusive: true
    },
    {
      id: 2,
      name: 'Luxe Summer Party',
      date: '5 de junho',
      status: 'Reservas abertas',
      exclusive: true
    },
    {
      id: 3,
      name: 'Electronic Festival',
      date: '15 de junho',
      status: 'Reservas abertas',
      exclusive: false
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark"
    >
      {/* Banner de boas-vindas */}
      <div 
        className="bg-gradient-to-r from-dark to-gray-900 py-16 px-4"
        style={{
          backgroundImage: "url('/assets/images/vip-background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Bem-vindo à Área </span>
              <span className="text-primary">VIP</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Olá, {user?.name}! Aproveite seus benefícios exclusivos.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da esquerda - Cartão de membro */}
          <div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-dark to-dark p-8 rounded-xl border border-gray-light/20 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Seu Cartão VIP</h2>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-dark font-bold">
                  VIP
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">MEMBRO</p>
                  <p className="text-white text-lg font-medium">{user?.name}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">STATUS</p>
                  <p className="text-primary text-lg font-medium">Premium</p>
                </div>
                
                <div>
                  <p className="text-gray-500 text-sm">VÁLIDO ATÉ</p>
                  <p className="text-white text-lg font-medium">Dezembro 2025</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-light/20">
                <p className="text-gray-400 mb-2 text-sm">Código do membro:</p>
                <p className="font-mono text-lg font-bold text-white tracking-widest">VIP-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
              </div>
            </motion.div>
            
            {/* Botão de logout */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-gray-dark hover:bg-gray-light/30 text-white rounded-lg transition-colors"
              >
                Sair da Conta
              </button>
            </motion.div>
          </div>
          
          {/* Coluna central - Benefícios */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-dark to-dark p-8 rounded-xl border border-gray-light/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Seus Benefícios</h2>
            
            <div className="space-y-6">
              {membershipBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 p-3 rounded-lg bg-dark bg-opacity-40">
                    {React.cloneElement(benefit.icon, { className: "text-primary text-2xl" })}
                  </div>
                  <div>
                    <h3 className="text-primary font-medium">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Coluna da direita - Próximos eventos */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-dark to-dark p-8 rounded-xl border border-gray-light/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Eventos Exclusivos</h2>
            
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-4 bg-dark bg-opacity-40 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-medium">{event.name}</h3>
                    {event.exclusive && (
                      <span className="bg-primary text-dark text-xs px-2 py-1 rounded-full font-medium">
                        VIP
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{event.date}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-primary text-sm">{event.status}</span>
                    <button className="text-white bg-gray-dark hover:bg-gray-light/30 px-3 py-1 rounded text-sm transition-colors">
                      Reservar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary text-dark font-medium rounded-lg transition-colors">
              Ver Todos os Eventos
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberArea;