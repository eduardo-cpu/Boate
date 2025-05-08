import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsCalendarEvent, BsStars } from 'react-icons/bs';
import { FaCocktail, FaHeadphones } from 'react-icons/fa';

// Animações comuns
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

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background video ou imagem */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/40 to-dark/95 z-10"></div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/assets/images/club-poster.jpg"
          >
            <source src="/assets/videos/nightclub-loop.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Conteúdo Hero */}
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 text-glow"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                LUXE
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Uma experiência exclusiva de entretenimento noturno com a melhor música, 
              ambiente sofisticado e serviço de primeira classe.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link to="/eventos">
                <motion.button 
                  className="btn-glow px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Próximos Eventos
                </motion.button>
              </Link>
              <Link to="/vip">
                <motion.button 
                  className="border-2 border-white/20 hover:border-white/60 bg-transparent text-white font-bold py-4 px-8 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Experiência VIP
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 1.5, delay: 1.5, repeat: Infinity }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>
      
      {/* Sobre nós */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 className="section-heading text-center" {...fadeInUp}>
              Experiência Premium
            </motion.h2>
            
            <motion.p 
              className="text-xl text-center text-light/80 mb-12"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Mais do que uma boate, a LUXE é uma experiência sensorial completa. 
              Projetada com os mais altos padrões de qualidade e sofisticação, cada detalhe foi 
              cuidadosamente pensado para proporcionar noites memoráveis.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={stagger}
            >
              <FeatureCard 
                icon={<FaCocktail size={28} />}
                title="Mixologia Exclusiva"
                description="Drinks assinados por mixologistas premiados com ingredientes premium e apresentações inovadoras."
              />
              
              <FeatureCard 
                icon={<FaHeadphones size={28} />}
                title="Som Imersivo"
                description="Sistema de áudio de última geração com qualidade acústica excepcional para uma experiência sonora perfeita."
              />
              
              <FeatureCard 
                icon={<BsCalendarEvent size={28} />}
                title="Eventos Exclusivos"
                description="Programação curada com DJs internacionais e performances ao vivo que não se encontra em nenhum outro lugar."
              />
              
              <FeatureCard 
                icon={<BsStars size={28} />}
                title="Serviço VIP"
                description="Atendimento personalizado, mesas exclusivas e experiências customizadas para uma noite perfeita."
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Ornamento de design */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/20 filter blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-secondary/20 filter blur-3xl"></div>
      </section>
      
      {/* Próximos eventos */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 className="section-heading text-center" {...fadeInUp}>
              Próximos Eventos
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              variants={stagger}
            >
              <EventCard 
                date="12 MAI"
                title="Neon Dreams"
                dj="DJ Phoenix"
                image="/assets/images/event1.jpg"
              />
              
              <EventCard 
                date="19 MAI" 
                title="Deep House Sessions"
                dj="Anna & Rodriguez"
                image="/assets/images/event2.jpg"
              />
              
              <EventCard 
                date="26 MAI" 
                title="Retro Future"
                dj="DJ Synthwave"
                image="/assets/images/event3.jpg"
              />
            </motion.div>
            
            <motion.div 
              className="text-center mt-12"
              variants={fadeInUp}
            >
              <Link to="/eventos">
                <motion.button 
                  className="border-2 border-white/20 hover:border-white/60 bg-transparent text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Todos os Eventos
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action - Reservas */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm z-10"></div>
          <img 
            src="/assets/images/vip-area.jpg" 
            alt="VIP Area" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              variants={fadeInUp}
            >
              Reserve sua experiência <br />
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                premium agora
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-light/80 mb-8"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Garanta sua entrada ou mesa VIP para as próximas noites e eventos especiais. 
              Experiências customizadas disponíveis para grupos e celebrações.
            </motion.p>
            
            <motion.button 
              className="btn-glow text-xl px-8 py-4"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Fazer Reserva
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// Componentes auxiliares
const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    className="glass-panel flex flex-col items-center text-center"
    variants={fadeInUp}
  >
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-light/70">{description}</p>
  </motion.div>
);

const EventCard = ({ date, title, dj, image }) => (
  <motion.div 
    className="group relative overflow-hidden rounded-xl"
    variants={fadeInUp}
    whileHover={{ y: -10 }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent z-10"></div>
    <img 
      src={image} 
      alt={title} 
      className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute bottom-0 left-0 w-full p-6 z-20">
      <span className="bg-primary px-3 py-1 rounded-full text-sm font-bold">
        {date}
      </span>
      <h3 className="text-2xl font-bold mt-4">{title}</h3>
      <p className="text-light/80">{dj}</p>
    </div>
  </motion.div>
);

export default Home;