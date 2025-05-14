import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaRegClock, FaMapMarkerAlt, FaUser, FaTag, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';

// Dados dos eventos (simulando dados de uma API)
const eventData = [
  {
    id: 1,
    title: "Neon Dreams",
    date: "12 Mai, 2025",
    time: "22:00 - 05:00",
    dj: "DJ Phoenix",
    location: "LUXE Main Hall",
    category: "Eletrônica",
    description: "Uma jornada visual e sonora pelo melhor da música eletrônica atual, com efeitos visuais de última geração e uma experiência sensorial completa.",
    fullDescription: "Prepare-se para a experiência definitiva de música eletrônica na LUXE. Neon Dreams é um evento que combina o melhor da música eletrônica atual com uma produção visual deslumbrante. DJ Phoenix, conhecido mundialmente por seus sets energéticos e suas transições impecáveis, comandará a noite com uma seleção musical que vai do Progressive House ao Melodic Techno.\n\nA estrutura do evento contará com sistemas de iluminação de última geração, telões LED de alta definição e um sistema de som surround que proporcionará uma experiência sonora imersiva.\n\nVenha fazer parte desta jornada sensorial única e se perder na música em uma noite que promete ficar na memória.",
    image: "/assets/images/event1.jpg",
    gallery: [
      "/assets/images/gallery1.jpg",
      "/assets/images/gallery2.jpg",
      "/assets/images/gallery3.jpg"
    ],
    ticketTypes: [
      {
        name: "Early Bird",
        price: 80,
        description: "Acesso padrão ao evento com entrada antecipada. Lote promocional limitado.",
        available: true
      },
      {
        name: "Standard",
        price: 100,
        description: "Acesso padrão ao evento incluindo todas as áreas comuns.",
        available: true
      },
      {
        name: "VIP",
        price: 150,
        description: "Acesso a área VIP com bar exclusivo e vista privilegiada.",
        available: true
      },
      {
        name: "LUXE Experience",
        price: 250,
        description: "Experiência premium com acesso a todas as áreas, incluindo backstage e meet & greet com o DJ.",
        available: false
      }
    ],
    featured: true
  },
  {
    id: 2,
    title: "Deep House Sessions",
    date: "19 Mai, 2025",
    time: "22:00 - 05:00",
    dj: "Anna & Rodriguez",
    location: "LUXE Terrace",
    category: "House",
    description: "A dupla internacional Anna & Rodriguez traz sua aclamada performance para uma noite exclusiva de deep house, com sets envolventes e atmosfera única.",
    fullDescription: "Uma noite inesquecível de Deep House está chegando à LUXE com a renomada dupla internacional Anna & Rodriguez. Conhecidos por criar atmosferas musicais únicas e envolventes, a dupla promete uma viagem sonora pelas vertentes mais hipnotizantes do Deep House.\n\nA LUXE Terrace será transformada em um oásis musical, combinando a energia da música com o ambiente ao ar livre sob as estrelas. Os DJs vão apresentar seus novos trabalhos, incluindo remixes exclusivos e colaborações inéditas.\n\nNão perca a chance de vivenciar esta experiência sensorial única, onde a música, o ambiente e a energia do público se unem para criar momentos inesquecíveis.",
    image: "/assets/images/event2.jpg",
    gallery: [
      "/assets/images/gallery4.jpg",
      "/assets/images/gallery5.jpg",
      "/assets/images/gallery6.jpg"
    ],
    ticketTypes: [
      {
        name: "Early Bird",
        price: 70,
        description: "Acesso padrão ao evento com entrada antecipada. Lote promocional limitado.",
        available: false
      },
      {
        name: "Standard",
        price: 90,
        description: "Acesso padrão ao evento incluindo todas as áreas comuns.",
        available: true
      },
      {
        name: "VIP",
        price: 140,
        description: "Acesso a área VIP com bar exclusivo e vista privilegiada.",
        available: true
      }
    ],
    featured: true
  },
  {
    id: 3,
    title: "Retro Future",
    date: "26 Mai, 2025",
    time: "22:00 - 05:00",
    dj: "DJ Synthwave",
    location: "LUXE Main Hall",
    category: "Retrô",
    description: "Uma celebração do futuro imaginado no passado, com o melhor do synthwave, retrowave e música dos anos 80 em uma atmosfera neon e futurista.",
    fullDescription: "Retro Future é uma viagem no tempo para o futuro que foi imaginado nos anos 80 e 90. Uma noite dedicada ao Synthwave, Retrowave e às músicas que definiram uma era de criatividade e inovação.\n\nDJ Synthwave, reconhecido por seu talento em misturar clássicos do passado com produções modernas que capturam a essência da nostalgia futurista, comandará a noite com uma seleção musical cuidadosamente elaborada.\n\nA decoração da LUXE Main Hall será completamente transformada com elementos estéticos cyberpunk, neon, e referências à cultura pop dos anos 80. Telões exibirão visuais inspirados em clássicos da ficção científica e videogames retro.\n\nVista suas melhores roupas inspiradas nos anos 80 e venha fazer parte desta celebração única onde passado e futuro se encontram na pista de dança.",
    image: "/assets/images/event3.jpg",
    gallery: [
      "/assets/images/gallery7.jpg",
      "/assets/images/gallery8.jpg",
      "/assets/images/gallery9.jpg"
    ],
    ticketTypes: [
      {
        name: "Standard",
        price: 85,
        description: "Acesso padrão ao evento incluindo todas as áreas comuns.",
        available: true
      },
      {
        name: "VIP",
        price: 130,
        description: "Acesso a área VIP com bar exclusivo e vista privilegiada.",
        available: true
      },
      {
        name: "Retro Package",
        price: 180,
        description: "Ingresso VIP + kit com itens exclusivos temáticos dos anos 80.",
        available: true
      }
    ],
    featured: true
  },
  {
    id: 4,
    title: "Hip Hop Elite",
    date: "02 Jun, 2025",
    time: "23:00 - 04:00",
    dj: "MC Dynamite & DJ Scratch",
    location: "LUXE Main Hall",
    category: "Hip Hop",
    description: "Os maiores sucessos do hip hop atual e clássicos que marcaram gerações em uma noite dedicada aos amantes do estilo.",
    fullDescription: "Hip Hop Elite traz para a LUXE uma celebração autêntica da cultura Hip Hop em todos os seus elementos. Uma noite com os maiores clássicos e hits atuais comandada por MC Dynamite e DJ Scratch, dois veteranos da cena que conhecem como poucos a arte de manter a pista pulsando.\n\nAlém da música, o evento contará com performances de break dance e uma exposição de graffiti de artistas locais, mostrando o Hip Hop como a expressão cultural completa que é.\n\nO sistema de som da LUXE foi especialmente ajustado para esta noite, garantindo que os graves potentes e as batidas características do Hip Hop sejam sentidos em toda a sua intensidade.\n\nVista seu melhor streetwear e venha celebrar esta cultura vibrante que continua a influenciar gerações.",
    image: "/assets/images/event4.jpg",
    gallery: [
      "/assets/images/gallery10.jpg",
      "/assets/images/gallery11.jpg",
      "/assets/images/gallery12.jpg"
    ],
    ticketTypes: [
      {
        name: "Standard",
        price: 80,
        description: "Acesso padrão ao evento incluindo todas as áreas comuns.",
        available: true
      },
      {
        name: "VIP",
        price: 120,
        description: "Acesso a área VIP com bar exclusivo e vista privilegiada.",
        available: true
      }
    ],
    featured: false
  },
  {
    id: 5,
    title: "Tropical Vibes",
    date: "09 Jun, 2025",
    time: "22:00 - 04:00",
    dj: "DJ Palmtree",
    location: "LUXE Terrace",
    category: "Tropical House",
    description: "Ritmos tropicais e melodias envolventes em uma noite que vai te transportar para praias paradisíacas.",
    fullDescription: "Tropical Vibes transforma a LUXE Terrace em uma praia paradisíaca com o melhor do Tropical House. DJ Palmtree, conhecido por suas produções que mesclam elementos eletrônicos com instrumentos acústicos e ritmos quentes, promete uma noite que vai fazer todos se sentirem em uma ilha tropical.\n\nA decoração incluirá elementos de praia, palmeiras, luzes amarradas e projeções de paisagens paradisíacas. Barmen especializados servirão coquetéis exóticos exclusivos para o evento.\n\nA atmosfera relaxante ao ar livre, combinada com as batidas suaves e melodias envolventes do Tropical House, criará um ambiente perfeito para uma experiência musical única.\n\nVista roupas leves e prepare-se para uma noite de sensações tropicais em plena cidade.",
    image: "/assets/images/event5.jpg",
    gallery: [
      "/assets/images/gallery13.jpg",
      "/assets/images/gallery14.jpg",
      "/assets/images/gallery15.jpg"
    ],
    ticketTypes: [
      {
        name: "Standard",
        price: 75,
        description: "Acesso padrão ao evento incluindo todas as áreas comuns.",
        available: true
      },
      {
        name: "VIP Cabana",
        price: 200,
        description: "Acesso exclusivo às cabanas da área VIP com serviço de mesa dedicado. Preço por pessoa, mínimo 4 pessoas.",
        available: true
      }
    ],
    featured: false
  },
  {
    id: 6,
    title: "Techno Revolution",
    date: "16 Jun, 2025",
    time: "23:30 - 06:00",
    dj: "Techno Collective",
    location: "LUXE Underground",
    category: "Techno",
    description: "Uma imersão completa no universo do techno, com line-up internacional e produção audiovisual de ponta.",
    fullDescription: "Techno Revolution é um evento dedicado aos amantes do techno puro e imersivo. O Techno Collective, grupo formado por DJs e produtores internacionais de renome no cenário underground, assumirá o controle da LUXE Underground para uma noite de techno industrial, minimal e experimental.\n\nA produção contará com um sistema de som surround especialmente calibrado para as frequências do techno, além de uma instalação de luzes sincronizadas que responderão à música em tempo real. A iluminação será minimal e estratégica, criando uma atmosfera hipnótica que complementa o som.\n\nEste evento é para os verdadeiros apreciadores de techno que buscam uma experiência sonora e sensorial profunda, longe dos clichês da música eletrônica comercial.\n\nPrepare-se para uma noite de batidas hipnóticas e deixe-se levar pela experiência coletiva que só o techno pode proporcionar.",
    image: "/assets/images/event6.jpg",
    gallery: [
      "/assets/images/gallery16.jpg",
      "/assets/images/gallery17.jpg",
      "/assets/images/gallery18.jpg"
    ],
    ticketTypes: [
      {
        name: "Standard",
        price: 95,
        description: "Acesso padrão ao evento incluindo todas as áreas comuns.",
        available: true
      },
      {
        name: "Underground Plus",
        price: 140,
        description: "Acesso a área reservada com visão privilegiada e bar express.",
        available: true
      }
    ],
    featured: false
  }
];

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  
  useEffect(() => {
    // Simular carregamento de dados de uma API
    setLoading(true);
    
    // Encontrar o evento pelo ID
    const foundEvent = eventData.find(e => e.id === parseInt(eventId));
    
    // Simular um delay de carregamento
    const timer = setTimeout(() => {
      setEvent(foundEvent);
      // Selecionar o primeiro tipo de ingresso disponível por padrão
      if (foundEvent?.ticketTypes) {
        const firstAvailable = foundEvent.ticketTypes.find(ticket => ticket.available);
        if (firstAvailable) setSelectedTicket(firstAvailable);
      }
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [eventId]);
  
  // Aumenta a quantidade de ingressos
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Diminui a quantidade de ingressos
  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };
  
  // Adiciona ingressos ao carrinho
  const handleAddToCart = () => {
    if (!selectedTicket || !event) return;
    
    const cartItem = {
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventImage: event.image,
      ticketType: selectedTicket.name,
      price: selectedTicket.price,
      quantity: quantity
    };
    
    addToCart(cartItem);
    
    // Reset quantity
    setQuantity(1);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-dark pt-32 pb-20 flex items-center justify-center">
        <div className="spinner-glow"></div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen bg-dark pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="glass-panel text-center p-12">
            <h2 className="text-3xl font-bold mb-4">Evento não encontrado</h2>
            <p className="text-light/70 mb-8">O evento que você está procurando não existe ou foi removido.</p>
            <Link to="/eventos" className="btn-glow">Ver Eventos Disponíveis</Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark pt-24 pb-20"
    >
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/95 z-10"></div>
          <img 
            src={event.image} 
            alt={event.title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/eventos"
              className="inline-flex items-center text-light/60 hover:text-primary mb-6 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Voltar para Eventos
            </Link>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {event.title}
            </motion.h1>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-6 text-sm"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="inline-flex items-center text-light/70">
                <FaCalendarAlt className="mr-2 text-primary" size={14} />
                {event.date}
              </span>
              <span className="inline-flex items-center text-light/70">
                <FaRegClock className="mr-2 text-primary" size={14} />
                {event.time}
              </span>
              <span className="inline-flex items-center text-light/70">
                <FaUser className="mr-2 text-primary" size={14} />
                {event.dj}
              </span>
              <span className="inline-flex items-center text-light/70">
                <FaMapMarkerAlt className="mr-2 text-primary" size={14} />
                {event.location}
              </span>
              <span className="inline-flex items-center bg-white/10 px-3 py-1 rounded-full">
                <FaTag className="mr-2 text-secondary" size={12} />
                {event.category}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Conteúdo Principal */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Coluna da esquerda */}
            <div className="lg:w-2/3">
              <div className="glass-panel mb-8">
                <h2 className="text-2xl font-bold mb-4">Sobre o Evento</h2>
                <div className="prose prose-invert prose-primary max-w-none">
                  {event.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-light/80">{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* Galeria de Imagens */}
              {event.gallery && event.gallery.length > 0 && (
                <div className="glass-panel">
                  <h2 className="text-2xl font-bold mb-4">Galeria</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {event.gallery.map((img, index) => (
                      <button 
                        key={index} 
                        onClick={() => setActiveImage(index)}
                        className="aspect-square overflow-hidden rounded-md hover:opacity-80 transition-opacity relative"
                      >
                        <img 
                          src={img} 
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {activeImage === index && (
                          <div className="absolute inset-0 border-2 border-primary rounded-md"></div>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 aspect-video overflow-hidden rounded-lg">
                    <img 
                      src={event.gallery[activeImage]} 
                      alt={`Gallery featured`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Coluna da direita */}
            <div className="lg:w-1/3">
              <div className="glass-panel sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Comprar Ingressos</h2>
                
                {/* Seleção de tipos de ingressos */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-light/80 mb-2">Tipo de Ingresso</label>
                  <div className="space-y-3">
                    {event.ticketTypes.map((ticket, index) => (
                      <div key={index}>
                        <button
                          onClick={() => ticket.available ? setSelectedTicket(ticket) : null}
                          disabled={!ticket.available}
                          className={`w-full p-4 text-left rounded-lg transition-all ${
                            !ticket.available 
                              ? 'bg-gray-light/5 cursor-not-allowed' 
                              : selectedTicket?.name === ticket.name
                                ? 'bg-primary/20 border border-primary'
                                : 'bg-white/5 hover:bg-white/10 border border-transparent'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-white">
                              {ticket.name}
                            </span>
                            <span className="text-primary font-bold">
                              {`R$ ${ticket.price.toFixed(2)}`}
                            </span>
                          </div>
                          <p className="text-sm text-light/70 mb-1">{ticket.description}</p>
                          {!ticket.available && (
                            <span className="text-xs bg-red-900/40 text-red-300 py-1 px-2 rounded inline-block mt-1">
                              Esgotado
                            </span>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Quantidade de ingressos */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-light/80 mb-2">Quantidade</label>
                  <div className="flex bg-white/5 rounded-lg w-32">
                    <button
                      onClick={decreaseQuantity}
                      className="w-10 h-10 flex items-center justify-center text-light/60 hover:text-white transition-colors"
                      disabled={quantity <= 1}
                    >
                      <FaMinus size={12} />
                    </button>
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-white font-medium">{quantity}</span>
                    </div>
                    <button
                      onClick={increaseQuantity}
                      className="w-10 h-10 flex items-center justify-center text-light/60 hover:text-white transition-colors"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
                
                {/* Total */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-light/80">Preço por ingresso:</span>
                    <span className="font-medium">R$ {selectedTicket?.price.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-light/80">Quantidade:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <div className="h-px bg-white/10 my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-xl">R$ {((selectedTicket?.price || 0) * quantity).toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Botões de ação */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedTicket?.available}
                    className="btn-glow flex-grow flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart size={16} />
                    Adicionar ao Carrinho
                  </button>
                </div>
                
                <p className="text-xs text-light/50 mt-4 text-center">
                  Ao adquirir ingressos, você concorda com nossos termos e condições.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Outros eventos recomendados */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Você também pode gostar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventData
              .filter(e => e.id !== event.id && e.category === event.category)
              .slice(0, 3)
              .map(relatedEvent => (
                <Link 
                  key={relatedEvent.id}
                  to={`/eventos/${relatedEvent.id}`}
                  className="glass-panel overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={relatedEvent.image} 
                      alt={relatedEvent.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{relatedEvent.title}</h3>
                    <div className="flex items-center text-xs text-light/70 mb-3">
                      <FaCalendarAlt className="mr-1 text-primary" size={10} />
                      {relatedEvent.date}
                    </div>
                    <p className="text-sm text-light/70 line-clamp-2">{relatedEvent.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default EventDetail;