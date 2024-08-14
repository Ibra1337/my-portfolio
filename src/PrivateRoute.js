import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'react-auth-kit';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleRedirect = async () => {
      if (!auth()) {
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        // Store the code_verifier somewhere secure, like localStorage
        localStorage.setItem('code_verifier', codeVerifier);

        // Redirect to Keycloak for authentication
        window.location.href = `http://localhost:8080/realms/myrealm/protocol/openid-connect/auth?client_id=portfolio-opid&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&scope=openid%20profile&state=${generateState()}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
      }
    };

    handleRedirect();
  }, [auth]);

  // If authenticated, render the requested component
  return Element;
};

const generateState = () => {
  return 'some-unique-state-value'; // Replace with actual state generation logic
};

const generateCodeVerifier = () => {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return array.join('');
};

const generateCodeChallenge = async (codeVerifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const base64String = btoa(String.fromCharCode(...hashArray))
                        .replace(/\+/g, '-')
                        .replace(/\//g, '_')
                        .replace(/=+$/, '');
  return base64String;
};

export default PrivateRoute;

542