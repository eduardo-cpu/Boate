import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaCreditCard, FaBarcode, FaQrcode, FaLock } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useTickets } from '../contexts/TicketContext';

const Checkout = () => {
  const { cart, calculateTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addTickets } = useTickets();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    cpf: '',
    saveCard: false,
    // Dados de cobrança/entrega
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Valores para o checkout
  const total = calculateTotal();
  const serviceFee = cart.length > 0 ? 15 : 0;
  const finalTotal = total + serviceFee;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    // Limpar erros quando o campo é alterado
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validações básicas conforme o método de pagamento
    if (paymentMethod === 'credit') {
      if (!formData.cardName) newErrors.cardName = 'Nome no cartão é obrigatório';
      if (!formData.cardNumber) newErrors.cardNumber = 'Número do cartão é obrigatório';
      if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Número de cartão inválido';
      }
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Data de validade é obrigatória';
      if (!formData.cardCVV) newErrors.cardCVV = 'CVV é obrigatório';
      if (formData.cardCVV && !/^\d{3,4}$/.test(formData.cardCVV)) {
        newErrors.cardCVV = 'CVV inválido';
      }
    }
    
    // Validações para dados de contato/entrega
    if (!formData.name) newErrors.name = 'Nome completo é obrigatório';
    if (!formData.email) newErrors.email = 'E-mail é obrigatório';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
    if (formData.cpf && !/^\d{11}$/.test(formData.cpf.replace(/\D/g, ''))) {
      newErrors.cpf = 'CPF inválido';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Você deve concordar com os termos e condições';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulação de processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Gerar um número de pedido aleatório
      const generatedOrderId = `LUXE-${Date.now().toString().substring(6)}-${Math.floor(Math.random() * 1000)}`;
      setOrderId(generatedOrderId);
      
      // Adicionar ingressos ao TicketContext
      addTickets(cart, generatedOrderId, { 
        paymentMethod, 
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      
      // Limpar o carrinho após conclusão bem-sucedida
      clearCart();
      
      // Marcar o pedido como concluído
      setOrderComplete(true);
      
    } catch (error) {
      setErrors({ submit: 'Houve um erro ao processar o pagamento. Por favor, tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !orderComplete) {
    // Redirecionar para a página de eventos se o carrinho estiver vazio
    navigate('/eventos');
    return null;
  }

  // Tela de confirmação de pedido
  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-dark pt-32 pb-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-primary text-4xl" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Pedido Confirmado!</h1>
              
              <p className="text-xl text-light/70 mb-2">
                Seu pedido #{orderId} foi confirmado com sucesso.
              </p>
              
              <p className="text-light/70 mb-8">
                Enviamos um e-mail com os detalhes da sua compra. Você pode acessar seus ingressos na área de membro.
              </p>
            </div>
            
            <div className="glass-panel mb-8 text-left">
              <h2 className="text-xl font-bold mb-4">Resumo da Compra</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-light/20">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.eventTitle}</p>
                      <p className="text-sm text-light/70">{item.ticketType} x {item.quantity}</p>
                    </div>
                    <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg">Total</span>
                <span className="text-xl font-bold text-primary">R$ {finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => navigate('/meus-ingressos')}
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary text-dark font-medium rounded-lg transition-colors"
              >
                Ver Meus Ingressos
              </button>
              
              <button
                onClick={() => navigate('/eventos')}
                className="px-6 py-3 bg-gray-dark hover:bg-gray-light/20 text-white font-medium rounded-lg transition-colors"
              >
                Explorar Eventos
              </button>
            </div>
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
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Finalizar Compra</h1>
            <p className="text-light/70">Complete suas informações para finalizar a compra</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Coluna principal - Formulário */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit}>
                {/* Método de pagamento */}
                <div className="glass-panel mb-8">
                  <h2 className="text-2xl font-bold mb-6">Método de Pagamento</h2>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit')}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
                        paymentMethod === 'credit'
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-light/20 bg-dark hover:bg-gray-dark'
                      }`}
                    >
                      <FaCreditCard className={paymentMethod === 'credit' ? 'text-primary text-xl' : 'text-light/70 text-xl'} />
                      <span className={paymentMethod === 'credit' ? 'text-primary' : 'text-light/70'}>Cartão de Crédito</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('boleto')}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
                        paymentMethod === 'boleto'
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-light/20 bg-dark hover:bg-gray-dark'
                      }`}
                    >
                      <FaBarcode className={paymentMethod === 'boleto' ? 'text-primary text-xl' : 'text-light/70 text-xl'} />
                      <span className={paymentMethod === 'boleto' ? 'text-primary' : 'text-light/70'}>Boleto</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors ${
                        paymentMethod === 'pix'
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-light/20 bg-dark hover:bg-gray-dark'
                      }`}
                    >
                      <FaQrcode className={paymentMethod === 'pix' ? 'text-primary text-xl' : 'text-light/70 text-xl'} />
                      <span className={paymentMethod === 'pix' ? 'text-primary' : 'text-light/70'}>PIX</span>
                    </button>
                  </div>
                  
                  {/* Campos específicos do método de pagamento */}
                  {paymentMethod === 'credit' && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium mb-1">Nome no Cartão</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          className={`w-full bg-dark border ${
                            errors.cardName ? 'border-red-500' : 'border-gray-light/30'
                          } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary`}
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Número do Cartão</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="0000 0000 0000 0000"
                          maxLength="19"
                          className={`w-full bg-dark border ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-light/30'
                          } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary`}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium mb-1">Validade</label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            maxLength="5"
                            className={`w-full bg-dark border ${
                              errors.cardExpiry ? 'border-red-500' : 'border-gray-light/30'
                            } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary`}
                          />
                          {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                        </div>
                        
                        <div>
                          <label htmlFor="cardCVV" className="block text-sm font-medium mb-1">CVV</label>
                          <input
                            type="text"
                            id="cardCVV"
                            name="cardCVV"
                            value={formData.cardCVV}
                            onChange={handleChange}
                            placeholder="123"
                            maxLength="4"
                            className={`w-full bg-dark border ${
                              errors.cardCVV ? 'border-red-500' : 'border-gray-light/30'
                            } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary`}
                          />
                          {errors.cardCVV && <p className="text-red-500 text-xs mt-1">{errors.cardCVV}</p>}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="cpf" className="block text-sm font-medium mb-1">CPF do Titular</label>
                        <input
                          type="text"
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleChange}
                          placeholder="000.000.000-00"
                          className={`w-full bg-dark border ${
                            errors.cpf ? 'border-red-500' : 'border-gray-light/30'
                          } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary`}
                        />
                        {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="saveCard"
                          name="saveCard"
                          checked={formData.saveCard}
                          onChange={handleChange}
                          className="h-4 w-4 accent-primary"
                        />
                        <label htmlFor="saveCard" className="ml-2 text-sm text-light/70">
                          Salvar cartão para compras futuras
                        </label>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'boleto' && (
                    <div>
                      <p className="text-light/70 mb-4">
                        O boleto será gerado após a confirmação da compra e será enviado para seu e-mail. 
                        O ingresso só será liberado após a compensação do pagamento (até 3 dias úteis).
                      </p>
                      
                      <div className="mb-4">
                        <label htmlFor="cpf" className="block text-sm font-medium mb-1">CPF</label>
                        <input
                          type="text"
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleChange}
                          placeholder="000.000.000-00"
                          className={`w-full bg-dark border ${
                            errors.cpf ? 'border-red-500' : 'border-gray-light/30'
                          } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary`}
                        />
                        {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'pix' && (
                    <div>
                      <p className="text-light/70 mb-4">
                        O QR Code PIX será gerado após a confirmação da compra. 
                        O ingresso será liberado imediatamente após a confirmação do pagamento.
                      </p>
                      
                      <div className="mb-4">
                        <label htmlFor="cpf" className="block text-sm font-medium mb-1">CPF</label>
                        <input
                          type="text"
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleChange}
                          placeholder="000.000.000-00"
                          className={`w-full bg-dark border ${
                            errors.cpf ? 'border-red-500' : 'border-gray-light/30'
                          } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary`}
                        />
                        {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Informações Pessoais */}
                <div className="glass-panel mb-8">
                  <h2 className="text-2xl font-bold mb-6">Informações Pessoais</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Nome Completo</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-dark border ${
                          errors.name ? 'border-red-500' : 'border-gray-light/30'
                        } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-dark border ${
                          errors.email ? 'border-red-500' : 'border-gray-light/30'
                        } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-dark border ${
                        errors.phone ? 'border-red-500' : 'border-gray-light/30'
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
                
                {/* Termos e condições */}
                <div className="mb-8">
                  <div className="flex items-start mb-2">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="h-4 w-4 accent-primary"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="agreeTerms" className="text-sm text-light/80">
                        Concordo com os <a href="#" className="text-primary hover:underline">termos e condições</a> e com a <a href="#" className="text-primary hover:underline">política de privacidade</a>
                      </label>
                    </div>
                  </div>
                  {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms}</p>}
                  
                  {errors.submit && (
                    <div className="p-3 bg-red-900/40 border border-red-800 rounded mt-4 text-red-200 text-sm">
                      {errors.submit}
                    </div>
                  )}
                </div>
                
                {/* Botão de finalizar */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg text-lg font-medium flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-secondary hover:from-primary-light hover:to-secondary text-dark'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-white rounded-full"></div>
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <FaLock size={16} />
                      <span>Finalizar Compra</span>
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Coluna lateral - Resumo */}
            <div className="lg:col-span-4">
              <div className="glass-panel sticky top-24">
                <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-light/20">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.eventTitle}</p>
                        <p className="text-sm text-light/70">{item.ticketType} x {item.quantity}</p>
                      </div>
                      <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 mb-6 pb-6 border-b border-gray-light/20">
                  <div className="flex justify-between">
                    <span className="text-light/70">Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-light/70">Taxa de serviço</span>
                    <span>R$ {serviceFee.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-bold text-primary">
                    R$ {finalTotal.toFixed(2)}
                  </span>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-light/20 flex items-center text-light/60 text-sm">
                  <FaLock className="mr-2 text-primary" />
                  <span>Pagamento seguro com criptografia SSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;