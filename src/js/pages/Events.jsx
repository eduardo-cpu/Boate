import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaRegClock, FaTag } from 'react-icons/fa';

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

// Dados dos eventos (simulando dados de uma API)
const eventData = [
  {
    id: 1,
    title: "Neon Dreams",
    date: "12 Mai, 2025",
    time: "22:00 - 05:00",
    dj: "DJ Phoenix",
    category: "Eletrônica",
    description: "Uma jornada visual e sonora pelo melhor da música eletrônica atual, com efeitos visuais de última geração e uma experiência sensorial completa.",
    image: "/assets/images/event1.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Deep House Sessions",
    date: "19 Mai, 2025",
    time: "22:00 - 05:00",
    dj: "Anna & Rodriguez",
    category: "House",
    description: "A dupla internacional Anna & Rodriguez traz sua aclamada performance para uma noite exclusiva de deep house, com sets envolventes e atmosfera única.",
    image: "/assets/images/event2.jpg",
    featured: true
  },
  {
    id: 3,
    title: "Retro Future",
    date: "26 Mai, 2025",
    time: "22:00 - 05:00",
    dj: "DJ Synthwave",
    category: "Retrô",
    description: "Uma celebração do futuro imaginado no passado, com o melhor do synthwave, retrowave e música dos anos 80 em uma atmosfera neon e futurista.",
    image: "/assets/images/event3.jpg",
    featured: true
  },
  {
    id: 4,
    title: "Hip Hop Elite",
    date: "02 Jun, 2025",
    time: "23:00 - 04:00",
    dj: "MC Dynamite & DJ Scratch",
    category: "Hip Hop",
    description: "Os maiores sucessos do hip hop atual e clássicos que marcaram gerações em uma noite dedicada aos amantes do estilo.",
    image: "/assets/images/event4.jpg",
    featured: false
  },
  {
    id: 5,
    title: "Tropical Vibes",
    date: "09 Jun, 2025",
    time: "22:00 - 04:00",
    dj: "DJ Palmtree",
    category: "Tropical House",
    description: "Ritmos tropicais e melodias envolventes em uma noite que vai te transportar para praias paradisíacas.",
    image: "/assets/images/event5.jpg",
    featured: false
  },
  {
    id: 6,
    title: "Techno Revolution",
    date: "16 Jun, 2025",
    time: "23:30 - 06:00",
    dj: "Techno Collective",
    category: "Techno",
    description: "Uma imersão completa no universo do techno, com line-up internacional e produção audiovisual de ponta.",
    image: "/assets/images/event6.jpg",
    featured: false
  }
];

const Events = () => {
  const [filter, setFilter] = useState('all');
  const categories = ['all', 'Eletrônica', 'House', 'Retrô', 'Hip Hop', 'Tropical House', 'Techno'];
  
  const filteredEvents = filter === 'all' 
    ? eventData 
    : eventData.filter(event => event.category === filter);
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/95 z-10"></div>
          <img 
            src="/assets/images/events-header.jpg" 
            alt="Events" 
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
              Próximos Eventos
            </motion.h1>
            
            <motion.p 
              className="text-xl text-light/80 mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Descubra as próximas experiências musicais, performances ao vivo e noites temáticas 
              que acontecerão na LUXE. Reserve com antecedência para garantir sua entrada.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Filtro de categorias */}
      <section className="py-8 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
                onClick={() => setFilter(category)}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {category === 'all' ? 'Todos' : category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Lista de eventos */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
          
          {filteredEvents.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-light/60">
                Não há eventos disponíveis nesta categoria no momento.
              </p>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* CTA - Sugestão de Evento */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={fadeInUp}
            >
              Tem uma <span className="text-primary">sugestão de evento</span>?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-light/80 mb-8"
              variants={fadeInUp}
            >
              Adoraríamos ouvir suas ideias para eventos futuros. 
              Conte-nos o que você gostaria de ver na LUXE.
            </motion.p>
            
            <motion.button 
              className="btn-glow"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Enviar Sugestão
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// Componente de card de evento
const EventCard = ({ event }) => {
  return (
    <motion.div 
      className="glass-panel overflow-hidden flex flex-col md:flex-row"
      variants={fadeInUp}
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(255, 0, 204, 0.4)' }}
    >
      <div className="md:w-2/5 h-60 md:h-auto relative overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {event.featured && (
          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
            Destaque
          </div>
        )}
      </div>
      
      <div className="p-6 md:w-3/5 flex flex-col">
        <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
        
        <div className="mb-4">
          <span className="inline-flex items-center text-sm text-light/70 mr-4">
            <FaCalendarAlt className="mr-2 text-primary" size={14} />
            {event.date}
          </span>
          <span className="inline-flex items-center text-sm text-light/70">
            <FaRegClock className="mr-2 text-primary" size={14} />
            {event.time}
          </span>
        </div>
        
        <div className="mb-4 flex items-center">
          <span className="inline-flex items-center text-sm bg-white/10 px-3 py-1 rounded-full">
            <FaTag className="mr-2 text-secondary" size={12} />
            {event.category}
          </span>
        </div>
        
        <p className="text-light/70 mb-6">{event.description}</p>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="font-medium">
            {event.dj}
          </span>
          
          <motion.button 
            className="btn-glow text-sm py-2 px-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Reservar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Events;