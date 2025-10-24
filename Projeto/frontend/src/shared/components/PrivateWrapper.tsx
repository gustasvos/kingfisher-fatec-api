import React, { ReactNode } from 'react';
import { Navigate, useLocation  } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

type PrivateWrapperProps = {
  children: ReactNode
  roles?: string[]
};


export default function PrivateWrapper({ children, roles }: PrivateWrapperProps) {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    console.warn("Usuário não autenticado — redirecionando para login");
    return <Navigate to="/" state={{ from: location }} replace />
  }
  if (roles && user?.role && !roles.includes(user.role)) {
    console.warn(`Acesso negado para o role: ${user.role}`)
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}
