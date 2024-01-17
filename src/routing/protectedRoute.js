import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from '../components/auth/AuthProvider'; 

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
