import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'react-qr-code';
import { FaTicketAlt, FaCalendarAlt, FaRegClock, FaMapMarkerAlt, FaDownload, FaUser, FaGlassMartini, FaUserFriends, FaCocktail } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const MemberArea = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {
    // Simulação de dados de ingressos comprados
    // Em um caso real, isso viria de uma API
    const mockTickets = [
      {
        id: 'LUXE-546-789',
        eventId: 1,
        eventTitle: 'Neon Dreams',
        ticketType: 'Ingresso VIP',
        date: '12 Mai, 2025',
        time: '22:00 - 05:00',
        location: 'LUXE Main Hall',
        price: 150,
        purchaseDate: '10 Mai, 2025',
        image: '/assets/images/event1.jpg',
        status: 'valid' // valid, used, expired
      },
      {
        id: 'LUXE-987-654',
        eventId: 2,
        eventTitle: 'Deep House Sessions',
        ticketType: 'Ingresso Standard',
        date: '19 Mai, 2025',
        time: '22:00 - 05:00',
        location: 'LUXE Terrace',
        price: 90,
        purchaseDate: '11 Mai, 2025',
        image: '/assets/images/event2.jpg',
        status: 'valid'
      }
    ];
    
    setTickets(mockTickets);
  }, []);
  
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
      name: "DJ Night Exclusive",
      date: "20 de maio",
      status: "Confirmado",
      exclusive: true
    },
    {
      id: 2,
      name: "Luxe Summer Party",
      date: "5 de junho",
      status: "Reservas abertas",
      exclusive: true
    },
    {
      id: 3,
      name: "Electronic Festival",
      date: "15 de junho",
      status: "Reservas abertas",
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
            
            {/* Links da conta */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-gray-dark to-dark p-8 rounded-xl border border-gray-light/20 mb-8"
            >
              <h3 className="font-bold text-xl mb-4">Minha Conta</h3>
              
              <div className="space-y-3">
                <Link 
                  to="/meus-ingressos"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-light/10 transition-colors"
                >
                  <FaTicketAlt className="text-primary mr-3" />
                  <span>Meus Ingressos</span>
                </Link>
                
                <Link 
                  to="/eventos"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-light/10 transition-colors"
                >
                  <FaCalendarAlt className="text-primary mr-3" />
                  <span>Próximos Eventos</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center p-3 rounded-lg hover:bg-gray-light/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sair da Conta</span>
                </button>
              </div>
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

// Componente de cartão de ingresso
const TicketCard = ({ ticket }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Gera um link para o ingresso (na vida real, seria uma URL exclusiva e segura)
  const ticketLink = `https://luxe-nightclub.com/verify/${ticket.id}`;
  
  return (
    <motion.div 
      className="glass-panel overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Imagem do evento */}
        <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
          <img 
            src={ticket.image} 
            alt={ticket.eventTitle} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              ticket.status === 'valid' 
                ? 'bg-green-700/70 text-green-200' 
                : ticket.status === 'used'
                  ? 'bg-yellow-700/70 text-yellow-200'
                  : 'bg-red-700/70 text-red-200'
            }`}>
              {ticket.status === 'valid' 
                ? 'Válido' 
                : ticket.status === 'used'
                  ? 'Utilizado'
                  : 'Expirado'}
            </span>
          </div>
        </div>
        
        {/* Detalhes do ingresso */}
        <div className="p-6 md:w-2/3 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold">{ticket.eventTitle}</h3>
            <span className="text-primary font-bold">
              #{ticket.id}
            </span>
          </div>
          
          <span className="inline-block mb-4 text-sm font-medium text-primary">{ticket.ticketType}</span>
          
          <div className="space-y-2 mb-4 text-sm text-light/70">
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2 text-primary" size={14} />
              {ticket.date}
            </div>
            <div className="flex items-center">
              <FaRegClock className="mr-2 text-primary" size={14} />
              {ticket.time}
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-primary" size={14} />
              {ticket.location}
            </div>
          </div>
          
          <div className="mt-auto flex flex-wrap justify-between items-center gap-4">
            <div className="text-sm text-light/60">
              Comprado em: {ticket.purchaseDate}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setExpanded(!expanded)}
                className="py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded flex items-center transition-colors"
              >
                <FaTicketAlt className="mr-2" />
                {expanded ? 'Ocultar QR' : 'Mostrar QR'}
              </button>
              
              <button className="py-2 px-4 bg-primary/20 hover:bg-primary/30 text-primary rounded flex items-center transition-colors">
                <FaDownload className="mr-2" />
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* QR Code expandido */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: expanded ? 'auto' : 0,
          opacity: expanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-black/30"
      >
        <div className="p-6 flex flex-col items-center">
          <div className="p-4 bg-white rounded-lg mb-4">
            <QRCodeSVG 
              value={ticketLink}
              size={180}
              level="H"
            />
          </div>
          <p className="text-sm text-light/80 max-w-md text-center">
            Este é o seu ingresso oficial. Apresente o QR code na entrada do evento para validação.
            Não compartilhe esta imagem com ninguém.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemberArea;