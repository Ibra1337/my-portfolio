import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const signIn = useSignIn();

  useEffect(() => {
    const fetchTokens = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const codeVerifier = localStorage.getItem('code_verifier'); // Retrieve the code_verifier

      if (code && codeVerifier) {
        // Exchange the authorization code for tokens
        const response = await fetch('http://localhost:8080/realms/myrealm/protocol/openid-connect/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'http://localhost:3000/callback',
            client_id: 'portfolio-opid',
            code_verifier: codeVerifier // Include the code_verifier in the token request
          })
        });

        const data = await response.json();

        if (data.access_token) {
          signIn({
            token: data.access_token,
            expiresIn: data.expires_in,
            tokenType: 'Bearer',
            authState: { username: data.id_token } // Set any additional auth state here
          });

          // Redirect to the originally requested page or home page
          navigate('/');
        } else {
          // Handle error
          console.error('Authentication failed');
        }
      }
    };

    fetchTokens();
  }, [location.search, navigate, signIn]);

  return <div>Loading...</div>;
};

export default Callback;
