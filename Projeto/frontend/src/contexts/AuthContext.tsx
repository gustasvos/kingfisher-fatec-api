import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import instance from '../services/api';
import { useNavigate } from 'react-router-dom';

type UserSession = {
  id: number;
  nome: string;
  cpf: string;
  cargo: string;
  genero: 'M' | 'F' | string;
  role: string;
} | null;

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserSession;
  loading: boolean;
  login: (token: string, user: UserSession) => void;
  logout: () => void;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserSession>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      // Opcional: aqui você pode tentar validar token no backend para garantir validade
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (token: string, user: UserSession) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = async () => {
    try {
      await instance.post('/logout', {});
    } catch (error) {
      console.error('Erro ao fazer logout no backend (token pode já estar expirado):', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Se estiver carregando ainda, pode retornar null ou loader para evitar renderizar antes do estado correto
  if (loading) {
    return null; // ou algum spinner/loading component
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
