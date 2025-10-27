import React, { useEffect, useState, ReactNode } from 'react';
import { Navigate, useLocation  } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import instance from '../../services/api';

type PrivateWrapperProps = {
  children: ReactNode
  roles?: string[]
};


export default function PrivateWrapper({ children, roles }: PrivateWrapperProps) {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()
  const [temUsuario, setTemUsuario] = useState<boolean | null>(null);

  useEffect(() => {
    instance.get("/users/exists")
      .then(res => setTemUsuario(res.data.exists))
      .catch(err => {
        console.error(err);
        setTemUsuario(true);
      });
  }, []);

  if (loading || temUsuario === null) return null; // espera o loading e a verificação do backend

  // Se não há nenhum admin cadastrado, libera a rota de cadastro
  if (temUsuario === false) {
    return <>{children}</>;
  }

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    console.warn("Usuário não autenticado — redirecionando para login");
    return <Navigate to="/" state={{ from: location }} replace />
  }
  if (roles && user?.role && !roles.includes(user.role)) {
    console.warn(`Acesso negado para o role: ${user.role}`)
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
