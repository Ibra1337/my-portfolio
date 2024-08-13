// src/Callback.js
import React, { useEffect } from 'react';
import { useAuth } from 'oidc-react';
import { useNavigate, useSearchParams } from 'react-router-dom';


const Callback = () => {
  const { isLoading, error, userManager } = useAuth();
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();


  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!isLoading && code && state && !auth.userData) {
      console.log("unautehnticated")
      userManager.signinCallback().then((user) => {
        
        console.log('User: ' +user)

      }).catch((err) => {
        console.error('Signin callback error', err);
      });
    }
    else {
      
      console.log("authenticated")
    }
  }, [isLoading, error, navigate,  userManager, searchParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('OIDC error:', error);
    return <div>Error: {error.message}</div>;
  }
  console.log(auth.userData)
  console.log("=============================================================");
  console.log(auth.userData?.access_token)
  return;
};


export default Callback;
