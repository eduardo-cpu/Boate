import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiZoomInLine } from 'react-icons/ri';

// Animações
const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

// Dados da galeria (simulando dados de uma API)
const galleryData = [
  {
    id: 1,
    title: "Noite de Inauguração",
    category: "Eventos",
    image: "/assets/images/gallery1.jpg",
    date: "Janeiro 2025"
  },
  {
    id: 2,
    title: "DJ Internacional",
    category: "DJs",
    image: "/assets/images/gallery2.jpg",
    date: "Fevereiro 2025"
  },
  {
    id: 3,
    title: "VIP Experience",
    category: "VIP",
    image: "/assets/images/gallery3.jpg",
    date: "Fevereiro 2025"
  },
  {
    id: 4,
    title: "Sunset Sessions",
    category: "Eventos",
    image: "/assets/images/gallery4.jpg",
    date: "Março 2025"
  },
  {
    id: 5,
    title: "Neon Party",
    category: "Festas Temáticas",
    image: "/assets/images/gallery5.jpg",
    date: "Março 2025"
  },
  {
    id: 6,
    title: "Cocktail Masterclass",
    category: "Workshops",
    image: "/assets/images/gallery6.jpg",
    date: "Abril 2025"
  },
  {
    id: 7,
    title: "Live Performance",
    category: "Performances",
    image: "/assets/images/gallery7.jpg",
    date: "Abril 2025"
  },
  {
    id: 8,
    title: "Summer Vibes",
    category: "Festas Temáticas",
    image: "/assets/images/gallery8.jpg",
    date: "Maio 2025"
  },
  {
    id: 9,
    title: "Celebrity Night",
    category: "VIP",
    image: "/assets/images/gallery9.jpg",
    date: "Maio 2025"
  }
];

// Extrair categorias únicas para filtros
const categories = ['Todos', ...new Set(galleryData.map(item => item.category))];

const Gallery = () => {
  const [filter, setFilter] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Filtrar imagens com base na categoria selecionada
  const filteredImages = filter === 'Todos'
    ? galleryData
    : galleryData.filter(item => item.category === filter);
    
  // Abrir modal de visualização de imagem
  const openImageViewer = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  };
  
  // Fechar modal de visualização de imagem
  const closeImageViewer = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Restaurar scroll
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/95 z-10"></div>
          <img 
            src="/assets/images/gallery-header.jpg" 
            alt="Gallery" 
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
              Nossa Galeria
            </motion.h1>
            
            <motion.p 
              className="text-xl text-light/80 mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Capture a essência da LUXE através de nossos momentos mais marcantes. 
              Ambientes exclusivos, performances inesquecíveis e noites memoráveis.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Filtros de categoria */}
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
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Grid de imagens */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            {filteredImages.map(item => (
              <GalleryItem 
                key={item.id} 
                item={item} 
                onClick={() => openImageViewer(item)}
              />
            ))}
          </motion.div>
          
          {filteredImages.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-light/60">
                Não há imagens disponíveis nesta categoria.
              </p>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Visualizador de imagem (modal) */}
      <AnimatePresence>
        {selectedImage && (
          <ImageViewer 
            image={selectedImage} 
            onClose={closeImageViewer}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Componente para cada item da galeria
const GalleryItem = ({ item, onClick }) => {
  return (
    <motion.div 
      className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer"
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {/* Overlay com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
      
      {/* Imagem */}
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Ícone de zoom */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <RiZoomInLine size={24} className="text-white" />
        </div>
      </div>
      
      {/* Informações */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20">
        <span className="bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
          {item.category}
        </span>
        <h3 className="text-xl font-bold mt-2">{item.title}</h3>
        <p className="text-light/70 text-sm">{item.date}</p>
      </div>
    </motion.div>
  );
};

// Componente para o modal de visualização de imagem
const ImageViewer = ({ image, onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={image.image} 
          alt={image.title} 
          className="w-full h-full object-contain"
        />
        
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-2xl font-bold">{image.title}</h3>
          <div className="flex justify-between items-center">
            <p className="text-light/70">
              {image.category} - {image.date}
            </p>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Importação necessária para o modal
import { AnimatePresence } from 'framer-motion';

export default Gallery;