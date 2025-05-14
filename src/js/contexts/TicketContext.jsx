import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Criar contexto
const TicketContext = createContext();

// Hook personalizado para usar o contexto
export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  // Carregar ingressos do localStorage quando o componente for montado
  useEffect(() => {
    if (isAuthenticated()) {
      loadTickets();
    } else {
      setTickets([]);
      setPurchaseHistory([]);
      setLoading(false);
    }
  }, [isAuthenticated()]);

  const loadTickets = () => {
    setLoading(true);
    try {
      // Em um sistema real, isso viria da API
      // Por enquanto, usamos localStorage
      const userId = user?.email || "anonymous";
      const storedTickets = localStorage.getItem(`luxeTickets_${userId}`);
      const storedHistory = localStorage.getItem(`luxePurchases_${userId}`);
      
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
      
      if (storedHistory) {
        setPurchaseHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Erro ao carregar ingressos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Salvar ingressos no localStorage
  const saveTickets = (newTickets) => {
    try {
      const userId = user?.email || "anonymous";
      localStorage.setItem(`luxeTickets_${userId}`, JSON.stringify(newTickets));
      setTickets(newTickets);
    } catch (error) {
      console.error('Erro ao salvar ingressos:', error);
    }
  };

  // Salvar histórico de compras
  const savePurchaseHistory = (newHistory) => {
    try {
      const userId = user?.email || "anonymous";
      localStorage.setItem(`luxePurchases_${userId}`, JSON.stringify(newHistory));
      setPurchaseHistory(newHistory);
    } catch (error) {
      console.error('Erro ao salvar histórico de compras:', error);
    }
  };

  // Adicionar novos ingressos após compra
  const addTickets = (purchaseItems, orderId, purchaseDetails) => {
    if (!isAuthenticated()) return;

    // Criar novos ingressos a partir dos itens do pedido
    const newTickets = purchaseItems.flatMap(item => {
      // Para cada item, criar N ingressos conforme a quantidade
      return Array(item.quantity).fill().map((_, index) => ({
        id: `${orderId}-${item.eventId}-${index}`,
        ticketCode: generateTicketCode(),
        eventId: item.eventId,
        eventTitle: item.eventTitle,
        eventDate: item.eventDate,
        eventTime: item.eventTime,
        eventImage: item.eventImage,
        ticketType: item.ticketType,
        price: item.price,
        purchaseDate: new Date().toISOString(),
        orderId: orderId,
        used: false,
        qrCode: generateQRData(`${orderId}-${item.eventId}-${index}`),
      }));
    });

    // Adicionar ao histórico de compras
    const purchase = {
      id: orderId,
      date: new Date().toISOString(),
      items: purchaseItems,
      total: purchaseItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      paymentMethod: purchaseDetails.paymentMethod,
      status: 'confirmed'
    };

    // Atualizar ingressos e histórico
    saveTickets([...tickets, ...newTickets]);
    savePurchaseHistory([...purchaseHistory, purchase]);
    
    return { tickets: newTickets, purchase };
  };

  // Marcar ingresso como utilizado
  const markTicketAsUsed = (ticketId) => {
    if (!isAuthenticated()) return;

    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, used: true } : ticket
    );
    
    saveTickets(updatedTickets);
    return updatedTickets.find(ticket => ticket.id === ticketId);
  };

  // Gerar código alfanumérico único para o ingresso
  const generateTicketCode = () => {
    return 'LUXE' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Gerar dados para o QR Code (em um sistema real, isso seria um token seguro)
  const generateQRData = (ticketId) => {
    return `https://luxe.com/validate/${ticketId}/${Math.random().toString(36).substring(2, 15)}`;
  };

  // Valor a ser fornecido pelo context
  const contextValue = {
    tickets,
    purchaseHistory,
    loading,
    addTickets,
    markTicketAsUsed
  };

  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketContext;