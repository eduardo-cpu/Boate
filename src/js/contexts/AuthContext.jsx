import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar dados de autenticação do localStorage na inicialização
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        
        if (isAuthenticated && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
        // Em caso de erro, limpar os dados de autenticação
        logout();
      } finally {
        setLoading(false);
      }
    };
    
    loadStoredAuth();
  }, []);

  const login = async (email, password) => {
    // Simulação de autenticação. Em um app real, aqui você faria uma chamada API
    try {
      // Simular um delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificação simulada (substitua por uma chamada de API real)
      if (email && password) {
        const userData = { name: 'Membro VIP', email };
        
        // Salvar dados no localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        setUser(userData);
        return { success: true };
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simulação de registro. Em um app real, você faria uma chamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulamos um registro bem sucedido
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Remover dados do localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  // O valor fornecido para o contexto
  const contextValue = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};