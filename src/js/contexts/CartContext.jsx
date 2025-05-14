import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do Context
const CartContext = createContext();

// Hook personalizado para usar o context
export const useCart = () => useContext(CartContext);

// Provider Component
export const CartProvider = ({ children }) => {
  // Estado do carrinho
  const [cart, setCart] = useState([]);
  
  // Carregar o carrinho do localStorage quando o componente for montado
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('luxeCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error);
      // Em caso de erro, iniciar com um carrinho vazio
      setCart([]);
    }
  }, []);
  
  // Salvar o carrinho no localStorage sempre que ele for atualizado
  useEffect(() => {
    try {
      localStorage.setItem('luxeCart', JSON.stringify(cart));
    } catch (error) {
      console.error("Erro ao salvar o carrinho:", error);
    }
  }, [cart]);
  
  // Adicionar um item ao carrinho
  const addToCart = (item) => {
    // Verificar se o item já existe no carrinho
    const existingItemIndex = cart.findIndex(
      cartItem => cartItem.eventId === item.eventId && cartItem.ticketType === item.ticketType
    );
    
    if (existingItemIndex >= 0) {
      // Se o item já existe, atualize a quantidade
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCart(updatedCart);
    } else {
      // Se o item não existe, adicione-o ao carrinho
      setCart([...cart, { ...item, id: `${item.eventId}-${item.ticketType}-${Date.now()}` }]);
    }
  };
  
  // Remover um item do carrinho
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  // Atualizar a quantidade de um item
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };
  
  // Limpar o carrinho
  const clearCart = () => {
    setCart([]);
  };
  
  // Calcular o total do carrinho
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Contar o número de itens no carrinho
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  // Valor a ser fornecido pelo Context
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotal,
    itemCount
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;