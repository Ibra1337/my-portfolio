import React, { useEffect } from 'react';
import { useAuth, UserManager } from 'oidc-react';
import { useNavigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { 
    if (!auth.isLoading && !auth.userData) {
      console.log("Unauthenticated: Redirecting to login...");
      auth.userManager.signinRedirect({
        state: {redirectUri: location.pathname}
      }
      ); // Redirect to the login page
    } else if (auth.userData) {
      console.log("Authenticated");
    }
  }, [auth.isLoading, auth.userData, location.pathname]);

  if (auth.isLoading || !auth.userData) {
    return <div>Loading...</div>; // Show loading indicator while authentication state is being determined
  }

  return children; // Render the children once authenticated
};

export default PrivateRoute;
