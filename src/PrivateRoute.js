import React, { useEffect } from 'react';
import { useAuth } from 'oidc-react';
import { useNavigate } from 'react-router-dom';


//Todo: why the childreen si undefined
const PrivateRoute = ({ children }) => {
  const { userData, signIn } = useAuth();
  const navigate = useNavigate();
  console.log("Child: " + children)

  useEffect(() => {
    if (!userData) {
      signIn().catch(() => {
        navigate('/'); // Navigate to the home page or any fallback page if signIn fails
      });
    }
  }, [userData, signIn, navigate]);

  if (!userData) {
    return <div>Redirecting to login...</div>;
  }
  return children;
};

export default PrivateRoute;

