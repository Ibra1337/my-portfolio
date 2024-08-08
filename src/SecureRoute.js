// src/SecureRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'oidc-react';
import { useAuthContext } from './AuthContext';

const SecureRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { setRedirectPath } = useAuthContext();

  if (!isAuthenticated) {
    setRedirectPath(location.pathname);
    return <Navigate to="/callback" />;
  }

  return children;
};

export default SecureRoute;
0