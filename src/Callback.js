// src/Callback.js
import React, { useEffect } from 'react';
import { useAuth } from 'oidc-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

const Callback = () => {
  const { isLoading, error, userManager } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser, redirectPath, setRedirectPath } = useAuthContext();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!isLoading && code && state) {
      userManager.signinCallback().then((user) => {
        setUser(user);
        navigate(redirectPath);
        setRedirectPath('/');
      }).catch((err) => {
        console.error('Signin callback error', err);
      });
    }
  }, [isLoading, error, navigate, redirectPath, setRedirectPath, userManager, searchParams, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('OIDC error:', error);
    return <div>Error: {error.message}</div>;
  }


  navigate(redirectPath);
  return;
};


export default Callback;
