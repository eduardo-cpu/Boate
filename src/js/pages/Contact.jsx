import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simular envio do formulário com sucesso
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.'
    });
    
    // Limpar formulário após envio bem-sucedido
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Resetar status após 5 segundos
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/95 z-10"></div>
          <img 
            src="/assets/images/contact-header.jpg" 
            alt="Contato" 
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
              Entre em Contato
            </motion.h1>
            
            <motion.p 
              className="text-xl text-light/80 mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Estamos prontos para ajudar com qualquer dúvida sobre eventos,
              reservas ou informações gerais. Nossa equipe está à disposição.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Informações de contato e formulário */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col lg:flex-row gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {/* Informações de contato */}
            <motion.div 
              className="lg:w-1/3"
              variants={fadeInUp}
            >
              <div className="glass-panel p-8">
                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                
                <ul className="space-y-6">
                  <ContactItem 
                    icon={<FaMapMarkerAlt />}
                    title="Endereço"
                    content={(
                      <>
                        <p>Av. Paulista, 1000</p>
                        <p>Bela Vista, São Paulo - SP</p>
                        <p>CEP: 01310-100</p>
                      </>
                    )}
                  />
                  
                  <ContactItem 
                    icon={<FaPhone />}
                    title="Telefone"
                    content={(
                      <>
                        <p>+55 (11) 99999-8888</p>
                        <p>+55 (11) 3333-4444</p>
                      </>
                    )}
                  />
                  
                  <ContactItem 
                    icon={<FaEnvelope />}
                    title="Email"
                    content={(
                      <>
                        <p>contato@luxenightclub.com</p>
                        <p>eventos@luxenightclub.com</p>
                      </>
                    )}
                  />
                  
                  <ContactItem 
                    icon={<FaClock />}
                    title="Horário de Funcionamento"
                    content={(
                      <>
                        <p>Quinta a Sábado: 22h - 5h</p>
                        <p>Domingos: Fechado (exceto eventos especiais)</p>
                      </>
                    )}
                  />
                </ul>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-xl font-bold mb-4">Siga-nos</h3>
                  <div className="flex space-x-4">
                    <SocialLink href="https://instagram.com" icon={<FaInstagram size={18} />} />
                    <SocialLink href="https://facebook.com" icon={<FaFacebook size={18} />} />
                    <SocialLink href="https://tiktok.com" icon={<FaTiktok size={18} />} />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Formulário de contato */}
            <motion.div 
              className="lg:w-2/3"
              variants={fadeInUp}
            >
              <div className="glass-panel p-8">
                <h2 className="text-2xl font-bold mb-6">Envie-nos uma mensagem</h2>
                
                {formStatus.submitted && (
                  <div className={`mb-6 p-4 rounded-lg ${formStatus.success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {formStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">Telefone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">Assunto *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="Reservas">Reservas</option>
                        <option value="Eventos">Informações sobre eventos</option>
                        <option value="VIP">Experiência VIP</option>
                        <option value="Eventos Corporativos">Eventos Corporativos</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Sua Mensagem *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      required
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="Como podemos ajudar?"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.button 
                      type="submit"
                      className="btn-glow text-lg px-8 py-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Enviar Mensagem
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Mapa da localização */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="section-heading text-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Nossa Localização
          </motion.h2>
          
          <motion.div 
            className="rounded-lg overflow-hidden h-96"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Aqui você incluiria um mapa interativo, como Google Maps ou Mapbox */}
            {/* Por simplicidade, estou usando apenas uma imagem estática */}
            <div className="relative w-full h-full">
              <img 
                src="/assets/images/map.jpg" 
                alt="Mapa de localização" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center animate-pulse">
                  <FaMapMarkerAlt size={24} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA - Dúvidas Frequentes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="glass-panel p-8 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ainda tem <span className="text-primary">dúvidas</span>?
            </h2>
            
            <p className="text-light/80 text-lg mb-8">
              Consulte nossa página de perguntas frequentes para obter respostas rápidas
              sobre reservas, dress code, eventos e muito mais.
            </p>
            
            <motion.button 
              className="btn-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver Perguntas Frequentes
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// Componentes auxiliares
const ContactItem = ({ icon, title, content }) => (
  <li className="flex">
    <div className="mr-4 text-primary mt-1">
      {icon}
    </div>
    <div>
      <h3 className="font-bold mb-2">{title}</h3>
      <div className="text-light/70 space-y-1">
        {content}
      </div>
    </div>
  </li>
);

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r from-primary to-secondary transition-all duration-300"
  >
    {icon}
  </a>
);

export default Contact;