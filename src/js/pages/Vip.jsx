import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGlassMartini, FaUsers, FaStar, FaCheckCircle } from 'react-icons/fa';
import { MdDiamond } from 'react-icons/md';
import { BsMusicNoteBeamed } from 'react-icons/bs';

// Animações
const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Dados dos pacotes VIP
const vipPackages = [
  {
    id: 'premium',
    name: 'Premium',
    price: 'R$ 2.500',
    description: 'Experiência VIP ideal para grupos pequenos celebrando ocasiões especiais.',
    features: [
      'Mesa premium (até 4 pessoas)',
      '1 garrafa de champanhe',
      'Entrada prioritária sem fila',
      'Menu de drinks exclusivos',
      'Serviço de garçom dedicado'
    ],
    icon: <FaGlassMartini size={28} />,
    popular: false
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 'R$ 5.000',
    description: 'Nossa experiência VIP mais popular com localização privilegiada e serviço exclusivo.',
    features: [
      'Mesa VIP prime (até 6 pessoas)',
      '2 garrafas de champanhe premium',
      'Entrada prioritária sem fila',
      'Menu completo de drinks exclusivos',
      'Serviço de garçom dedicado',
      'Acesso à área Platinum',
      'Transfer privativo (ida e volta)'
    ],
    icon: <MdDiamond size={28} />,
    popular: true
  },
  {
    id: 'black',
    name: 'Black',
    price: 'R$ 12.000',
    description: 'A experiência mais exclusiva da LUXE, com privacidade total e serviço impecável.',
    features: [
      'Lounge privativo (até 10 pessoas)',
      '3 garrafas de champanhe premium',
      '1 garrafa de destilado premium',
      'Entrada exclusiva e privativa',
      'Menu exclusivo personalizado',
      'Mixologista e garçom dedicados',
      'Acesso a todas as áreas do clube',
      'Transfer privativo (ida e volta)',
      'Host pessoal durante toda a noite'
    ],
    icon: <FaStar size={28} />,
    popular: false
  }
];

