// sec/ProtectedRoute.js
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { userManager } from './UserManager';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user is not authenticated and not currently redirecting
    if (!user && !isRedirecting) {
      // Store the current location before redirecting
      localStorage.setItem('redirectAfterLogin', location.pathname + location.search);

      // Start the sign-in redirect process
      setIsRedirecting(true);
      userManager.signinRedirect();
    }
  }, [user, isRedirecting, location]);

  if (isRedirecting) {
    // Optionally, display a loading message or spinner while redirecting
    return <div>Redirecting...</div>;
  }

  // If user is authenticated, render children
  return user ? children : null;
};

export default ProtectedRoute;
