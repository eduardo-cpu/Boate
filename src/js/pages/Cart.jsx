import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrash, FaTicketAlt, FaPlus, FaMinus, FaArrowLeft, FaLock } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);
  
  // Valores para o checkout
  const serviceFee = cartItems.length > 0 ? 15 : 0;
  const finalTotal = total + serviceFee - discount;
  
  const handleQuantityChange = (ticketId, eventId, quantity) => {
    updateQuantity(ticketId, eventId, quantity);
  };
  
  const handleRemove = (ticketId, eventId) => {
    removeFromCart(ticketId, eventId);
  };
  
  const handleCouponApply = () => {
    setCouponError('');
    
    // Códigos de cupom simulados
    const validCoupons = {
      'WELCOME10': { type: 'percentage', value: 10 },
      'SUMMER20': { type: 'percentage', value: 20 },
      'LUXE50': { type: 'fixed', value: 50 }
    };
    
    const coupon = validCoupons[couponCode.trim().toUpperCase()];
    
    if (!coupon) {
      setCouponError('Cupom inválido');
      return;
    }
    
    // Calcular o desconto
    let discountValue = 0;
    if (coupon.type === 'percentage') {
      discountValue = (total * coupon.value) / 100;
    } else {
      discountValue = Math.min(coupon.value, total); // O desconto fixo não pode ser maior que o total
    }
    
    setDiscount(discountValue);
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: '/carrinho' } });
      return;
    }
    
    navigate('/checkout');
  };
  
  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-dark pt-32 pb-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="p-6 rounded-full bg-dark inline-flex items-center justify-center mb-6">
                <FaTicketAlt className="text-primary text-5xl" />
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Seu carrinho está vazio</h1>
              <p className="text-light/70 text-lg mb-8">
                Você não tem nenhum ingresso no seu carrinho. Navegue pelos nossos eventos e escolha algo que combine com você!
              </p>
            </div>
            
            <Link 
              to="/eventos" 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary text-dark font-medium py-3 px-8 rounded-lg inline-flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Ver Eventos
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark pt-32 pb-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Seu Carrinho</h1>
            <p className="text-light/70">Revise seus itens antes de prosseguir para o pagamento</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna principal - Itens do carrinho */}
            <div className="lg:col-span-2">
              <div className="glass-panel mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Itens</h2>
                  <button 
                    onClick={() => clearCart()}
                    className="text-sm text-light/60 hover:text-primary transition-colors flex items-center"
                  >
                    <FaTrash className="mr-1" />
                    Limpar carrinho
                  </button>
                </div>
                
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div 
                      key={`${item.eventId}-${item.id}`}
                      className={`flex flex-col md:flex-row items-start md:items-center gap-4 ${
                        index < cartItems.length - 1 ? 'pb-6 border-b border-gray-light/20' : ''
                      }`}
                    >
                      <div className="w-full md:w-24 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.eventImage} 
                          alt={item.eventTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg">{item.eventTitle}</h3>
                        <p className="text-sm text-light/70 mb-1">{item.name}</p>
                        <p className="text-xs text-light/60">{item.eventDate}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.eventId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-dark hover:bg-gray-light/20 rounded-full text-white transition-colors"
                        >
                          <FaMinus size={12} />
                        </button>
                        
                        <span className="w-6 text-center">{item.quantity}</span>
                        
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.eventId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-dark hover:bg-gray-light/20 rounded-full text-white transition-colors"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="font-bold text-primary">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                        
                        <button 
                          onClick={() => handleRemove(item.id, item.eventId)}
                          className="text-light/40 hover:text-red-500 transition-colors"
                          aria-label="Remover item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap justify-between items-center gap-4">
                <Link 
                  to="/eventos" 
                  className="inline-flex items-center text-white hover:text-primary transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Continuar comprando
                </Link>
              </div>
            </div>
            
            {/* Coluna do resumo do carrinho */}
            <div className="lg:col-span-1">
              <div className="glass-panel sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Resumo do Pedido</h2>
                
                {/* Cupom */}
                <div className="mb-6 pb-6 border-b border-gray-light/20">
                  <div className="flex">
                    <input 
                      type="text" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Código de cupom" 
                      className="flex-grow bg-dark border border-gray-light/20 rounded-l-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                    />
                    <button 
                      onClick={handleCouponApply}
                      className="bg-primary hover:bg-primary-light text-dark font-medium px-4 rounded-r-lg transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  
                  {couponError && (
                    <p className="mt-2 text-red-500 text-sm">{couponError}</p>
                  )}
                  
                  {discount > 0 && (
                    <p className="mt-2 text-green-500 text-sm">
                      Desconto de R$ {discount.toFixed(2)} aplicado!
                    </p>
                  )}
                </div>
                
                {/* Resumo dos valores */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-light/20">
                  <div className="flex justify-between">
                    <span className="text-light/70">Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-light/70">Taxa de serviço</span>
                    <span>R$ {serviceFee.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Desconto</span>
                      <span>-R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                {/* Total */}
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {finalTotal.toFixed(2)}
                  </span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary text-dark font-medium rounded-lg flex items-center justify-center gap-2"
                >
                  <FaLock size={14} />
                  Finalizar Compra
                </button>
                
                <div className="mt-4 flex items-center justify-center text-sm text-light/50">
                  <img 
                    src="/assets/images/payment-methods.png" 
                    alt="Métodos de pagamento" 
                    className="h-6" 
                  />
                  <span className="ml-2">Pagamento seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;