const Vip = () => {
  const [selectedPackage, setSelectedPackage] = useState('platinum');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '4',
    message: '',
    selectedPackage: 'platinum'
  });
  
  // Abrir modal de reserva
  const openReservationModal = (packageId) => {
    setFormData(prev => ({ ...prev, selectedPackage: packageId }));
    setSelectedPackage(packageId);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Fechar modal de reserva
  const closeReservationModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  // Manipular mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Enviar formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para enviar os dados do formulário para o backend
    console.log('Formulário enviado:', formData);
    // Simulação de envio bem-sucedido
    closeReservationModal();
    // Você poderia adicionar uma notificação de sucesso aqui
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/95 z-10"></div>
          <img 
            src="/assets/images/vip-header.jpg" 
            alt="VIP Experience" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="section-heading"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experiência VIP
            </motion.h1>
            
            <motion.p 
              className="text-xl text-light/80 mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Eleve sua experiência noturna ao máximo com nossos serviços VIP exclusivos.
              Ambientes sofisticados, bebidas premium e atendimento personalizado para
              noites verdadeiramente inesquecíveis.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Benefícios VIP */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-heading text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Benefícios Exclusivos
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <BenefitCard 
              icon={<FaUsers className="text-primary" size={32} />}
              title="Acesso Prioritário"
              description="Entre sem filas por nossa entrada exclusiva. Seus convidados também têm acesso garantido."
            />
            
            <BenefitCard 
              icon={<BsMusicNoteBeamed className="text-primary" size={32} />}
              title="Posicionamento Prime"
              description="Mesas localizadas nas melhores áreas da boate, próximas ao DJ e com vista privilegiada."
            />
            
            <BenefitCard 
              icon={<FaGlassMartini className="text-primary" size={32} />}
              title="Serviço Premium"
              description="Garçons exclusivos, menu de drinks especiais e as melhores marcas de bebidas premium."
            />
          </motion.div>
        </div>
        
        {/* Ornamentos decorativos */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/20 filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-secondary/20 filter blur-3xl"></div>
      </section>
      
      {/* Pacotes VIP */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-heading text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Pacotes VIP
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {vipPackages.map(pkg => (
              <VipPackageCard 
                key={pkg.id} 
                pkg={pkg} 
                selected={selectedPackage === pkg.id}
                onClick={() => openReservationModal(pkg.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Galeria de fotos VIP */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div 
              className="md:w-1/2 space-y-6"
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold mb-6">
                Um Ambiente <span className="text-primary">Incomparável</span>
              </h2>
              
              <p className="text-light/80 text-lg">
                Nosso espaço VIP foi projetado para proporcionar o máximo em conforto e sofisticação. 
                Com uma decoração contemporânea e elegante, oferecemos um ambiente perfeito para 
                celebrações especiais ou simplesmente para desfrutar de uma noite extraordinária.
              </p>
              
              <p className="text-light/80 text-lg">
                Cada detalhe foi pensado para garantir uma experiência sensorial completa, 
                desde a iluminação exclusiva até o sistema de som dedicado.
              </p>
              
              <div className="pt-4">
                <motion.button 
                  className="btn-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openReservationModal('platinum')}
                >
                  Reservar Experiência VIP
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 grid grid-cols-2 gap-4"
              variants={fadeInUp}
            >
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="/assets/images/vip-area1.jpg" 
                  alt="VIP Lounge" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="/assets/images/vip-area2.jpg" 
                  alt="VIP Bar" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="/assets/images/vip-area3.jpg" 
                  alt="VIP Bottles" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="rounded-lg overflow-hidden h-64">
                <img 
                  src="/assets/images/vip-area4.jpg" 
                  alt="VIP Experience" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Depoimentos */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-heading text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            O Que Dizem Nossos Clientes
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <TestimonialCard 
              quote="A experiência VIP na LUXE superou todas as minhas expectativas. O atendimento foi impecável e a noite foi inesquecível."
              author="Ricardo M."
              role="Cliente Platinum"
            />
            
            <TestimonialCard 
              quote="Comemorei meu aniversário no espaço VIP e foi perfeito. Serviço de primeira, bebidas excelentes e o staff muito atencioso."
              author="Camila S."
              role="Cliente Black"
            />
            
            <TestimonialCard 
              quote="Usamos o serviço VIP para receber clientes internacionais e impressioná-los. Missão cumprida, todos adoraram a experiência."
              author="Fernando L."
              role="Cliente Premium"
            />
          </motion.div>
        </div>
      </section>
      
      {/* CTA para Reservas Corporativas */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/90 to-dark/95 z-10"></div>
          <img 
            src="/assets/images/corporate-event.jpg" 
            alt="Corporate Events" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.6 }}
            variants={stagger}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeInUp}
            >
              Eventos <span className="text-primary">Corporativos</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-light/80 mb-8"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Oferecemos pacotes especiais para eventos corporativos, festas de fim de ano 
              e celebrações empresariais. Entre em contato com nossa equipe comercial para 
              desenvolver uma proposta personalizada.
            </motion.p>
            
            <motion.button 
              className="btn-glow text-xl px-8 py-4"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openReservationModal('corporate')}
            >
              Solicitar Proposta
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Modal de Reserva */}
      {isModalOpen && (
        <ReservationModal 
          selectedPackage={vipPackages.find(p => p.id === selectedPackage) || vipPackages[1]} 
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeReservationModal}
        />
      )}
    </>
  );
};

// Componentes auxiliares
const BenefitCard = ({ icon, title, description }) => (
  <motion.div 
    className="glass-panel flex flex-col items-center text-center p-8"
    variants={fadeInUp}
  >
    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-light/70">{description}</p>
  </motion.div>
);

const VipPackageCard = ({ pkg, selected, onClick }) => (
  <motion.div 
    className={`glass-panel relative overflow-hidden transition-all duration-300 ${
      selected ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''
    } ${pkg.popular ? 'transform scale-105 z-10' : ''}`}
    variants={fadeInUp}
    whileHover={{ y: -10 }}
  >
    {pkg.popular && (
      <div className="absolute top-0 right-0">
        <div className="bg-primary text-white text-xs py-1 px-4 font-bold rounded-bl-lg">
          MAIS POPULAR
        </div>
      </div>
    )}
    
    <div className="p-8 flex flex-col h-full">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-4">
          {pkg.icon}
        </div>
        <h3 className="text-2xl font-bold">{pkg.name}</h3>
      </div>
      
      <div className="mb-6">
        <span className="text-3xl font-bold">{pkg.price}</span>
        <span className="text-light/60 ml-2">/ noite</span>
      </div>
      
      <p className="text-light/80 mb-6">
        {pkg.description}
      </p>
      
      <ul className="mb-8 flex-grow">
        {pkg.features.map((feature, index) => (
          <li key={index} className="flex items-start mb-3">
            <FaCheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span className="text-light/80">{feature}</span>
          </li>
        ))}
      </ul>
      
      <motion.button 
        className={`w-full py-3 px-6 rounded-full font-bold transition-all ${
          pkg.popular 
            ? 'bg-gradient-to-r from-primary to-secondary text-white' 
            : 'border-2 border-white/20 hover:border-white/60 bg-transparent text-white'
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        Reservar Agora
      </motion.button>
    </div>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role }) => (
  <motion.div 
    className="glass-panel p-8"
    variants={fadeInUp}
  >
    <div className="mb-6 text-4xl text-primary">❝</div>
    <p className="text-light/80 italic mb-6">{quote}</p>
    <div className="flex items-center">
      <div className="ml-3">
        <p className="font-bold">{author}</p>
        <p className="text-light/60 text-sm">{role}</p>
      </div>
    </div>
  </motion.div>
);

const ReservationModal = ({ selectedPackage, formData, onChange, onSubmit, onClose }) => (
  <motion.div 
    className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 overflow-y-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div 
      className="bg-neutral/90 backdrop-blur-xl rounded-2xl overflow-hidden max-w-2xl w-full"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-bold mb-2">Reservar {selectedPackage.name}</h3>
            <p className="text-light/60">Complete o formulário para solicitar sua reserva VIP</p>
          </div>
          <button 
            onClick={onClose}
            className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Nome Completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">Telefone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                required
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2">Data Desejada *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={onChange}
                required
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label htmlFor="guests" className="block text-sm font-medium mb-2">Número de Convidados *</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={onChange}
                required
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="2">2 pessoas</option>
                <option value="4">4 pessoas</option>
                <option value="6">6 pessoas</option>
                <option value="8">8 pessoas</option>
                <option value="10+">10+ pessoas</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium mb-2">Mensagem Adicional</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={onChange}
                rows="4"
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Informe detalhes adicionais sobre sua reserva, requisitos especiais ou dúvidas..."
              ></textarea>
            </div>
          </div>
          
          <div className="flex justify-end">
            <motion.button 
              type="submit"
              className="btn-glow text-lg px-8 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Enviar Solicitação
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  </motion.div>
);

// Importação necessária para o modal
import { AnimatePresence } from 'framer-motion';

export default Vip;