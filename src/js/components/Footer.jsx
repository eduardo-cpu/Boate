import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTiktok, FaSpotify } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black/80 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo e descrição */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                LUXE
              </span>
            </h2>
            <p className="text-light/70 mb-6">
              A experiência definitiva em clubes noturnos. Ambiente sofisticado, 
              música de alta qualidade e serviço premium para noites inesquecíveis.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<FaInstagram />} href="https://instagram.com" />
              <SocialIcon icon={<FaFacebook />} href="https://facebook.com" />
              <SocialIcon icon={<FaTiktok />} href="https://tiktok.com" />
              <SocialIcon icon={<FaSpotify />} href="https://spotify.com" />
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-light">Links Rápidos</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Início</FooterLink>
              <FooterLink to="/eventos">Eventos</FooterLink>
              <FooterLink to="/galeria">Galeria</FooterLink>
              <FooterLink to="/vip">Experiência VIP</FooterLink>
              <FooterLink to="/contato">Contato</FooterLink>
            </ul>
          </div>

          {/* Horários e contato */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-light">Horários & Contato</h3>
            <p className="text-light/70 mb-2">Quinta a Sábado: 22h - 5h</p>
            <p className="text-light/70 mb-4">Domingos: Fechado (exceto eventos especiais)</p>
            <p className="text-light/70 mb-2">contato@luxenightclub.com</p>
            <p className="text-light/70">+55 (11) 99999-8888</p>
          </div>
        </div>

        {/* Direitos autorais */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-light/50">
          <p>© {year} LUXE Nightclub. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/termos" className="hover:text-primary transition">Termos de Uso</Link>
            <Link to="/privacidade" className="hover:text-primary transition">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Componentes auxiliares
const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center 
               hover:bg-gradient-to-r from-primary to-secondary transition-all duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-light/70 hover:text-light transition-colors duration-300 
                hover:translate-x-1 inline-block"
    >
      {children}
    </Link>
  </li>
);

export default Footer;