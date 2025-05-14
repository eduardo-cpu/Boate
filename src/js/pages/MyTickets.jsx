import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTicketAlt, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDownload, FaHistory } from 'react-icons/fa';
import { useTickets } from '../contexts/TicketContext';
import { QRCodeSVG } from 'react-qr-code';

const MyTickets = () => {
  const { tickets, purchaseHistory, loading } = useTickets();
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketDetail, setShowTicketDetail] = useState(false);

  const handleDownloadTicket = (ticket) => {
    // Implementação básica - em um app real, isso geraria um PDF
    alert(`Download do ingresso ${ticket.ticketCode} iniciado.`);
  };

  // Formatando data para o formato de exibição
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  // Formatar hora
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('pt-BR', options);
  };

  const openTicketDetail = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketDetail(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark py-20"
    >
      <div className="container mx-auto px-4 pt-12">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Meus Ingressos</h1>
          <p className="text-light/70">Gerencie seus ingressos e veja seu histórico de compras</p>
        </header>

        {/* Tabs de navegação */}
        <div className="flex border-b border-gray-light/20 mb-8">
          <button
            className={`py-4 px-6 font-medium ${
              activeTab === 'tickets'
                ? 'text-primary border-b-2 border-primary'
                : 'text-light/70 hover:text-white'
            }`}
            onClick={() => setActiveTab('tickets')}
          >
            <FaTicketAlt className="inline mr-2" /> Ingressos Ativos
          </button>
          <button
            className={`py-4 px-6 font-medium ${
              activeTab === 'history'
                ? 'text-primary border-b-2 border-primary'
                : 'text-light/70 hover:text-white'
            }`}
            onClick={() => setActiveTab('history')}
          >
            <FaHistory className="inline mr-2" /> Histórico de Compras
          </button>
        </div>

        {/* Conteúdo da Tab de Ingressos */}
        {activeTab === 'tickets' && (
          <>
            {tickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets
                  .filter(ticket => !ticket.used)
                  .map((ticket) => (
                    <div key={ticket.id} className="glass-panel hover:border-primary transition-colors cursor-pointer" onClick={() => openTicketDetail(ticket)}>
                      <div className="h-40 relative overflow-hidden rounded-t-lg">
                        <img
                          src={ticket.eventImage}
                          alt={ticket.eventTitle}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 text-xs bg-primary text-dark rounded-full font-medium">
                            {ticket.ticketType}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-xl mb-2">{ticket.eventTitle}</h3>
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center text-light/70">
                            <FaCalendarAlt className="mr-2 text-primary" size={12} />
                            {ticket.eventDate}
                          </p>
                          <p className="flex items-center text-light/70">
                            <FaClock className="mr-2 text-primary" size={12} />
                            {ticket.eventTime}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-light/20 flex items-center justify-between">
                          <div className="text-sm">
                            <span className="text-light/60">Código: </span>
                            <span className="font-mono font-bold">{ticket.ticketCode}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadTicket(ticket);
                            }}
                            className="text-primary hover:text-primary-light transition-colors"
                          >
                            <FaDownload />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="glass-panel text-center py-16">
                <FaTicketAlt className="text-primary text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhum ingresso encontrado</h3>
                <p className="text-light/70 mb-6">
                  Você ainda não possui ingressos. Explore nossos eventos e adquira seu ingresso!
                </p>
                <a
                  href="/eventos"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary text-dark font-medium py-2 px-6 rounded-lg inline-block"
                >
                  Ver Eventos
                </a>
              </div>
            )}
          </>
        )}

        {/* Conteúdo da Tab de Histórico */}
        {activeTab === 'history' && (
          <>
            {purchaseHistory.length > 0 ? (
              <div className="space-y-6">
                {purchaseHistory.map((purchase) => (
                  <div key={purchase.id} className="glass-panel">
                    <div className="mb-4 pb-4 border-b border-gray-light/20 flex flex-wrap justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg">{`Pedido #${purchase.id}`}</h3>
                        <p className="text-light/70 text-sm">
                          {formatDate(purchase.date)} às {formatTime(purchase.date)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          purchase.status === 'confirmed' ? 'bg-green-900/40 text-green-300' : 
                          purchase.status === 'pending' ? 'bg-yellow-900/40 text-yellow-300' : 
                          'bg-gray-900/40 text-gray-300'
                        }`}>
                          {purchase.status === 'confirmed' ? 'Confirmado' : 
                           purchase.status === 'pending' ? 'Pendente' : 'Cancelado'}
                        </span>
                        <span className="mx-4 text-light/30">|</span>
                        <span className="font-bold text-primary">R$ {purchase.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {purchase.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-grow">
                            <p className="font-medium">{item.eventTitle}</p>
                            <p className="text-sm text-light/70">{item.ticketType} x {item.quantity}</p>
                          </div>
                          <span className="text-light/70">R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-light/20 text-sm text-light/70">
                      <p>Método de pagamento: {purchase.paymentMethod === 'credit' ? 'Cartão de Crédito' : 
                                              purchase.paymentMethod === 'boleto' ? 'Boleto' : 'PIX'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel text-center py-16">
                <FaHistory className="text-primary text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Nenhuma compra encontrada</h3>
                <p className="text-light/70 mb-6">
                  Você ainda não realizou nenhuma compra. Explore nossos eventos!
                </p>
                <a
                  href="/eventos"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary text-dark font-medium py-2 px-6 rounded-lg inline-block"
                >
                  Ver Eventos
                </a>
              </div>
            )}
          </>
        )}

        {/* Modal de detalhes do ingresso */}
        {showTicketDetail && selectedTicket && (
          <div className="fixed inset-0 bg-dark/95 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-dark w-full max-w-lg rounded-xl p-6 shadow-2xl border border-gray-light/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Detalhes do Ingresso</h2>
                <button
                  onClick={() => setShowTicketDetail(false)}
                  className="text-light/70 hover:text-white"
                >
                  &times;
                </button>
              </div>

              <div className="bg-black p-6 rounded-lg mb-6">
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-3 rounded-lg">
                    <QRCodeSVG 
                      value={selectedTicket.qrCode}
                      size={200}
                      level="H"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-light/70 mb-2">Código do Ingresso</p>
                  <p className="font-mono font-bold text-xl">{selectedTicket.ticketCode}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-bold">{selectedTicket.eventTitle}</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-light/70 mb-1">Data</p>
                    <p className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-primary" size={12} />
                      {selectedTicket.eventDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-light/70 mb-1">Horário</p>
                    <p className="flex items-center">
                      <FaClock className="mr-2 text-primary" size={12} />
                      {selectedTicket.eventTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-light/70 mb-1">Local</p>
                    <p className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-primary" size={12} />
                      LUXE Nightclub
                    </p>
                  </div>
                  <div>
                    <p className="text-light/70 mb-1">Tipo</p>
                    <p className="font-medium text-primary">{selectedTicket.ticketType}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => handleDownloadTicket(selectedTicket)}
                  className="bg-gray-light/20 hover:bg-gray-light/30 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
                >
                  <FaDownload className="mr-2" /> Baixar Ingresso
                </button>
                <button
                  onClick={() => setShowTicketDetail(false)}
                  className="bg-primary hover:bg-primary-light text-dark font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyTickets;